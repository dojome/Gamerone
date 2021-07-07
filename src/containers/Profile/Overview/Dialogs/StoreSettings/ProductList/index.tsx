import React from 'react';
import Icon from 'components/common/Icon';

import Button, { ButtonSchemeEnum } from 'components/common/Button';
import { Product } from 'interfaces';
import ListItem from 'components/common/ListItem';
import { DialogContent, DialogActions } from 'components/common/Dialog';
import { connect } from 'react-redux';
import { compose } from 'redux';
import SettingsActions from 'redux/settings/actions';
import { selectDeleteStoreStatus } from 'redux/request-status/selectors';
import { RootState } from 'redux/types';

interface ProductListProps {
  products: Product[];
  onAddClick: () => void;
  onItemClick: (product: Product) => void;
  onClose: () => void;
}

const ProductList: React.FC<ProductListProps & MappedProps> = ({
  products,
  onAddClick,
  onItemClick,
  onClose,
  deleteStatus,
  dispatchDelete,
}: ProductListProps & MappedProps): JSX.Element => {
  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement>,
    currentProduct: Product,
  ) => {
    e.stopPropagation();
    dispatchDelete(currentProduct.id);
  };

  return (
    <>
      <DialogContent>
        {products.length > 0 ? (
          products.map((product) => (
            <ListItem
              key={product.id}
              title={product.name}
              description={product.link}
              image={product.image}
              badgeType="wide"
              onClick={() => onItemClick(product)}
              appendRight={
                <>
                  <Button
                    schemes={[ButtonSchemeEnum.SQUARE, ButtonSchemeEnum.REVEAL]}
                    iconLeft="icon-bin"
                    onClick={(e) => handleDelete(e, product)}
                    submitting={deleteStatus?.isFetching}
                  />
                  {/* <div className="list-item__drag" /> */}
                </>
              }
            />
          ))
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{ opacity: 0.5 }}>
              <Icon name="icon-video-game-controller" size="3x" />
            </div>
            <p style={{ margin: '0.5rem', opacity: 0.3 }}>No Products yet.</p>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                margin: '1rem',
              }}
            >
              <Button
                scheme={ButtonSchemeEnum.PRIMARY}
                iconLeft="icon-video-game-controller"
                onClick={onAddClick}
              >
                Add product
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
      {products.length > 0 && (
        <DialogActions showDoneButton={products.length > 0} onClose={onClose}>
          <Button
            scheme={ButtonSchemeEnum.PRIMARY}
            iconLeft="icon-video-game-controller"
            onClick={onAddClick}
            disabled={products.length >= 5}
          >
            Add product
          </Button>
        </DialogActions>
      )}
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  deleteStatus: selectDeleteStoreStatus(state),
});

const mapDispatchToProps = {
  dispatchDelete: SettingsActions.deleteProduct,
};

type MappedProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  React.memo,
)(ProductList) as React.ElementType;
