import { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const SlideImg = ({ slideImages }) => {
  // 이미지 슬라이드 캐러셀 제어
  const [currentIndex, setCurrentIndex] = useState();
  const handleChange = (index) => {
    setCurrentIndex(index);
  };

  // 이미지 슬라이드
  const renderSlides = slideImages.map((image, index) => (
    <div key={index} onClick={() => handleClick(image.link)}>
      <img src={image.url} />
    </div>
  ));

  const handleClick = (link) => {
    window.location.href = link;
  };

  return (
    <div style={{ marginTop: 70 }}>
      <Carousel
        showArrows={true}
        autoPlay={true}
        infiniteLoop={true}
        interval={2000}
        showThumbs={false}
        selectedItem={slideImages[currentIndex]}
        showStatus={false}
        onChange={handleChange}
      >
        {renderSlides}
      </Carousel>
    </div>
  );
};
export default SlideImg;
