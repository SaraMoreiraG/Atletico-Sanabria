import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import slider1 from "./assets/images/slider1.jpg";

function SimpleSlider() {
  const settings = {
    dots: true, // Show dots for navigation
    infinite: true, // Infinite loop
    speed: 500, // Transition speed
    slidesToShow: 1, // Number of slides to show at a time
    slidesToScroll: 1, // Number of slides to scroll at a time
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000,
  };
  return (
    <section>
      <div className="slider-container">
        <Slider {...settings}>
          <div className="slider1">
            <div className="main-margin col-6">
              <div className="text-slider pe-4">
                <div className="p-3">
                  <h1 className="bg-white border-rounded">
                    Club Deportivo Atlético Sanabria
                  </h1>
                </div>
                <div className="p-3">
                  <h2 className="bg-red border-rounded">Tu logo aquí</h2>
                </div>
                <div className="p-3">
                  <button className="btn-grey">Leer más</button>
                </div>
              </div>
            </div>
          </div>
          <div className="slider2">
            <div className="main-margin col-6">
              <div className="text-slider pe-4">
                <div className="p-3">
                  <h1 className="bg-white border-rounded">
                    Club Deportivo Atlético Sanabria
                  </h1>
                </div>
                <div className="p-3">
                  <h2 className="bg-red border-rounded">Tu logo aquí</h2>
                </div>
                <div className="p-3">
                  <button className="btn-grey">Leer más</button>
                </div>
              </div>
            </div>
          </div>
          <div className="slider3">
            <div className="main-margin col-6">
              <div className="text-slider pe-4">
                <div className="p-3">
                  <h1 className="bg-white border-rounded">
                    Club Deportivo Atlético Sanabria
                  </h1>
                </div>
                <div className="p-3">
                  <h2 className="bg-red border-rounded">Tu logo aquí</h2>
                </div>
                <div className="p-3">
                  <button className="btn-grey">Leer más</button>
                </div>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </section>
  );
}

export default SimpleSlider;
