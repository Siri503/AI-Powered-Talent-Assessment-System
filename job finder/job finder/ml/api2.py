

from fastapi import FastAPI, UploadFile, File, HTTPException, Form 
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
import json
import re
import numpy as np
from numpy.linalg import norm
import base64
from io import BytesIO
import tempfile
import shutil
import uuid
import plotly.graph_objects as go
import logging
import time
from pathlib import Path
# Document processing
from PyPDF2 import PdfReader
import docx
import google.generativeai as genai
from dotenv import load_dotenv
import sounddevice as sd
import soundfile as sf
# For vectorization
from gensim.models.doc2vec import Doc2Vec

# Speech recognition
import speech_recognition as sr

# Initialize FastAPI app
app = FastAPI(title="Resume Analyzer and Interview API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load environment variables
load_dotenv()
API_KEY = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=API_KEY)

# Create temp directory
TEMP_DIR = "temp_files"
os.makedirs(TEMP_DIR, exist_ok=True)

# Create recordings directory
RECORDINGS_DIR = Path("recordings")
RECORDINGS_DIR.mkdir(exist_ok=True)

# Initialize logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Cache the Doc2Vec model
DOC2VEC_MODEL = None

# Define models
class ResumeAnalysisResponse(BaseModel):
    summary: dict
    skills: List[str]

class JobMatchRequest(BaseModel):
    resume_summary: str
    job_description: str

class JobMatchResponse(BaseModel):
    match_percentage: float
    recommendation: str

class InterviewQuestionRequest(BaseModel):
    job_description: str
    num_questions: Optional[int] = 10

class InterviewQuestion(BaseModel):
    question: str
    category: str

class InterviewQuestionsResponse(BaseModel):
    questions: List[InterviewQuestion]

class InterviewResponseConfig(BaseModel):
    question: str
    max_duration: int = 60  # 1 minute max duration
    sample_rate: int = 44100  # Standard sample rate
    channels: int = 1  # Mono audio

class InterviewEvaluationResult(BaseModel):
    question: str
    transcription: str
    evaluation: dict
    relevance_score: float
    clarity_score: float
    confidence_score: float
    overall_score: float

# Helper functions
def load_doc2vec_model():
    """Load and cache the Doc2Vec model"""
    global DOC2VEC_MODEL
    if DOC2VEC_MODEL is None:
        logger.info("Loading Doc2Vec model...")
        start_time = time.time()
        try:
            DOC2VEC_MODEL = Doc2Vec.load(os.path.join(os.getcwd(), "cv_job_maching.model"))
            logger.info(f"Model loaded in {time.time() - start_time:.2f} seconds")
        except Exception as e:
            logger.error(f"Error loading Doc2Vec model: {str(e)}")
            raise HTTPException(status_code=500, detail="Failed to load the Doc2Vec model")
    return DOC2VEC_MODEL

def process_file(file_path):
    """Extract text from uploaded files"""
    file_extension = os.path.splitext(file_path)[1].lower()
    
    if file_extension == ".txt":
        with open(file_path, 'r', encoding='utf-8') as f:
            return f.read()
    elif file_extension == ".pdf":
        pdf = PdfReader(file_path)
        text = ""
        for page in pdf.pages:
            text += page.extract_text()
        return text
    elif file_extension in [".docx", ".doc"]:
        doc = docx.Document(file_path)
        text = ""
        for para in doc.paragraphs:
            text += para.text + "\n"
        return text
    else:
        raise ValueError("Unsupported file type")

