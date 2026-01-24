import "./Projects.css";

export default function Projects() {
  return (
    <section className="projects-section" id="Projects">
      <h2 className="projects-title">Some of My Projects</h2>

      <div className="project-card">
        {/* LEFT */}
        <div className="project-images">
          <img
            src="/assets/images/project.png"
            alt="Travel destination listing web app"
          />
        </div>

        {/* RIGHT */}
        <div className="project-content">
          <h3>Travel destination-listing Web App</h3>

          <p className="project-desc">
            A full-featured rental platform built using the MERN stack. Users
            can list their property — inspired by Airbnb’s design and UX.
          </p>

          <div className="tech-stack">
            {[
              "HTML",
              "CSS",
              "JavaScript",
              "Node.js",
              "MongoDB",
              "Express.js",
            ].map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>

          <ul className="project-features">
            <li>User authentication & session handling</li>
            <li>RESTful API integration</li>
            <li>CRUD operations with MongoDB</li>
            <li>Cloudinary integration for image uploads</li>
            <li>Property listing system</li>
          </ul>

          <div className="project-actions">
            <a
              href="https://destination-booking.onrender.com/listings"
              className="btn primary"
            >
              <i class="fa-solid fa-person-walking-dashed-line-arrow-right"></i>&nbsp;
              Live Demo
            </a>
            <a
              href="https://github.com/SUMAN-7z/Destination-Booking"
              className="btn secondary"
            >
              <i class="fa-solid fa-eye"></i> &nbsp;  View Code
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
