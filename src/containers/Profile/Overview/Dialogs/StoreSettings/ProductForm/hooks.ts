import { useEffect } from 'react';
import { Product } from 'interfaces';

// Specific object for the form as image is a Blob on the REAL object
export interface ProductRequestForm {
  name: string;
  productImage: string;
  link: string;
}

export function useResetProduct(
  product: Product | null | undefined,
  setUploadedAvatar: (image: string | null) => void,
  reset: (req: ProductRequestForm) => void,
) {
  useEffect(() => {
    if (product) {
      const { name, image, link } = product;
      reset({
        name,
        productImage: image,
        link,
      });
      setUploadedAvatar(image);
    } else {
      reset({
        name: '',
        productImage: '',
        link: '',
      });
    }
  }, [product, setUploadedAvatar, reset]);
}
