import React, { useEffect, useState } from "react";

import {
  ThreeDScrollTriggerContainer,
  ThreeDScrollTriggerRow,
} from "../../components/ui/3d-scroll-trigger.jsx";

function AllMessages() {
  const [allMessages, setAllMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ============================
     FETCH MESSAGES
  ============================ */
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(import.meta.env.process.env.frontend_url);

        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }

        const data = await res.json();
        setAllMessages(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load messages");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  /* ============================
     UI STATES
  ============================ */

  if (loading) {
    return <div style={styles.center}>Loading messages...</div>;
  }

  if (error) {
    return <div style={styles.error}>{error}</div>;
  }

  /* ============================
     CARD COMPONENT
  ============================ */

  const MessageCard = ({ msg }) => (
    <div
      key={msg._id}
      className="
        group relative
        mx-5 min-w-[320px] max-w-[380px]
        rounded-2xl p-6 overflow-hidden
        
        /* Glass base */
        bg-gradient-to-br from-white/10 to-white/5
        backdrop-blur-2xl
        
        /* Border */
        border border-white/300
        
        /* Shadow */
        shadow-[0_10px_40px_rgba(0,0,0,0.8)]
        
        /* Hover */
        transition-all duration-500
      "
    >
      {/* Neon Hover Glow */}
      <div
        className="
          absolute inset-0 rounded-2xl
          opacity-0 group-hover:opacity-100
          transition duration-500
          bg-gradient-to-r
          from-cyan-500/20
          via-purple-500/20
          to-pink-500/20
          blur-l
        "
      />

      {/* CONTENT */}
      <div className="relative z-10">
        {/* Profile Row */}
        <div className="flex items-center gap-4 mb-4">
          {/* Avatar Glow Ring */}
          <div
            className="
              p-[2px] rounded-full
              bg-gradient-to-tr
              from-cyan-400
              via-purple-500
              to-pink-500
            "
          >
            <img
              src={
                msg.avatar ||
                `https://ui-avatars.com/api/?name=${msg.name}&background=random`
              }
              alt={msg.name}
              className="w-12 h-12 rounded-full object-cover bg-black"
            />
          </div>

          {/* Name + Company */}
          <div>
            <h4
              className="
                font-semibold text-base
                bg-gradient-to-r
                from-white to-gray-300
                bg-clip-text text-transparent
              "
            >
              {msg.name}
            </h4>

            <p className="text-xs text-gray-400">{msg.company || "Client"}</p>
          </div>
        </div>

        {/* Message */}
        <p
          className="
            text-sm leading-relaxed
            text-gray-200 opacity-90
            line-clamp-4
          "
        >
          {msg.message}
        </p>
      </div>
    </div>
  );

  /* ============================
     RENDER
  ============================ */

  return (
    <div style={styles.page}>
      {/* ROW 1 */}
      <ThreeDScrollTriggerContainer>
        <ThreeDScrollTriggerRow
          baseVelocity={5}
          direction={-1}
          className="mb-5"
        >
          {allMessages.map((msg) => (
            <MessageCard key={msg._id} msg={msg} />
          ))}
        </ThreeDScrollTriggerRow>
      </ThreeDScrollTriggerContainer>

      {/* ROW 2 */}
      <ThreeDScrollTriggerContainer>
        <ThreeDScrollTriggerRow baseVelocity={5} direction={1}>
          {allMessages.map((msg) => (
            <MessageCard key={msg._id} msg={msg} />
          ))}
        </ThreeDScrollTriggerRow>
      </ThreeDScrollTriggerContainer>
    </div>
  );
}

/* ============================
   STYLES
============================ */

const styles = {
  page: {
    color: "#fff",
  },

  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: "18px",
  },

  error: {
    textAlign: "center",
    color: "white",
  },
};

export default AllMessages;
