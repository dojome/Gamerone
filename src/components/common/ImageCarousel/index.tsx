import React, { ReactNode } from 'react';
import Carousel from 'nuka-carousel';

export type ImageCarouselProps = {
  children?: ReactNode;
};

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
  children,
}: ImageCarouselProps) => {
  return (
    <Carousel
      autoGenerateStyleTag={false}
      autoplay={false}
      wrapAround={false}
      autoplayInterval={3000}
      renderCenterLeftControls={({ previousSlide }) => (
        <button
          className="button button--square button--very-small button--subtle prev"
          onClick={previousSlide}
          style={{ margin: '0.625rem' }}
        >
          <i className="icon icon-125x icon-arrow-left-1" />
        </button>
      )}
      renderCenterRightControls={({ nextSlide }) => (
        <button
          className="button button--square button--very-small button--subtle next"
          onClick={nextSlide}
          style={{ margin: '0.625rem' }}
        >
          <i className="icon icon-125x icon-arrow-right-1" />
        </button>
      )}
    >
      {children}
    </Carousel>
  );
};

export default React.memo(ImageCarousel);
