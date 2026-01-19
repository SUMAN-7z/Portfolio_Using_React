import Contact from "../models/Contact.js";
import { validationResult } from "express-validator";
import xss from "xss";

// @desc  Save contact message securely
// @route POST /api/contact
// @access Public
export const sendMessage = async (req, res) => {
  try {
    // Validate request (handled by middleware)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    let { name, email, message } = req.body;

    // Sanitize input to prevent XSS or HTML injection
    name = xss(name.trim());
    email = xss(email.trim());
    message = xss(message.trim());

    // Save to DB
    const newMessage = new Contact({ name, email, message });
    await newMessage.save();

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};
