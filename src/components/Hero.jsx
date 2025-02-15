import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";
import { useEffect, useRef, useState } from "react";

import Button from "./Button";
import VideoPreview from "./VideoPreview";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const totalVideos = 4;
  const nextVdRef = useRef(null);

  // Detect if user is on a mobile device
  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  useEffect(() => {
    if (loadedVideos === totalVideos - 1) {
      setLoading(false);
    }
  }, [loadedVideos]);

  const handleMiniVdClick = () => {
    setHasClicked(true);
    setCurrentIndex((prevIndex) => (prevIndex % totalVideos) + 1);
  };

  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });
        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => nextVdRef.current.play(),
        });
        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    { dependencies: [currentIndex], revertOnUpdate: true }
  );

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  const getVideoSrc = (index) => `/videos/hero-${index}.mp4`;

  return (
    <div className="relative h-screen w-screen overflow-x-hidden">
      {loading && (
        <div className="flex-center absolute z-[100] h-screen w-screen overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      <div
        id="video-frame"
        className="relative z-10 h-screen w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div className="w-full h-full">
          {!isMobile ? (
            <>
              {/* Mini Video Button */}
              <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg sm:hidden">
                <VideoPreview>
                  <div
                    onClick={handleMiniVdClick}
                    className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
                  >
                    <video
                      ref={nextVdRef}
                      src={getVideoSrc((currentIndex % totalVideos) + 1)}
                      loop
                      muted
                      playsInline
                      id="current-video"
                      className="size-64 origin-center scale-150 object-cover object-center"
                      onLoadedData={handleVideoLoad}
                    />
                  </div>
                </VideoPreview>
              </div>

              {/* Next Video */}
              <video
                ref={nextVdRef}
                src={getVideoSrc(currentIndex)}
                loop
                muted
                playsInline
                id="next-video"
                className="absolute-center invisible absolute z-20 size-64 object-cover object-center sm:hidden"
                onLoadedData={handleVideoLoad}
              />

              {/* Main Background Video */}
              <video
                src={getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
                autoPlay
                loop
                muted
                playsInline
                className="absolute left-0 top-0 w-full h-full object-cover object-center"
                onLoadedData={handleVideoLoad}
              />
            </>
          ) : (
            // Show Image Fallback for Mobile
            <img
              src="/img/mobile-hero.jpg"
              alt="Blood Nexus Studio"
              className="absolute left-0 top-0 w-full h-full object-cover object-center"
            />
          )}
        </div>

        {/* Hero Content */}
        <div className="absolute left-0 top-0 z-40 size-full flex flex-col items-center justify-center text-center px-6 sm:px-10">
          <h1 className="font-roller-coaster-serif text-3xl sm:text-5xl hero-heading">
            <span className="text-red-blood">Blood</span>
            <b>n</b>exus
          </h1>
          <p className="mt-2 text-sm sm:text-lg font-robert-regular text-blue-100 max-w-xs sm:max-w-lg">
            At BN Studios, we're a passionate team crafting memorable experiences.
          </p>
          <Button
            id="watch-trailer"
            title="Watch Trailer"
            leftIcon={<TiLocationArrow />}
            containerClass="bg-yellow-300 flex-center gap-1 mt-3 sm:mt-5"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