def analyze_resume(resume_text):
    """Analyze resume text using Gemini"""
    model = genai.GenerativeModel("gemini-1.5-flash")
    
    prompt = f"""
    Analyze the following resume and provide a detailed summary that can be used for job matching:
    
    {resume_text}
    
    Provide a detailed analysis in JSON format with the following structure:
    {{
        "summary": "A comprehensive summary of the candidate's background, skills, experience, and qualifications that would be relevant for job matching.",
        "education": [
            {{"degree": "", "institution": "", "year": ""}}
        ],
        "work_experience": [
            {{"title": "", "company": "", "duration": "", "responsibilities": []}}
        ],
        "technical_skills": [],
        "soft_skills": [],
        "certifications": [],
        "projects": [
            {{"title": "", "description": "", "technologies": []}}
        ],
        "key_skills": []
    }}
    
    Return only valid JSON with no additional text.
    """
    
    response = model.generate_content(prompt)
    
    # Extract text from response
    if hasattr(response, 'parts'):
        response_text = response.parts[0].text if response.parts else ""
    elif hasattr(response, 'text'):
        response_text = response.text
    elif hasattr(response, 'candidates') and response.candidates:
        response_text = response.candidates[0].content.parts[0].text
    else:
        response_text = str(response)
    
    # Find and extract the JSON part
    try:
        json_match = re.search(r'({.*})', response_text.replace('\n', ' '), re.DOTALL)
        if json_match:
            analysis_json = json.loads(json_match.group(0))
        else:
            raise ValueError("Failed to parse resume analysis")
    except Exception as e:
        logger.error(f"Failed to parse resume analysis: {str(e)}")
        logger.error(f"Raw response: {response_text}")
        raise ValueError(f"Failed to parse resume analysis: {str(e)}")
    
    return analysis_json

def clean_text(text):
    """Optimized text cleaning function"""
    text = text.lower()
    text = re.sub(r'[^a-z\s]', '', text)
    return ' '.join(text.split())

def calculate_match(resume_summary, job_description):
    """Optimized match calculation"""
    start_time = time.time()
    
    try:
        model = load_doc2vec_model()
        
        # Clean texts
        resume_processed = clean_text(resume_summary)
        jd_processed = clean_text(job_description)
        
        # Vectorize
        v1 = model.infer_vector(resume_processed.split())
        v2 = model.infer_vector(jd_processed.split())
        
        # Calculate cosine similarity
        dot_product = np.dot(v1, v2)
        norm_product = norm(v1) * norm(v2)
        similarity = 100 * (dot_product / norm_product)
        
        logger.info(f"Matching completed in {time.time() - start_time:.2f} seconds")
        return round(similarity, 2)
    except Exception as e:
        logger.error(f"Match calculation error: {str(e)}")
        raise ValueError(f"Match calculation failed: {str(e)}")

def get_match_recommendation(match_percentage):
    """Get recommendation based on match percentage"""
    if match_percentage < 50:
        return "Low chance, need to modify your CV!"
    elif 50 <= match_percentage < 70:
        return "Good chance but you can improve further!"
    else:
        return "Excellent! You can submit your CV."

def generate_interview_questions(job_description, num_questions=10):
    """Generate interview questions based on job description"""
    model = genai.GenerativeModel("gemini-1.5-flash")
    
    prompt = f"""
    Generate {num_questions} HR interview questions based on this job description:
    
    {job_description}
    
    Include a mix of:
    - Behavioral questions
    - Cultural fit questions
    - Experience-related questions
    - Motivation questions
    - Technical questions (if applicable)
    
    Return ONLY a valid JSON array with structure:
    [{{"question": "...", "category": "..."}}]

    Do not include any additional text, only return the valid JSON array.
    """
    
    response = model.generate_content(prompt)
    
    # Extract text from response
    if hasattr(response, 'parts'):
        response_text = response.parts[0].text if response.parts else ""
    elif hasattr(response, 'text'):
        response_text = response.text
    elif hasattr(response, 'candidates') and response.candidates:
        response_text = response.candidates[0].content.parts[0].text
    else:
        response_text = str(response)
    
    try:
        # Try to find JSON content within the response
        json_match = re.search(r'(\[.*\])', response_text.replace('\n', ' '), re.DOTALL)
        if json_match:
            return json.loads(json_match.group(0))
        
        # If we can't find array pattern, try to parse the whole response as JSON
        return json.loads(response_text)
    except Exception as e:
        logger.error(f"Failed to parse questions: {str(e)}")
        logger.error(f"Raw response: {response_text}")
        raise ValueError(f"Failed to parse questions: {str(e)}")

