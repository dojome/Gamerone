import React, { useState } from 'react';
import Dialog from 'components/common/Dialog';
import { useSelector, useDispatch } from 'react-redux';
import { selectSettingsProducts } from 'redux/settings/selectors';
import { Product } from 'interfaces';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import { selectProductFormIsOpen } from 'redux/dialogs/selectors';
import DialogActions from 'redux/dialogs/actions';
import { DialogTypeEnum } from 'redux/dialogs/types';

interface StoreSettingsProps {
  visible?: boolean;
  onClose?: () => void;
}

const closeProductForm = DialogActions.showDialog(
  DialogTypeEnum.FORM_PRODUCT,
  false,
);

const openProductForm = DialogActions.showDialog(
  DialogTypeEnum.FORM_PRODUCT,
  true,
);

const StoreSettings: React.FC<StoreSettingsProps> = ({
  visible,
  onClose,
}: StoreSettingsProps): JSX.Element => {
  const products = useSelector(selectSettingsProducts);
  const formIsOpen = useSelector(selectProductFormIsOpen);
  const dispatch = useDispatch();
  const [product, setProduct] = useState<Product | undefined>(undefined);

  const handleAddClick = () => {
    dispatch(openProductForm);
    setProduct(undefined);
  };

  const handleSetProduct = (product: Product) => {
    setProduct(product);
    dispatch(openProductForm);
  };

  const handleHideForm = () => {
    dispatch(closeProductForm);
  };

  const resetState = () => {
    handleHideForm();
    onClose && onClose();
  };

  return (
    <Dialog
      title={!formIsOpen ? 'Store' : !product ? 'Add Product' : 'Edit Product'}
      testid="store-settings"
      show={visible}
      onClose={resetState}
    >
      {formIsOpen ? (
        <ProductForm product={product} onCancel={handleHideForm} />
      ) : (
        <ProductList
          products={products}
          onAddClick={handleAddClick}
          onItemClick={handleSetProduct}
          onClose={onClose}
        />
      )}
    </Dialog>
  );
};

export default StoreSettings;
