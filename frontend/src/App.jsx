import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

/* ===============================
   PAGES
=============================== */
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import NotFound from "./pages/PageNotFound/PageNotFound";
import Experience from "./pages/Experience/Experience";
import Education from "./pages/Education/Education";
import Projects from "./pages/Projects/Projects";
import Certificates from "./pages/Certificates/Certificates";
import Skills from "./pages/Skills/Skills";
import AllMessages from "./pages/Contact/AllMessages";

/* ===============================
   COMPONENTS
=============================== */
import Preloader from "./components/ui/Preloader/Preloader";

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);

  /* ===============================
     SCREEN DETECTION
  =============================== */
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreen();

    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  /* ===============================
     PREVENT SCROLL DURING LOADER
  =============================== */
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [loading]);

  /* ===============================
     APP
  =============================== */
  return (
    <BrowserRouter>
      {/* ========= PRELOADER ========= */}
      {loading && (
        <Preloader
          onFinish={() => {
            setLoading(false);
          }}
        />
      )}

      {/* ========= ROUTES ========= */}
      {!loading && (
        <Routes>
          {/* HOME (Single Page Sections) */}
          <Route
            path="/"
            element={
              <>
                {!isMobile && <Home />}
                <About />
                <Experience />
                <Education />
                <Skills />
                <Projects />
                <Certificates />
                <Contact />
              </>
            }
          />

          {/* ADMIN / MESSAGES */}
          <Route path="/AllMessages" element={<AllMessages />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
