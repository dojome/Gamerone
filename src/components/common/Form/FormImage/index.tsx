import React from 'react';
import { useDropzone } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';

import EditImage from 'components/common/EditImage';
import Icon from 'components/common/Icon';
import './style.scss';
import { FormImageProps } from './types';

function FormImage({
  name,
  src,
  testid,
  showHint = false,
  needEdit = false,
  showEditButton = false,
  showRemoveButton = false,
  withinInputWrapper = true,
  editInfo,
  defaultSrc,
  validationRules,
  children,
}: FormImageProps) {
  const [uploadedImage, setUploadedImage] = React.useState(src);
  const [editedImage, setEditedImage] = React.useState(src);
  const [isEditing, setIsEditing] = React.useState(false);
  const { register, setValue, errors } = useFormContext();

  const openEditDialog = React.useCallback(
    (isDefualt: boolean) => {
      if (needEdit && !isDefualt) {
        setIsEditing(true);
      }
    },
    [needEdit],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    multiple: false,
    onDrop: (acceptedFiles) => {
      const files = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      );

      openEditDialog(false);
      setUploadedImage(files[0].preview);
    },
  });

  const handleEditClick = React.useCallback(
    (e: any) => {
      e.stopPropagation();
      openEditDialog(uploadedImage === defaultSrc);
    },
    [openEditDialog, uploadedImage, defaultSrc],
  );

  const handleRemoveClick = React.useCallback(
    (e: any) => {
      e.stopPropagation();
      if (defaultSrc) setEditedImage(defaultSrc);
    },
    [defaultSrc],
  );

  const handleCancel = React.useCallback(() => {
    setIsEditing(false);
  }, []);

  const handleApply = React.useCallback((blobUrl: string) => {
    setUploadedImage(blobUrl);
    setEditedImage(blobUrl);
    setIsEditing(false);
  }, []);

  // Register image to form
  React.useEffect(() => {
    register({ name, type: 'custom' }, validationRules);
  }, [register, name, validationRules]);

  // Update form value
  React.useEffect(() => {
    setValue(name, editedImage, {
      shouldValidate: true,
      shouldDirty: editedImage !== src,
    });
  }, [setValue, name, editedImage, src]);

  return (
    <>
      <div className="input-group">
        <div
          className={withinInputWrapper ? 'input-wrapper' : ''}
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          {showEditButton ? (
            <button
              type="button"
              onClick={handleEditClick}
              className="button button--small button--square button--flat close"
            >
              <Icon name="icon-image-file-edit" />
            </button>
          ) : null}
          {showRemoveButton ? (
            <button
              type="button"
              onClick={handleRemoveClick}
              className="button button--small button--square button--flat close"
            >
              <Icon name="icon-remove" />
            </button>
          ) : null}
        </div>

        <div
          {...getRootProps({
            className: 'input-dropzone',
          })}
        >
          <input
            name={name}
            {...getInputProps()}
            aria-label="file-upload"
            data-testid={testid}
          />

          <>
            {children({
              src: editedImage,
            })}
          </>

          {errors[name] ? (
            <div className="input-hint" data-testid={`${testid}-error`}>
              Image is required.
            </div>
          ) : null}

          <p
            style={{
              paddingTop: '0.75rem',
              fontSize: '80%',
              opacity: '0.5',
            }}
          >
            {showHint ? (
              isDragActive ? (
                <>Drop your image here ...</>
              ) : (
                <>
                  Drag &apos;n&apos; drop your image here, or click to select
                  files.
                </>
              )
            ) : null}
          </p>
        </div>
      </div>

      {uploadedImage && editInfo ? (
        <EditImage
          image={uploadedImage}
          visible={isEditing}
          title="Edit Image"
          onCancel={handleCancel}
          onApply={handleApply}
          {...editInfo}
        />
      ) : null}
    </>
  );
}

export default React.memo(FormImage);
