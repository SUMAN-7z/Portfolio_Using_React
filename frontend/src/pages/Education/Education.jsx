import "./Education.css";
import Globe from "../../components/ui/globe";

export default function Education() {
  return (
    <section id="Education">
      <h2 className="edu-title">Education</h2>

      <div className="edu-grid">
        {/* LEFT COLUMN */}
        <div className="edu-left">
          <div className="edu-item">
            <div className="edu-icon">
              <i className="fa-solid fa-user-graduate icon "></i>
            </div>
            <div className="edu-content">
              <h3>
                Centurion University Of Technology & Management, Bhubaneswar
              </h3>
              <p className="edu-degree">MCA</p>
              <p className="edu-date">August 2025 – Present</p>
            </div>
          </div>

          <div className="edu-item">
            <div className="edu-icon">
              <i className="fa-solid fa-school-flag icon"></i>
            </div>
            <div className="edu-content">
              <h3>Unipower School of IT & Management, Bhadrak</h3>
              <p className="edu-degree">BCA</p>
              <p className="edu-date">
                September 2022 – May 2025 · CGPA: 8.49/10
              </p>
            </div>
          </div>

          <div className="edu-item">
            <div className="edu-icon">
              <i className="fa-solid fa-book icon"></i>
            </div>
            <div className="edu-content">
              <h3>Tihidi Higher Secondary School, Bhadrak</h3>
              <p className="edu-degree">+2 in Science</p>
              <p className="edu-date">Aug 2020 – Jun 2022</p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}


        <div className="skills-visual">
          <Globe
            theta={0.2}
            dark={1}
            scale={1.2}
            diffuse={1.5}
            baseColor="#1a1a1a"
            markerColor="#ff0000"
            glowColor="#444444"
          />
        </div>
      </div>
    </section>
  );
}
