import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { connect } from 'react-redux';

import Button, { ButtonSchemeEnum } from 'components/common/Button';
import Input from 'components/common/Form/Input';

import { ProductRequest, Product } from 'interfaces';
import SettingsActions from 'redux/settings/actions';
import {
  selectAddProductStatus,
  selectUpdateStoreStatus,
} from 'redux/request-status/selectors';
import { URL_CHECK_REGEX } from 'utils/constants';
import {
  ERROR_MSG_URL_PATTERN,
  ERROR_MSG_MIN_LENGTH_3,
} from 'utils/formErrors';
import { useCallback } from 'react';
import Image from 'components/common/Image';
import { DialogContent, DialogActions } from 'components/common/Dialog';
import { compose } from 'redux';
import { RootState } from 'redux/types';
import { useResetProduct, ProductRequestForm } from './hooks';
import { getFileFromUrl } from 'utils/image';

interface ProductFormProps {
  product: Product | undefined;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps & MappedProps> = ({
  product,
  onCancel,
  addStatus,
  updateStatus,
  dispatchAdd,
  dispatchUpdate,
}: ProductFormProps & MappedProps): JSX.Element => {
  const [currentProduct, setCurrentProduct] = useState<Product | undefined>(
    product,
  );
  const [uploadedAvatar, setUploadedAvatar] = useState<string | null>();

  const {
    register,
    handleSubmit,
    formState,
    setValue,
    clearErrors,
    errors,
    reset,
  } = useForm<ProductRequestForm>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });
  const { isDirty } = formState;

  useResetProduct(currentProduct, setUploadedAvatar, reset);

  // Dropzone for store image upload
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    multiple: false,
    onDrop: (acceptedFiles) => {
      const files = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      );

      setUploadedAvatar(files[0].preview);
    },
  });

  useEffect(() => {
    setValue('productImage', uploadedAvatar || '');
    if (uploadedAvatar) clearErrors('productImage');
  }, [uploadedAvatar, setValue, clearErrors]);

  useEffect(() => {
    register({ name: 'productImage' }, { required: true });
  }, [register]);

  const handleClose = useCallback(() => {
    setUploadedAvatar(null);
    setCurrentProduct(undefined);
    onCancel();
  }, [setUploadedAvatar, setCurrentProduct, onCancel]);

  const onSubmit = async (data: Record<string, any>) => {
    const id = currentProduct?.id;
    const request = {
      name: data.name,
      link: data.link,
      image: await getFileFromUrl(data.productImage),
    } as ProductRequest;

    if (id) {
      dispatchUpdate(request, id);
    } else {
      dispatchAdd(request);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      data-testid="form"
      style={{ display: 'flex', flexDirection: 'column', flex: '1' }}
    >
      <DialogContent>
        <div style={{ display: 'flex' }}>
          <div>
            <div className="input-wrapper input-dropzone">
              <div
                style={{
                  width: '12rem',
                  height: '7.5rem',
                  textAlign: 'center',
                }}
                {...getRootProps({
                  className:
                    'input' + (errors['productImage'] ? ' is-error' : ''),
                })}
              >
                <input
                  name="productImage"
                  {...getInputProps()}
                  aria-label="file-upload"
                  data-testid="productImage"
                />
                {uploadedAvatar ? (
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div
                      style={{
                        maxWidth: '5rem',
                        maxHeight: '6.5rem',
                      }}
                    >
                      <Image
                        src={uploadedAvatar}
                        alt={currentProduct?.name || 'Product image'}
                        width={200}
                        style={{
                          width: '100%',
                          height: '100%',
                        }}
                      />
                    </div>
                  </div>
                ) : errors['productImage'] ? (
                  <div className="input-hint" data-testid="productImage-error">
                    Image is required.
                  </div>
                ) : (
                  <p
                    style={{
                      paddingTop: '0.75rem',
                      fontSize: '80%',
                      opacity: '0.3',
                      textAlign: 'center',
                    }}
                  >
                    {isDragActive ? (
                      <>Drop your avatar here ...</>
                    ) : (
                      <>
                        Drag &amp; drop or <br />
                        click to select files.
                      </>
                    )}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div style={{ flex: 1, marginLeft: '1.5rem' }}>
            <Input
              name="name"
              label="Name"
              inputRef={register({
                required: true,
                minLength: {
                  value: 3,
                  message: ERROR_MSG_MIN_LENGTH_3,
                },
                maxLength: 50,
              })}
              error={errors['name']}
              maxLength={50}
            />
            <Input
              name="link"
              label="Product URL"
              inputRef={register({
                maxLength: 255,
                validate: (v: string) =>
                  !v ||
                  v.match(URL_CHECK_REGEX) !== null ||
                  ERROR_MSG_URL_PATTERN,
              })}
              maxLength={255}
              error={errors['link']}
            />
          </div>
        </div>
      </DialogContent>
      <DialogActions alignRight={true}>
        <Button onClick={handleClose} data-testid="cancel">
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={!isDirty}
          scheme={ButtonSchemeEnum.PRIMARY}
          submitting={addStatus?.isFetching || updateStatus?.isFetching}
          iconLeft="icon-monetization-sponsor"
          data-testid="save"
        >
          {currentProduct ? 'Update' : 'Save'}
        </Button>
        {addStatus?.isError && (
          <div aria-label="error-message">
            <p>
              {addStatus?.error?.message}: Something went wrong. Please try
              again
            </p>
          </div>
        )}
      </DialogActions>
    </form>
  );
};

const mapStateToProps = (state: RootState) => ({
  addStatus: selectAddProductStatus(state),
  updateStatus: selectUpdateStoreStatus(state),
});

const mapDispatchToProps = {
  dispatchAdd: SettingsActions.addProduct,
  dispatchUpdate: SettingsActions.updateProduct,
};

type MappedProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  React.memo,
)(ProductForm) as React.ElementType;
