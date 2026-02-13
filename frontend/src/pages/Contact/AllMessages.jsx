import React, { useEffect, useState } from "react";
import axios from "axios";

function AllMessages() {
  const [allMessages, setAllMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ============================
     FETCH WITH AXIOS
  ============================ */
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get("https://suman-backend-7z.onrender.com/api/contact");

        // Axios data comes directly in res.data
        const data = res.data;

        setAllMessages(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Axios fetch error:", err);
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
    return (
      <div className="h-screen flex items-center justify-center  text-white">
        Loading messages...
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">{error}</div>;
  }

  /* ============================
     RENDER
  ============================ */

  return (
    <section className="w-[85vw] mx-auto py-16">
      {/* Heading */}
      <h2
        className="
          text-center mb-12
          text-3xl font-bold
          text-gray-900
          dark:text-white
        "
      >
        All Messages
      </h2>

      {/* No Data */}
      {allMessages.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No messages yet.
        </p>
      ) : (
        /* Grid */
        <div
          className="
            grid gap-2
            sm:grid-cols-1
            md:grid-cols-1
            lg:grid-cols-2
          "
        >
          {allMessages.map((msg) => (
            /* CARD */
            <div
              key={msg._id}
              className="
                group relative
                rounded-2xl p-6
                backdrop-blur-xl border
                shadow-lg
                transition-all duration-300
                
                bg-white/70 border-gray-200 text-gray-900
                dark:bg-white/10 dark:border-white/20 dark:text-white
                

              "
            >
              {/* Profile */}
              <div className="flex items-center gap-3 mb-4 relative z-10">
                <img
                  src={
                    msg.avatar ||
                    `https://ui-avatars.com/api/?name=${msg.name}&background=random`
                  }
                  alt={msg.name}
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div>
                  <h4 className="font-semibold">{msg.name}</h4>

                  <p className="text-sm opacity-70">{msg.email}</p>
                </div>
              </div>

              {/* Message */}
              <p className="text-sm break-words whitespace-pre-wrap line-clamp-4">
                {msg.message}
              </p>

              {/* Time */}
              {msg.sentAt && (
                <p className="text-xs mt-4 opacity-60 relative z-10">
                  {Date(msg.sentAt).toLocaleString()}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default AllMessages;
