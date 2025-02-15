import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";

export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;
    const { left, top, width, height } = itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    setTransformStyle(`perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`);
  };

  return (
    <div
      ref={itemRef}
      className={`transition-transform duration-300 ease-in-out ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTransformStyle("")}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({ src, title, description, isComingSoon }) => {
  return (
    <div className="relative size-full">
      <video
        src={src}
        loop
        muted
        autoPlay
        className="absolute left-0 top-0 size-full object-cover object-center"
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>}
        </div>

        {isComingSoon && (
          <div className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white sm:text-sm">
            <TiLocationArrow className="relative z-20" />
            <p className="relative z-20">coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Features = () => (
  <section className="bg-black pb-20 md:pb-52">
    <div className="container mx-auto px-4 md:px-10">
      <div className="px-5 py-20 md:py-32 text-center md:text-left">
        <p className="font-circular-web text-lg text-blue-50">Welcome to Blood Nex Studios,</p>
        <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
          where darkness meets innovation in gaming.
        </p>
      </div>

      {/* Feature Section */}
      <BentoTilt className="border-hsla relative mb-7 h-72 sm:h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
        <BentoCard
          src="videos/hero-1.mp4"
          title={
            <>
              Nex<b>u</b>s
            </>
          }
          description="A cross-platform WebApp"
          isComingSoon
        />
      </BentoTilt>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
        <BentoTilt className="bento-tilt_1">
          <BentoCard
            src="videos/feature-1.mp4"
            title={
              <>
                Hy<b>p</b>er Ca<b>s</b>ual
              </>
            }
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1">
          <BentoCard
            src="videos/hero-3.mp4"
            title={
              <>
                n<b>e</b>xus
              </>
            }
            description="A gamified social hub, adding a new dimension of play to social interaction for Web3 communities."
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1">
          <BentoCard
            src="videos/hero-4.mp4"
            title={
              <>
                Hy<b>p</b>er Car
              </>
            }
            description="Optimized 3D models with detailed textures and materials."
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_2">
          <div className="flex size-full flex-col justify-between bg-violet-300 p-5">
            <h1 className="bento-title special-font max-w-64 text-black">
              M<b>o</b>re co<b>m</b>ing s<b>o</b>on.
            </h1>
            <TiLocationArrow className="m-5 scale-[5] self-end" />
          </div>
        </BentoTilt>

        <BentoTilt className="bento-tilt_2">
          <video
            src="videos/hero-2.mp4"
            loop
            muted
            autoPlay
            className="size-full object-cover object-center"
          />
        </BentoTilt>
      </div>
    </div>
  </section>
);

export default Features;
