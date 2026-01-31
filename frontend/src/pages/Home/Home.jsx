import { useEffect, useState } from "react";
import Squares from "../../components/ui/Squares ";

import Lanyard from "../../components/ui/Lanyard";
import DecryptedText from "../../components/ui/DecryptedText";
import "./Home.css";
import HamburgerMenuOverlay from "../../components/ui/hamburgerMenuOverlay";

import TerminalCard from "../../components/ui/terminal-card";

const menuItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "#About" },
  { label: "Experience", href: "#Experience" },
  { label: "Project", href: "#Project" },
  { label: "Contact", href: "#Contact" },
];
export default function Homes() {
  const getGreetingCommand = (user = "User") => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      return `Echo "Good morning, ${user} 🔆"`;
    }

    if (hour >= 12 && hour < 17) {
      return `Echo "Good afternoon, ${user} 🌤️"`;
    }

    if (hour >= 17 && hour < 21) {
      return `Echo "Good evening, ${user} 🌆"`;
    }

    return `Echo "Good night, ${user} 🌙"`;
  };

  // const [showVideo, setShowVideo] = useState(true);
  // const [fadeOut, setFadeOut] = useState(false);

  // useEffect(() => {
  //   const fadeTimer = setTimeout(() => setFadeOut(true), 9000);
  //   const removeTimer = setTimeout(() => setShowVideo(false), 10000);

  //   return () => {
  //     clearTimeout(fadeTimer);
  //     clearTimeout(removeTimer);
  //   };
  // }, []);

  return (
    <>
      {/* {showVideo && (
        <video
          className={`bg-video ${fadeOut ? "fade-out" : ""}`}
          autoPlay
          muted
          playsInline
        >
          <source src="/assets/images/fluid.mp4" type="video/mp4" />
        </video>
      )} */}

      <div className="main_container">
        <HamburgerMenuOverlay
          items={menuItems}
          overlayBackground="linear-gradient(135deg, rgba(236,216,189,0.55) 0%, rgba(214,191,163,0.45) 50%, rgba(184,154,124,0.35) 100%)"
          fontSize="xl"
          enableBlur={true}
          menuAlignment="center"
          animationDuration={0.5}
        />

        {/* Top Section */}
        <div className="sub row align-items-center relative-container ">
          {/* Lanyard (hidden on small screens via CSS) */}
          <div className="overlay lanyard-layer">
            <Lanyard position={[0, 0, 15]} gravity={[0, -40, 0]} />
          </div>
        </div>
        {/* Hero Section */}
        <div className="hero-container">
          <div className="hero-text fade-in-up delay-1">
            <div className="Great">
              <TerminalCard
                command={getGreetingCommand("User")}
                // language="terminal"
                language="bash"
              />
            </div>
            <h1 className="hero-title">PORTFOLIO</h1>
            {/* Decrypted Text */}
            <div className="f2 col-12 col-lg-6 text-center text-lg-end">
              <DecryptedText
                text="/* git commit -m 'final final FINAL this time' */"
                speed={60}
                maxIterations={62}
                characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+!?"
                parentClassName="all-letters"
                encryptedClassName="encrypted"
                loop={true}
                loopDelay={3500}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
