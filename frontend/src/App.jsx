import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import NotFound from "./pages/PageNotFound/PageNotFound";
import Experience from "./pages/Experience/Experience";
import Education from "./pages/Education/Education";
import Projects from "./pages/Projects/Projects";
import Certificates from "./pages/Certificates/Certificates";


function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              {!isMobile && <Home />}
              <About />
              <Experience/>
              <Education/>
              <Projects/>
              <Certificates/>
              <Contact />
            </>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
