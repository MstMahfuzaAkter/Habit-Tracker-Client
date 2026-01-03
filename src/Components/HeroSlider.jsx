import React, { useRef, useState } from "react";
import Slider from "react-slick";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Typewriter } from "react-simple-typewriter";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router";

const slides = [
  {
    title: "Master Your Daily Discipline",
    subtitle: "Turn small actions into life-changing habits with precision tracking and analytics.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Visualize Your Personal Growth",
    subtitle: "Data-driven insights to help you understand your progress and stay on course.",
    image: "https://i.postimg.cc/mgbKYq0H/girl-with-backpack-walking-up-stairs.jpg",
  },
  {
    title: "Built for Peak Performance",
    subtitle: "Join a community of high-achievers optimizing their routines every single day.",
    image: "https://i.postimg.cc/B61TPSp1/full-shot-woman-posing-sunset.jpg",
  },
];

const HeroSlider = () => {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    arrows: false,
    speed: 800,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (old, next) => setCurrentSlide(next),
    appendDots: (dots) => (
      <div className="absolute bottom-10 left-1/2 md:left-[75%] -translate-x-1/2">
        <ul className="flex gap-3"> {dots} </ul>
      </div>
    ),
    customPaging: (i) => (
      <div className={`w-3 h-3 rounded-full transition-all duration-500 ${i === currentSlide ? "bg-blue-600 w-8" : "bg-gray-300"}`}></div>
    ),
  };

  return (
    <section className="relative overflow-hidden rounded-3xl  mx-auto max-w-7xl mt-6 ">
      <Slider ref={sliderRef} {...settings}>
        {slides.map((slide, i) => (
          <div key={i} className="outline-none">
            <div className="flex flex-col md:flex-row items-center h-auto md:h-[70vh]">
              
              {/* LEFT SIDE: IMAGE */}
              <div className="w-full md:w-1/2 h-[40vh] md:h-full overflow-hidden">
                <motion.img
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1.2 }}
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover rounded p-4"
                />
              </div>

              {/* RIGHT SIDE: CONTENT */}
              <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center items-start text-left bg-base-100">
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-base-content min-h-[1.5em]">
                    {currentSlide === i && (
                      <Typewriter
                        words={[slide.title]}
                        loop={1}
                        cursor
                        typeSpeed={50}
                      />
                    )}
                  </h1>

                  <AnimatePresence mode="wait">
                    <motion.p
                      key={`sub-${i}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="text-lg text-base-content/70 leading-relaxed mb-8"
                    >
                      {slide.subtitle}
                    </motion.p>
                  </AnimatePresence>

                  <Link to="/browser-public-habit" className="btn btn-primary btn-md md:btn-lg rounded-full px-10 shadow-lg shadow-primary/20 transition-transform hover:scale-105 active:scale-95">
                    Explore Now
                  </Link>
                </motion.div>
              </div>

            </div>
          </div>
        ))}
      </Slider>

      {/* Manual Navigation - Re-positioned for the split layout */}
      <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4 pointer-events-none z-10">
        <button
          onClick={() => sliderRef.current.slickPrev()}
          className="pointer-events-auto bg-base-100/80 hover:bg-primary hover:text-white text-base-content p-3 rounded-full shadow-lg transition-all"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => sliderRef.current.slickNext()}
          className="pointer-events-auto bg-base-100/80 hover:bg-primary hover:text-white text-base-content p-3 rounded-full shadow-lg transition-all"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
};

export default HeroSlider;