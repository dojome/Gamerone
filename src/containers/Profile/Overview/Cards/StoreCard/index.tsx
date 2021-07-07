import React from 'react';
import { Product } from 'interfaces';
import Card, { CardTypeEnum } from 'components/common/Card';
import Image from 'components/common/Image/index';
import Button from 'components/common/Button';
import { ImageCarousel } from 'components/common/ImageCarousel';
import './style.scss';

export interface StoreCardProps {
  products: Product[];
  isOwner?: boolean;
  handleClickEdit?: () => void;
}

const StoreCard: React.FC<StoreCardProps> = ({
  products,
  isOwner = false,
  handleClickEdit,
}: StoreCardProps): JSX.Element => {
  const productItems =
    products != null &&
    products.map((product: Product) => {
      return (
        <a
          key={product.id}
          href={product.link}
          title={'Click to view'}
          target={'_blank'}
          rel={'noopener noreferrer'}
        >
          <Image
            id={''}
            src={product.image}
            alt={product.name}
            width={250}
            height={460}
          />
          <div className="product-name">
            <h3>{product.name}</h3>
          </div>
        </a>
      );
    });

  return (
    <Card
      type={CardTypeEnum.STORE}
      isOwner={isOwner && products.length > 0}
      onEdit={handleClickEdit}
      data-testid="card-store"
    >
      {products && products.length > 0 ? (
        <div className="card__content">
          <ImageCarousel>{productItems}</ImageCarousel>
        </div>
      ) : (
        <>
          <div className="card__header">
            <h4>Store</h4>
          </div>
          <div className="card__content empty">
            <p>No products yet.</p>
            {isOwner && (
              <Button onClick={handleClickEdit} data-testid="add-product">
                Add your products
              </Button>
            )}
          </div>
        </>
      )}
    </Card>
  );
};

export default StoreCard;
