import mongoose from "mongoose";
import validator from "validator"; // for email validation

// Function to get IST time
const getISTTime = () => {
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000; // +5 hours 30 minutes
  return new Date(now.getTime() + istOffset);
};

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
      maxlength: [50, "Name must be less than 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      validate: {
        validator: validator.isEmail,
        message: "Please provide a valid email address",
      },
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      minlength: [5, "Message must be at least 5 characters long"],
      maxlength: [1000, "Message too long"],
    },
    sentAt: {
      type: Date,
      default: getISTTime,
    },
  },
  {
    timestamps: false, // we already handle time manually
    versionKey: false, // hides "__v" from documents
  }
);

// Prevent injection of unexpected fields
contactSchema.set("strict", true);

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
