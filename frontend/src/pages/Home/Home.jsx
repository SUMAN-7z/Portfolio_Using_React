import Lanyard from "../../components/ui/Lanyard";
import DecryptedText from "../../components/ui/DecryptedText";
import "./Home.css";
import HamburgerMenuOverlay from "../../components/ui/hamburgerMenuOverlay";


const menuItems = [
  { label: "Home" , href: "/" },
  { label: "About" , href: "#About" },
  { label: "Experience" , href: "#Experience" },
  { label: "Project" , href: "#Project" },
  { label: "Contact" , href: "#Contact" },
];
export default function Homes() {
  return (
    <>
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
