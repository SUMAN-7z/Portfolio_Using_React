import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Contact.css";

import { ConfettiButton } from "@/components/ui/confetti-button";
import { Sparkles } from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [shake, setShake] = useState({});
  const [loading, setLoading] = useState(false);
  const [toastPos, setToastPos] = useState("top-right");

  useEffect(() => {
    const updateToastPosition = () => {
      setToastPos(window.innerWidth <= 480 ? "top-center" : "top-right");
    };
    updateToastPosition();
    window.addEventListener("resize", updateToastPosition);
    return () => window.removeEventListener("resize", updateToastPosition);
  }, []);

  // Professional validation messages
  const validateField = (name, value) => {
    let errorMsg = "";

    if (!value.trim()) {
      errorMsg = `${
        name.charAt(0).toUpperCase() + name.slice(1)
      } cannot be empty.`;
    }

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value && !emailRegex.test(value)) {
        errorMsg = "Please enter a valid email address.";
      }
    }

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    validateField(name, value);
  };

  const triggerShake = (field) => {
    setShake((prev) => ({ ...prev, [field]: true }));
    setTimeout(() => {
      setShake((prev) => ({ ...prev, [field]: false }));
    }, 400);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;
    Object.keys(form).forEach((field) => {
      if (!form[field].trim()) {
        validateField(field, form[field]);
        triggerShake(field);
        hasError = true;
      }
    });

    if (hasError) {
      toast.error("Please correct the highlighted fields before submitting.", {
        position: toastPos,
        autoClose: 3000,
      });
      return;
    }

    // local host == http://localhost:5000/api/contact
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/contact`,
        form,
      );

      toast.success(
        res.data?.message ||
          "Your message has been sent successfully. Thank you for reaching out.",
        {
          position: toastPos,
          autoClose: 3000,
        },
      );

      setForm({ name: "", email: "", message: "" });
      setErrors({});
    } catch (err) {
      const errMsg =
        err?.response?.data?.error ||
        "An unexpected error occurred. Please try again later.";

      toast.error(errMsg, {
        position: toastPos,
        autoClose: 3500,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-section" id="Contact">
      <ToastContainer position={toastPos} autoClose={3000} />

      {/* Contact Info */}
      <div className="contact-info">
        <h2 className="mb-4">Contact Me</h2>

        <div className="info-item">
          <div className="info-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="22"
              width="22"
              viewBox="0 0 24 24"
              fill="#4285F4"
            >
              <path
                d="M20 4H4c-1.1 0-2 .9-2 
            2v12c0 1.1.9 2 2 2h16c1.1 
            0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 
            4l-8 5-8-5V6l8 5 8-5v2z"
              />
            </svg>
          </div>
          <div className="info-text">sumankandisuman@gmail.com</div>
        </div>
        <div className="info-item">
          <div className="info-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="22"
              width="22"
              viewBox="0 0 24 24"
              fill="#34A853"
            >
              <path
                d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 
            1 0 011.11-.21c1.21.49 2.53.76 3.88.76a1 
            1 0 011 1v3.5a1 1 0 01-1 1C10.07 21.43 
            2.57 13.93 2.57 4a1 1 0 011-1H7a1 1 0 011 
            1c0 1.35.26 2.67.76 3.88a1 1 0 01-.21 1.11l-2.2 
            2.2z"
              />
            </svg>
          </div>
          <div className="info-text">+91 8144975283</div>
        </div>

        <div className="info-item">
          <div className="info-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="22"
              width="22"
              viewBox="0 0 24 24"
              fill="#EA4335"
            >
              <path
                d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 
            9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 
            11.5 12 11.5z"
              />
            </svg>
          </div>
          <div className="info-text">Odisha, India</div>
        </div>

        <div className="info-item">
          <div className="info-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="22"
              width="22"
              viewBox="0 0 24 24"
              fill="#0A66C2"
            >
              <path
                d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 
            2.239 5 5 5h14c2.761
            0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966
            0-1.75-.804-1.75-1.732s.784-1.732 1.75-1.732 1.75.804
            1.75 1.732-.784 1.732-1.75 1.732zm13.5 11.268h-3v-5.604c0-1.337-.026-3.062-1.867-3.062-1.868
            0-2.154 1.46-2.154 2.969v5.697h-3v-10h2.879v1.367h.041c.401-.76
            1.379-1.562 2.837-1.562 3.033 0 3.594 1.995 3.594
            4.59v5.605z"
              />
            </svg>
          </div>
          <div className="info-text">
            <a
              href="https://linkedin.com/in/suman-kandi"
              target="_blank"
              rel="noreferrer"
            >
              linkedin.com/suman-kandi
            </a>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="contact-form">
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className={`${errors.name ? "input-error" : ""} ${
                shake.name ? "shake" : ""
              }`}
              autoComplete="name"
            />
            {errors.name && <div className="error-text">{errors.name}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your email"
              className={`${errors.email ? "input-error" : ""} ${
                shake.email ? "shake" : ""
              }`}
              type="email"
              autoComplete="email"
            />
            {errors.email && <div className="error-text">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              placeholder="Your message"
              className={`${errors.message ? "input-error" : ""} ${
                shake.message ? "shake" : ""
              }`}
            />
            {errors.message && (
              <div className="error-text">{errors.message}</div>
            )}
          </div>

          <div>
            <ConfettiButton
              type="submit"
              disabled={loading}
              icon={<Sparkles className="h-4 w-4" />}
              confettiOptions={{
                particleCount: 100,
                spread: 70,
              }}
              className="button-form"
            >
              {loading ? "Sending..." : "Submit Message"}
            </ConfettiButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
