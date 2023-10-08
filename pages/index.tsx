import gsap from "gsap";
import { Inter } from "next/font/google";
import Image from "next/image";
import { ReactNode, useEffect, useRef, useState } from "react";
import Color from "color-thief-react";
import { ReducerState, ArrayRGB } from "color-thief-react/lib/types";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const containerRef = useRef(null);
  const updateAnimations = (x, y) => {
    const container = containerRef.current;
    const containerWidth = container.scrollWidth;
    const containerHeight = container.scrollHeight;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    let translationX = (x / windowWidth) * (containerWidth - windowWidth);
    translationX = Math.min(
      0,
      Math.max(-translationX, -(containerWidth - windowWidth + 20))
    );

    let translationY = (y / windowHeight) * (containerHeight - windowHeight);
    translationY = Math.min(
      0,
      Math.max(-translationY, -(containerHeight - windowHeight + 20))
    );

    gsap.to(container, {
      duration: 1,
      x: translationX,
      y: translationY,
      ease: "sine",
    });
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      const y = e.touches ? e.touches[0].clientY : e.clientY;
      const mask = document.querySelector(".mask");

      // mask.style.setProperty("--mouse-x", (x / window.innerWidth) * 100 + "%");
      // mask.style.setProperty("--mouse-y", (y / window.innerHeight) * 100 + "%");
      requestAnimationFrame(() => {
        updateAnimations(x, y);
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleClick = () => {
    gsap
      .timeline()
      .set("#image-wrap", {
        transformOrigin: "50% 0%",
      })
      .to(
        "#image-wrap",
        {
          xPercent: () => gsap.utils.random(-150, 150),
          yPercent: () => gsap.utils.random(-300, 300),
          z: () => gsap.utils.random(5000, 6500),
          rotationX: 0,
          filter: "brightness(200%)",
          duration: 4,
          ease: "power2",
        },
        0
      )
      .fromTo(
        "#items-inner",
        {
          scale: 2,
        },
        {
          scale: 0.5,
        },
        0
      );
  };

  return (
    <main
      className={`fixed h-full w-full top-0 left-0 overflow-hidden ${inter.className} ease-linear duration-300`}
      style={{
        background: "#191a19",
      }}
    >
      {/* <div className="mask"></div> */}
      <div
        ref={containerRef}
        className="overflow-visible w-full will-change-transform"
        style={{
          perspective: "1500px",
        }}
      >
        <div
          id="grid-wrap"
          className="grid w-[135%] min-h-[135%] gap-0"
          style={{
            gridTemplateColumns: "repeat(5, 1fr)",
            perspective: "1500px",
            transformStyle: "preserve-3d",
          }}
        >
          {Array.from({ length: 49 }, (_, i) => i + 1).map((id) => {
            return (
              <div
                onClick={() => handleClick()}
                key={id}
                id="image-wrap"
                className="overflow-hidden ease-in-out duration-500 w-full h-[180px] brightness-70"
              >
                <div
                  className="items-inner"
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundImage: `url(/movie-banners/${id}.jpg)`,
                    backgroundSize: "cover",
                    backgroundPosition: "50% 50%",
                  }}
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
