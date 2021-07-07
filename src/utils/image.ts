import { CDN_URL, CORS_PROXY_URL } from './constants';

/**
 * Convert url to File object
 *
 * @param url string
 */
export const getFileFromUrl = async (url: string) => {
  let nLink = url;
  if (url.startsWith('user_content')) {
    nLink = CDN_URL + '/512/' + url;
  } else if (!url.startsWith('blob:')) {
    nLink = `${CORS_PROXY_URL}/${url}`;
  }

  const blob = await fetch(nLink).then((r: any) => r.blob());

  const file = new File([blob], 'f.png', {
    type: blob.type,
    lastModified: Date.now(),
  });

  return file;
};

/**
 * Crop image to a specific aspect ratio
 *
 * @url - Source of the image to use
 * @aspectRatio - The aspect ratio to apply
 */
export const crop = (url: string, aspectRatio: number) => {
  return new Promise<HTMLCanvasElement>((resolve) => {
    // this image will hold our source image data
    const inputImage = new Image();

    // we want to wait for our image to load
    inputImage.onload = () => {
      // let's store the width and height of our image
      const inputWidth = inputImage.naturalWidth;
      const inputHeight = inputImage.naturalHeight;

      // get the aspect ratio of the input image
      const inputImageAspectRatio = inputWidth / inputHeight;

      // if it's bigger than our target aspect ratio
      let outputWidth = inputWidth;
      let outputHeight = inputHeight;
      if (inputImageAspectRatio > aspectRatio) {
        outputWidth = inputHeight * aspectRatio;
      } else if (inputImageAspectRatio < aspectRatio) {
        outputHeight = inputWidth / aspectRatio;
      }

      // calculate the position to draw the image at
      const outputX = (outputWidth - inputWidth) * 0.5;
      const outputY = (outputHeight - inputHeight) * 0.5;

      // create a canvas that will present the output image
      const outputImage = document.createElement('canvas');

      // set it to the same size as the image
      outputImage.width = outputWidth;
      outputImage.height = outputHeight;

      // draw our image at position 0, 0 on the canvas
      const ctx = outputImage.getContext('2d');
      if (ctx) ctx.drawImage(inputImage, outputX, outputY);
      resolve(outputImage);
    };

    // start loading our image
    inputImage.src = url;
  });
};

export const cropImage = async (url: string, aspectRatio: number) => {
  const canvas = await crop(url, aspectRatio);
  const response = await fetch(canvas.toDataURL());

  return window.URL.createObjectURL(response.blob());
};
