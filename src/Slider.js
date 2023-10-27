import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import slider1 from "./assets/images/slider1.jpg";

function SimpleSlider() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
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
                    ¡Vive la pasión del fútbol!
                  </h1>
                </div>
                <div className="p-3">
                  <h2 className="bg-red border-rounded">
                    Fútbol 11 y Fútbol sala
                  </h2>
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
                    ¡Pedalea hacia la aventura!
                  </h1>
                </div>
                <div className="p-3">
                  <h2 className="bg-red border-rounded">
                    Apúntate a nuestras escapadas de ciclismo
                  </h2>
                </div>
                <div className="p-3">
                  <button className="btn-grey">Leer más</button>
                </div>
              </div>
            </div>
          </div>
          <div className="slider3">
            <div className="main-margin col-8">
              <div className="text-slider pe-4">
                <div className="p-3">
                  <h1 className="bg-white border-rounded">
                    ¡La raqueta y la diversión te esperan!
                  </h1>
                </div>
                <div className="p-3">
                  <h2 className="bg-red border-rounded">
                    Juega al pádel con nosotros
                  </h2>
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
