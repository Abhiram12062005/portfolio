"use client";

import { useState, useEffect } from "react";

export default function MobileWarningPopup() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Only show on mobile screens
    const isMobile = window.innerWidth < 1024;
    if (isMobile) {
      // Small delay for dramatic effect
      const timer = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDesktopView = () => {
    // Request desktop site — works on most mobile browsers
    // This reloads with desktop UA hint where supported
    const metaViewport = document.querySelector('meta[name="viewport"]');
    if (metaViewport) {
      metaViewport.setAttribute("content", "width=1280");
    }
    setVisible(false);
    setDismissed(true);
    // For browsers that support it, we guide the user
    alert(
      'To switch to desktop view:\n• Chrome: tap ⋮ → "Desktop site"\n• Safari: tap AA → "Request Desktop Website"'
    );
  };

  const handleContinue = () => {
    setVisible(false);
    setDismissed(true);
  };

  if (!visible || dismissed) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(13, 13, 13, 0.85)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          zIndex: 99999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          animation: "fadeIn 0.5s ease forwards",
        }}
      >
        {/* Card */}
        <div
          style={{
            background: "#111111",
            border: "1px solid rgba(200, 132, 106, 0.25)",
            borderRadius: "4px",
            padding: "40px 32px",
            maxWidth: "360px",
            width: "100%",
            position: "relative",
            animation: "slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          }}
        >
          {/* Decorative top line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "32px",
              right: "32px",
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, #c8846a, transparent)",
            }}
          />

          {/* Icon */}
          <div
            style={{
              width: "48px",
              height: "48px",
              border: "1px solid rgba(200, 132, 106, 0.4)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "24px",
            }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#c8846a"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
          </div>

          {/* Label */}
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px",
              letterSpacing: "0.2em",
              color: "#c8846a",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            ⸻ Heads up
          </p>

          {/* Heading */}
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "26px",
              fontWeight: 700,
              color: "#f5f0e8",
              lineHeight: 1.2,
              marginBottom: "16px",
            }}
          >
            Best viewed on
            <br />
            <em style={{ color: "#c8846a" }}>desktop.</em>
          </h2>

          {/* Body */}
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "14px",
              color: "rgba(245, 240, 232, 0.55)",
              lineHeight: 1.7,
              marginBottom: "32px",
            }}
          >
            This portfolio features 3D animations, custom cursor interactions,
            and immersive effects designed for a full desktop experience.
          </p>

          {/* Buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {/* Primary — Desktop view */}
            <button
              onClick={handleDesktopView}
              style={{
                width: "100%",
                padding: "14px 20px",
                background: "#c8846a",
                border: "none",
                borderRadius: "2px",
                color: "#0d0d0d",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.05em",
                cursor: "pointer",
                transition: "opacity 0.2s ease",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLButtonElement).style.opacity = "0.85")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLButtonElement).style.opacity = "1")
              }
            >
              Switch to Desktop View
            </button>

            {/* Secondary — Continue anyway */}
            <button
              onClick={handleContinue}
              style={{
                width: "100%",
                padding: "14px 20px",
                background: "transparent",
                border: "1px solid rgba(245, 240, 232, 0.15)",
                borderRadius: "2px",
                color: "rgba(245, 240, 232, 0.5)",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px",
                fontWeight: 400,
                letterSpacing: "0.03em",
                cursor: "pointer",
                transition: "border-color 0.2s ease, color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                const btn = e.target as HTMLButtonElement;
                btn.style.borderColor = "rgba(245, 240, 232, 0.35)";
                btn.style.color = "rgba(245, 240, 232, 0.8)";
              }}
              onMouseLeave={(e) => {
                const btn = e.target as HTMLButtonElement;
                btn.style.borderColor = "rgba(245, 240, 232, 0.15)";
                btn.style.color = "rgba(245, 240, 232, 0.5)";
              }}
            >
              Continue anyway
            </button>
          </div>

          {/* Decorative bottom line */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: "32px",
              right: "32px",
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, rgba(200,132,106,0.2), transparent)",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}