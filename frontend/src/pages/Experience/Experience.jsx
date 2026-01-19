import "./Experience.css";

export default function Experience() {
  return (
    <section id="Experience">
      <h2 className="Exp-sec popup-up-section">Experience</h2>

      {/* Experience 1 */}
      <div className="Exp-div popup-up-section">
        <div className="Exp-top">
          <div className="Exp-position">
            <h5>Frontend Developer Intern</h5>
            <h6>XYZ</h6>
          </div>

          <div className="Exp-date">
            <h6>May 2025 - Present</h6>
          </div>
        </div>

        <ul>
          <li>Working on frontend development.</li>
        </ul>

        <div className="Exp-tags">
          <span className="Exp-lang">React</span>
          <span className="Exp-lang">JavaScript</span>
          <span className="Exp-lang">Material UI</span>
          <span className="Exp-lang">CSS</span>
        </div>
      </div>

      {/* Experience 2 */}
      <div className="Exp-div popup-up-section">
        <div className="Exp-top">
          <div className="Exp-position">
            <h5>Frontend Developer Intern</h5>
            <h6>XYZ</h6>
          </div>

          <div className="Exp-date">
            <h6>Jan 2025 - May 2025</h6>
          </div>
        </div>

        <ul>
          <li>Worked on a live project called XYZ Care (XYZ.in)</li>
          <li>
            Implemented website analytics to track user interactions using
            PostHog, Google Analytics, and Facebook Pixel
          </li>
          <li>Developed dynamic slot management system based on bookings</li>
        </ul>

        <div className="Exp-tags">
          <span className="Exp-lang">Node.js</span>
          <span className="Exp-lang">React</span>
          <span className="Exp-lang">JavaScript</span>
          <span className="Exp-lang">TailwindCSS</span>
        </div>
      </div>
    </section>
  );
}
