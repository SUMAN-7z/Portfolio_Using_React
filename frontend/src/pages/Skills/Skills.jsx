import { useEffect, useRef, useState } from "react";
import "./Skills.css";
import BeamCircle from "../../components/ui/beam-circle";
import {
  Twitter,
  Github,
  Facebook,
  Youtube,
  Sun,
  Server,
  Cloud,
  Braces,
  Terminal,
  Database,
  Code,
} from "lucide-react";

const skillsData = {
  Frontend: [
    [
      "JavaScript",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    ],
    [
      "React.js",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    ],
    [
      "HTML",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    ],
    [
      "CSS",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    ],
    [
      "Bootstrap",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
    ],
  ],
  Databases: [
    [
      "MongoDB",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    ],
    [
      "MySQL",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    ],
  ],
  Backend: [
    [
      "Node.js",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    ],
    [
      "Express.js",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    ],
  ],
  Tools: [
    [
      "Git",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    ],
    [
      "GitHub",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    ],
    [
      "VS Code",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    ],
  ],
};

const Skills = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`skills-section ${visible ? "show" : ""}`}
    >
      <div className="skills-visual">
        <div className="edu-right">
          <div className="beam-wrapper">
            <BeamCircle
              centerIcon={<Sun size={22} color="#000" />}
              orbits={[
                {
                  id: 1,
                  radiusFactor: 0.28,
                  speed: 10,
                  icon: <Terminal />,
                  iconSize: 26,
                },
                {
                  id: 2,
                  radiusFactor: 0.42,
                  speed: 14,
                  icon: <Github />,
                  iconSize: 28,
                },
                {
                  id: 3,
                  radiusFactor: 0.62,
                  speed: 18,
                  icon: <Server />,
                  iconSize: 30,
                },
                {
                  id: 4,
                  radiusFactor: 0.82,
                  speed: 22,
                  icon: <Cloud />,
                  iconSize: 32,
                },
              ]}
            />
          </div>
        </div>
      </div>
      <div className="skills-content">
        <h2>My Skills</h2>
        <p>Technologies and tools I’ve worked with across projects</p>

        {Object.entries(skillsData).map(([category, items]) => (
          <div className="skills-block" key={category}>
            <h3>{category}</h3>
            <div className="skills-grid">
              {items.map(([name, src]) => (
                <div className="skill-card" key={name}>
                  <img src={src} alt={name} />
                  <span>{name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
