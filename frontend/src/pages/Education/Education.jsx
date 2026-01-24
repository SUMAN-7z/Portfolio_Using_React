import "./Education.css";
import BeamCircle from "../../components/ui/beam-circle";
import { Twitter, Github, Facebook, Youtube, Sun } from "lucide-react";

export default function Education() {
  return (
    <section id="Education">
      <h2 className="edu-title">Education</h2>

      <div className="edu-grid">
        {/* LEFT COLUMN */}
        <div className="edu-left">
          <div className="edu-item">
            <div className="edu-icon"><i class="fa-solid fa-user-graduate icon "></i></div>
            <div className="edu-content">
              <h3>Centurion University Of Technology & Management, Bhubaneswar</h3>
              <p className="edu-degree">MCA</p>
              <p className="edu-date">August 2025 – Present</p>
            </div>
          </div>

          <div className="edu-item">
            <div className="edu-icon"><i class="fa-solid fa-school-flag icon"></i></div>
            <div className="edu-content">
              <h3>Unipower School of IT & Management, Bhadrak</h3>
              <p className="edu-degree">BCA</p>
              <p className="edu-date">
                September 2022 – May 2025 · CGPA: 8.49/10
              </p>
            </div>
          </div>

          <div className="edu-item">
            <div className="edu-icon"><i class="fa-solid fa-book icon"></i></div>
            <div className="edu-content">
              <h3>Tihidi Higher Secondary School, Bhadrak</h3>
              <p className="edu-degree">+2 in Science</p>
              <p className="edu-date">Aug 2020 – Jun 2022</p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="edu-right">
          <div className="beam-wrapper">
            <BeamCircle
              centerIcon={<Sun size={22} color="#000" />}
              orbits={[
                { id: 1, radiusFactor: 0.28, speed: 10, icon: <Facebook />, iconSize: 26 },
                { id: 2, radiusFactor: 0.42, speed: 14, icon: <Github />, iconSize: 28 },
                { id: 3, radiusFactor: 0.62, speed: 18, icon: <Twitter />, iconSize: 30 },
                { id: 4, radiusFactor: 0.82, speed: 22, icon: <Youtube />, iconSize: 32 },
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
