"use client";
import React, { useEffect } from "react";
import "./stars.css"; 

export const StarsBackground: React.FC = () => {
  useEffect(() => {
    function createStars() {
      const starsContainer = document.querySelector(".stars");
      if (!starsContainer) return;

      const starCount = 30; 
      starsContainer.innerHTML = ""; 

      for (let i = 0; i < starCount; i++) {
        const star = document.createElement("div");
        star.classList.add("star");

        const tailLength = (Math.random() * 2 + 4).toFixed(2); 
        const topOffset = (Math.random() * 100).toFixed(2); 
       const fallDuration = (Math.random() * 9 + 14).toFixed(3); 
        const fallDelay = (Math.random() * 15).toFixed(3); 

        star.style.setProperty("--star-tail-length", `${tailLength}em`);
        star.style.setProperty("--top-offset", `${topOffset}vh`);
        star.style.setProperty("--fall-duration", `${fallDuration}s`);
        star.style.setProperty("--fall-delay", `${fallDelay}s`);
        star.style.pointerEvents = "none";

        starsContainer.appendChild(star);
      }
    }

    createStars();
  }, []);

  return <div className="stars" />;
};
