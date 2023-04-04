import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import {
  OverLay, Header, SlickWrapper, ImgWrapper, Indicator,
} from './style';

function ImagesZoom({ images, onClose }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  return (
    <OverLay>
      <Header>
        <h1>상세 이미지</h1>
        <button onClick={onClose}>X</button>
      </Header>
      <SlickWrapper>
        <div>
          <Slider
            initialSlide={0}
            afterChange={(slide) => setCurrentSlide(slide)}
            infinite
            slidesToShow={1}
            slidesToScroll={1}
          >
            {images.map((v) => (
              <ImgWrapper key={v.src}>
                <img src={`${v.src}`} alt={v.src} />
              </ImgWrapper>
            ))}
          </Slider>
          <Indicator>
            <div>
              {currentSlide + 1}
              /
              {images.length}
            </div>
          </Indicator>
        </div>
      </SlickWrapper>
    </OverLay>
  );
}

ImagesZoom.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImagesZoom;
