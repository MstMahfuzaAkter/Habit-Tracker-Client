import React, { useRef } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Slick carousel styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Slide data
const slides = [
  {
    title: "Build Habits, Build Your Future",
    subtitle: "Track your progress and stay consistent every day.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Small Steps, Big Changes",
    subtitle: "Consistency turns goals into achievements.",
    image:
      "https://i.postimg.cc/mgbKYq0H/girl-with-backpack-walking-up-stairs.jpg",
  },
  {
    title: "Stay Motivated",
    subtitle: "Join a community that grows together.",
    image:
      "https://i.postimg.cc/B61TPSp1/full-shot-woman-posing-sunset.jpg",
  },
];

const HeroSlider = () => {
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    arrows: false,
    fade: true,
    speed: 1000,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ul className="flex gap-3"> {dots} </ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-3 h-3 bg-white/60 hover:bg-white rounded-full transition-all duration-300"></div>
    ),
  };

  return (
    <section className="relative overflow-hidden pb-10 rounded-2xl">
      <Slider ref={sliderRef} {...settings}>
        {slides.map((slide, i) => (
          <div key={i} className="relative h-[80vh]">
            {/* Background image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center text-white px-4">
              {/* Animated title */}
              <motion.h1
                key={`title-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-6xl font-bold mb-3"
              >
                {slide.title}
              </motion.h1>

              {/* Animated subtitle */}
              <motion.p
                key={`subtitle-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-lg md:text-2xl max-w-2xl"
              >
                {slide.subtitle}
              </motion.p>
            </div>
          </div>
        ))}
      </Slider>

      {/* Manual Navigation Buttons */}
      <button
        onClick={() => sliderRef.current.slickPrev()}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition"
      >
        <ChevronLeft size={28} />
      </button>

      <button
        onClick={() => sliderRef.current.slickNext()}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition"
      >
        <ChevronRight size={28} />
      </button>
    </section>
  );
};

export default HeroSlider;
