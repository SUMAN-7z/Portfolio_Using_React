import "./Education.css";

export default function Education() {
  return (
    <section id="Education">
      <h2 className="edu-title">Education</h2>

      <div className="edu-grid">
        {/* LEFT COLUMN (col-6) */}
        <div className="edu-left">
          <div className="edu-item">
            <div className="edu-icon">🎓</div>
            <div className="edu-content">
              <h3>
                Centurion University Of Technology & Management, Bhubaneswar
              </h3>
              <p className="edu-degree">MCA</p>
              <p className="edu-date">August 2025 – Present</p>
            </div>
          </div>

          <div className="edu-item">
            <div className="edu-icon">🎓</div>
            <div className="edu-content">
              <h3>Unipower School of IT & Management, Bhadrak</h3>
              <p className="edu-degree">BCA</p>
              <p className="edu-date">
                September 2022 – May 2025 · CGPA: 8.49/10
              </p>
            </div>
          </div>

          <div className="edu-item">
            <div className="edu-icon">🏫</div>
            <div className="edu-content">
              <h3>Tihidi Higher Secondary School, Bhadrak</h3>
              <p className="edu-degree">+2 in Science</p>
              <p className="edu-date">Aug 2020 – Jun 2022</p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (col-6) */}
        <div className="edu-right">
          <h3 className="edu-right-title">Highlights</h3>

          <ul className="edu-highlights">
            <li>Consistent academic performance</li>
            <li>Strong foundation in Computer Science</li>
            <li>Hands-on project experience</li>
            <li>Focused on frontend & full-stack development</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