# API Endpoints
@app.post("/api/resume/upload", response_model=ResumeAnalysisResponse)
async def upload_resume(file: UploadFile = File(...)):
    """Upload and analyze resume"""
    temp_file_path = os.path.join(TEMP_DIR, f"temp_{uuid.uuid4()}{os.path.splitext(file.filename)[1]}")
    
    try:
        with open(temp_file_path, "wb") as temp_file:
            shutil.copyfileobj(file.file, temp_file)
        
        resume_text = process_file(temp_file_path)
        analysis_json = analyze_resume(resume_text)
        
        return {
            "summary": analysis_json,
            "skills": analysis_json.get("key_skills", [])
        }
    
    except Exception as e:
        logger.error(f"Resume upload error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if os.path.exists(temp_file_path):
            os.remove(temp_file_path)

@app.post("/api/job/match", response_model=JobMatchResponse)
async def match_job(request: JobMatchRequest):
    """Match resume summary with job description"""
    try:
        start_time = time.time()
        match_percentage = calculate_match(request.resume_summary, request.job_description)
        
        logger.info(f"Total job matching time: {time.time() - start_time:.2f} seconds")
        
        return {
            "match_percentage": match_percentage,
            "recommendation": get_match_recommendation(match_percentage),
        }
    
    except Exception as e:
        logger.error(f"Job matching error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/interview/questions", response_model=InterviewQuestionsResponse)
async def create_interview(request: InterviewQuestionRequest):
    """Generate interview questions"""
    try:
        questions = generate_interview_questions(request.job_description, request.num_questions)
        return {"questions": questions}
    except Exception as e:
        logger.error(f"Generate interview questions error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
model = genai.GenerativeModel("gemini-1.5-flash")
@app.post("/evaluate-interview-response/", response_model=InterviewEvaluationResult)
async def evaluate_interview_response(
    question: str = Form(...),
    audio_file: UploadFile = File(...),
    max_duration: int = Form(60)
):
    """Evaluate an uploaded interview response audio file"""
    temp_audio_path = RECORDINGS_DIR / f"response_{int(time.time())}.wav"
    
    try:
        # Process the uploaded file
        contents = await audio_file.read()
        with open(temp_audio_path, "wb") as f:
            f.write(contents)

        # Upload to Gemini
        uploaded_file = genai.upload_file(str(temp_audio_path))
        
        # Evaluation prompt
        evaluation_prompt = f"""
        Your task is to evaluate an interview response to the question: "{question}"

        IMPORTANT: You must return ONLY a valid JSON object with no additional text, markdown formatting, or code blocks.
        Be little strict here For evaluating the user.
        The JSON MUST follow this exact structure:
        {{
            "transcription": "Full transcription of the audio",
            "relevance": 0.8,  // Use a float between 0-1 for content relevance to the question
            "clarity": 0.7,    // Use a float between 0-1 for clarity of expression
            "confidence": 0.9, // Use a float between 0-1 for perceived confidence
            "overall_score": 0.8, // Calculate as the average of the above three scores
            "feedback": {{
                "strengths": ["List specific strengths", "Add at least 2-3 points"],
                "improvements": ["List specific areas for improvement", "Add at least 2-3 points"]
            }}
        }}

        DO NOT include any explanations, introductions, or additional text outside the JSON object. 
        Return ONLY the valid JSON object exactly as requested.
        """
        
        # Get evaluation from Gemini
        response = model.generate_content([evaluation_prompt, uploaded_file])
        
        # Add debugging logs
        logger.info(f"Gemini response type: {type(response)}")
        
        # Extract text properly from Gemini response
        if hasattr(response, 'parts'):
            response_text = response.parts[0].text if response.parts else ""
        elif hasattr(response, 'text'):
            response_text = response.text
        elif hasattr(response, 'candidates') and response.candidates:
            response_text = response.candidates[0].content.parts[0].text
        else:
            response_text = str(response)
            
        logger.info(f"Extracted text: {response_text[:100]}...")  # Log first 100 chars
        
        # Parse response
        try:
            # Try to find JSON content within the response
            json_match = re.search(r'({[\s\S]*})', response_text)
            if json_match:
                response_text = json_match.group(1)
                
            evaluation = json.loads(response_text)
            logger.info("Successfully parsed JSON")
        except Exception as parsing_error:
            logger.error(f"Error parsing response: {parsing_error}")
            logger.error(f"Raw response: {response_text}")
            evaluation = {
                "transcription": f"Could not parse response: {str(parsing_error)[:100]}...",
                "relevance": 0,
                "clarity": 0,
                "confidence": 0,
                "overall_score": 0,
                "feedback": {
                    "strengths": [],
                    "improvements": ["Evaluation failed - check server logs for details"]
                }
            }

        # Clean up
        temp_audio_path.unlink(missing_ok=True)
        
        return InterviewEvaluationResult(
            question=question,
            transcription=evaluation.get("transcription", ""),
            evaluation=evaluation.get("feedback", {}),
            relevance_score=evaluation.get("relevance", 0),
            clarity_score=evaluation.get("clarity", 0),
            confidence_score=evaluation.get("confidence", 0),
            overall_score=evaluation.get("overall_score", 0)
        )

    except Exception as e:
        logger.error(f"Interview evaluation error: {str(e)}")
        if temp_audio_path.exists():
            temp_audio_path.unlink(missing_ok=True)
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/record-and-evaluate/", response_model=InterviewEvaluationResult)
async def record_and_evaluate(
    question: str = Form(...),
    max_duration: int = Form(60),
    sample_rate: int = Form(44100)
):
    """Record audio directly and evaluate the interview response"""
    temp_audio_path = RECORDINGS_DIR / f"response_{int(time.time())}.wav"
    
    try:
        # Record audio
        logger.info(f"Recording for {max_duration} seconds...")
        recording = sd.rec(
            frames=max_duration * sample_rate,
            samplerate=sample_rate,
            channels=1
        )
        sd.wait()  # Wait until recording is finished
        sf.write(str(temp_audio_path), recording, sample_rate)
        
        # Upload to Gemini
        uploaded_file = genai.upload_file(str(temp_audio_path))
        
        # Evaluation prompt
        evaluation_prompt = f"""
        Your task is to evaluate an interview response to the question: "{question}"

        IMPORTANT: You must return ONLY a valid JSON object with no additional text, markdown formatting, or code blocks.
        Be little strict here For evaluating the user.
        The JSON MUST follow this exact structure:
        {{
            "transcription": "Full transcription of the audio",
            "relevance": 0.8,  // Use a float between 0-1 for content relevance to the question
            "clarity": 0.7,    // Use a float between 0-1 for clarity of expression
            "confidence": 0.9, // Use a float between 0-1 for perceived confidence
            "overall_score": 0.8, // Calculate as the average of the above three scores
            "feedback": {{
                "strengths": ["List specific strengths", "Add at least 2-3 points"],
                "improvements": ["List specific areas for improvement", "Add at least 2-3 points"]
            }}
        }}

        DO NOT include any explanations, introductions, or additional text outside the JSON object. 
        Return ONLY the valid JSON object exactly as requested.
        """
        
        # Get evaluation from Gemini
        response = model.generate_content([evaluation_prompt, uploaded_file])
        
        # Add debugging logs
        logger.info(f"Gemini response type: {type(response)}")
        
        # Extract text properly from Gemini response
        if hasattr(response, 'parts'):
            response_text = response.parts[0].text if response.parts else ""
        elif hasattr(response, 'text'):
            response_text = response.text
        elif hasattr(response, 'candidates') and response.candidates:
            response_text = response.candidates[0].content.parts[0].text
        else:
            response_text = str(response)
            
        logger.info(f"Extracted text: {response_text[:100]}...")  # Log first 100 chars
        
        # Parse response
        try:
            # Try to find JSON content within the response
            json_match = re.search(r'({[\s\S]*})', response_text)
            if json_match:
                response_text = json_match.group(1)
                
            evaluation = json.loads(response_text)
            logger.info("Successfully parsed JSON")
        except Exception as parsing_error:
            logger.error(f"Error parsing response: {parsing_error}")
            logger.error(f"Raw response: {response_text}")
            evaluation = {
                "transcription": f"Could not parse response: {str(parsing_error)[:100]}...",
                "relevance": 0,
                "clarity": 0,
                "confidence": 0,
                "overall_score": 0,
                "feedback": {
                    "strengths": [],
                    "improvements": ["Evaluation failed - check server logs for details"]
                }
            }

        # Clean up
        temp_audio_path.unlink(missing_ok=True)
        
        return InterviewEvaluationResult(
            question=question,
            transcription=evaluation.get("transcription", ""),
            evaluation=evaluation.get("feedback", {}),
            relevance_score=evaluation.get("relevance", 0),
            clarity_score=evaluation.get("clarity", 0),
            confidence_score=evaluation.get("confidence", 0),
            overall_score=evaluation.get("overall_score", 0)
        )

    except Exception as e:
        logger.error(f"Record and evaluate error: {str(e)}")
        if temp_audio_path.exists():
            temp_audio_path.unlink(missing_ok=True)
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "ready for interviews"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)