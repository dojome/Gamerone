import React from 'react';
import { CDN_URL } from '../../../utils/constants';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  alt: string;
  useCdn?: boolean;
  scale?: number;
  cropType?: 'sc' | 'fit';
  width?: number;
  height?: number;
}

const Image: React.FC<ImageProps> = ({
  alt,
  useCdn = true,
  scale,
  cropType,
  width,
  height,
  ...props
}: ImageProps): JSX.Element => {
  const { src, ...restProps } = props;
  let cdn = '';
  if (useCdn && src != null && !src.startsWith('blob:')) {
    cdn += CDN_URL + '/';

    if (scale) {
      cdn += 'x' + scale;
    }

    if (width && !height && !cropType) {
      cdn += width + 'x';
    } else if (width && height) {
      cdn += width + 'x' + height;
    } else if (width && cropType) {
      cdn += width;
      if (cropType === 'sc') {
        cdn += ',sc';
      } else if (cropType === 'fit') {
        cdn += ',fit';
      }
    } else {
      cdn += '0x0';
    }

    cdn += '/';

    const imgSrc = cdn + src;
    return <img src={imgSrc} alt={alt} width={width} {...restProps} />;
  }
  // uploaded images (avatar, post, banner etc) / blob output
  return <img src={src} alt={alt} width={width} {...restProps} />;
};

export default Image;
