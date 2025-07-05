import React from "react";
import {
  FaLinkedinIn,
  FaTwitter,
  FaGithub,
  FaYoutube,
  FaRegNewspaper,
  FaBook,
  FaShieldAlt,
  FaHeadset,
  FaUserTie,
  FaLaptopCode,
} from "react-icons/fa";
import { AiOutlineRobot, AiOutlineTeam } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center mb-4">
              <AiOutlineRobot className="text-indigo-400 text-xl mr-2" />
              <h3 className="text-lg font-semibold text-white">
                TalentPulse AI
              </h3>
            </div>
            <p className="text-gray-400 text-sm">
              Revolutionizing recruitment with AI-powered candidate assessment
              and data-driven hiring decisions.
            </p>
            <div className="flex space-x-4 mt-4">
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-400 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={16} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-400 transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter size={16} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-400 transition-colors"
                aria-label="GitHub"
              >
                <FaGithub size={16} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-400 transition-colors"
                aria-label="YouTube"
              >
                <FaYoutube size={16} />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <div className="flex items-center mb-4">
              <FaLaptopCode className="text-indigo-400 text-xl mr-2" />
              <h3 className="text-lg font-semibold text-white">Product</h3>
            </div>
            <ul className="space-y-2">
              <li>
                <a
                  href="/features"
                  className="text-gray-400 hover:text-white transition-colors text-sm flex items-center"
                >
                  <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2"></span>
                  Features
                </a>
              </li>
              <li>
                <a
                  href="/pricing"
                  className="text-gray-400 hover:text-white transition-colors text-sm flex items-center"
                >
                  <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2"></span>
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="/demo"
                  className="text-gray-400 hover:text-white transition-colors text-sm flex items-center"
                >
                  <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2"></span>
                  Request Demo
                </a>
              </li>
              <li>
                <a
                  href="/integrations"
                  className="text-gray-400 hover:text-white transition-colors text-sm flex items-center"
                >
                  <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2"></span>
                  Integrations
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <div className="flex items-center mb-4">
              <FaBook className="text-indigo-400 text-xl mr-2" />
              <h3 className="text-lg font-semibold text-white">Resources</h3>
            </div>
            <ul className="space-y-2">
              <li>
                <a
                  href="/blog"
                  className="text-gray-400 hover:text-white transition-colors text-sm flex items-center"
                >
                  <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2"></span>
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="/whitepapers"
                  className="text-gray-400 hover:text-white transition-colors text-sm flex items-center"
                >
                  <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2"></span>
                  Whitepapers
                </a>
              </li>
              <li>
                <a
                  href="/case-studies"
                  className="text-gray-400 hover:text-white transition-colors text-sm flex items-center"
                >
                  <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2"></span>
                  Case Studies
                </a>
              </li>
              <li>
                <a
                  href="/webinars"
                  className="text-gray-400 hover:text-white transition-colors text-sm flex items-center"
                >
                  <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2"></span>
                  Webinars
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <div className="flex items-center mb-4">
              <AiOutlineTeam className="text-indigo-400 text-xl mr-2" />
              <h3 className="text-lg font-semibold text-white">Company</h3>
            </div>
            <ul className="space-y-2">
              <li>
                <a
                  href="/about"
                  className="text-gray-400 hover:text-white transition-colors text-sm flex items-center"
                >
                  <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2"></span>
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/careers"
                  className="text-gray-400 hover:text-white transition-colors text-sm flex items-center"
                >
                  <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2"></span>
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-400 hover:text-white transition-colors text-sm flex items-center"
                >
                  <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2"></span>
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/press"
                  className="text-gray-400 hover:text-white transition-colors text-sm flex items-center"
                >
                  <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2"></span>
                  Press
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 text-sm mb-4 md:mb-0">
            <a
              href="/privacy"
              className="text-gray-400 hover:text-white transition-colors flex items-center"
            >
              <FaShieldAlt className="mr-1" /> Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-gray-400 hover:text-white transition-colors flex items-center"
            >
              <FaRegNewspaper className="mr-1" /> Terms of Service
            </a>
            <a
              href="/support"
              className="text-gray-400 hover:text-white transition-colors flex items-center"
            >
              <FaHeadset className="mr-1" /> Support
            </a>
          </div>
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} TalentPulse AI. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
