"use client";

import { useState } from "react";
import "./Certificates.css";
import { ChevronDown } from "lucide-react";

export default function Certificates() {
  const [showAll, setShowAll] = useState(false);

  return (
    <section className="projects-section" id="Projects">
      <h2 className="projects-title">Certificates</h2>

      {/* ================= PROJECT CARD 1 (ALWAYS VISIBLE) ================= */}
      <div className="project-card">
        {/* LEFT */}
        <div className="project-content">
          <h3>Full Stack Developer Certificate</h3>

          <p className="project-desc">
            Earned from ApnaCollege Academy, this certificate validates
            proficiency in full-stack development including frontend, backend,
            and deployment strategies.
          </p>

          <div className="tech-stack">
            {[
              "HTML",
              "CSS",
              "JavaScript",
              "Node.js",
              "MongoDB",
              "Express.js",
              "React.js",
              "MySql",
              "Git",
              "GitHub",
            ].map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>

          <ul className="project-features">
            <li>Responsive Ul development</li>
            <li>RESTful API integration</li>
            <li>CRUD operations with MongoDB</li>
            <li>Authentication, logging and error handling</li>
          </ul>

          <div className="project-actions">
            <a
              href="/assets/images/certificate.pdf"
              className="btn secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-solid fa-eye"></i>
              &nbsp; View Certificate
            </a>
          </div>
        </div>
        {/* RIGHT */}

        <div className="project-images">
          <img
            src="/assets/images/Certificate.png"
            alt="MERN Stack Certificate"
          />
        </div>
      </div>

      {/* ================= PROJECT CARD 2 (TOGGLE) ================= */}
      {showAll && (
        <div className="project-card mt-8">
          <div className="project-images">
            <img
              src="/assets/images/DSA_Certificate.png"
              alt="Travel destination listing web app"
            />
          </div>

          <div className="project-content">
            <h3>DSA in Java Certificate</h3>

            <p className="project-desc">
              Earned from Apna College, this certificate validates strong
              proficiency in Data Structures and Algorithms using Java, with a
              focus on problem-solving and interview-oriented coding practices.
            </p>

            <div className="tech-stack">
              {[
                "Java",
                "Data Structures",
                "Algorithms",
                "Arrays",
                "Linked List",
                "Stack",
                "Queue",
                "Recursion",
                "Sorting",
                "Searching",
              ].map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>

            <ul className="project-features">
              <li>Problem solving useing java</li>
              <li>Time and space complexity analysis</li>
              <li>Implementation of core data Structures</li>
              <li>Algorithmic thinking for interviews</li>
            </ul>

            <div className="project-actions">
              <a
                href="/assets/images/DSA-Certificate.pdf"
                className="btn secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-solid fa-eye"></i>
                &nbsp; View Certificate
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ================= SHOW ALL BUTTON ================= */}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => setShowAll((prev) => !prev)}
          className="flex items-center gap-2 px-6 py-3
          border border-gray-400 dark:border-gray-600
          rounded-full text-sm font-medium
          text-gray-700 dark:text-gray-200
          hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
        >
          {showAll ? "Hide" : "Show All"}
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              showAll ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>
    </section>
  );
}
