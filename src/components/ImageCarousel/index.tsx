import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import "./index.css";

interface IImageCarouselProps {
  items: string[];
}

const ImageCarousel = ({ items }: IImageCarouselProps) => {
  return (
    <Swiper
      slidesPerView={"auto"}
      centeredSlides={true}
      spaceBetween={30}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      onActiveIndexChange={() => {
        window.Telegram.WebApp.HapticFeedback.impactOccurred("light");
      }}
    >
      {items.map((item: string) => (
        <SwiperSlide key={item}>
          <img src={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageCarousel;
