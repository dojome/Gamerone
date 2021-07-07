import React, { useState, useMemo, useCallback, memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import EditImage from 'components/common/EditImage';

import NewPostImage from '../NewPostImage';

import { selectImages } from 'redux/post-form/selectors';

import PostFormActions from 'redux/post-form/actions';
import { RootState } from 'redux/types';
import { PostFormImage } from 'redux/post-form/types';

import { POST_WIDTH, POST_HEIGHT } from 'utils/constants';

export const NewPostImageContainer: React.FC<MappedProps> = ({
  images,
  dispatchEditImage,
}: MappedProps) => {
  const [editing, setEditing] = useState(false);
  const [image, setImage] = useState<PostFormImage | null>(null);

  const handleCancel = useCallback(() => {
    setEditing(false);
  }, [setEditing]);

  const handleApply = useCallback(
    (blob: string) => {
      setEditing(false);
      if (image) {
        dispatchEditImage(image.id, blob);
      }
    },
    [image, dispatchEditImage],
  );

  const handleEdit = useCallback((image: PostFormImage) => {
    setEditing(true);
    setImage(image);
  }, []);

  const ImageList = useMemo(
    () =>
      images?.map((image) => (
        <NewPostImage image={image} key={image.id} onEdit={handleEdit} />
      )),
    [images, handleEdit],
  );

  return (
    <div>
      {images.length > 0 && (
        <div style={{ marginRight: '1.25rem' }}>{ImageList}</div>
      )}
      {image && (
        <EditImage
          image={image.originalBlob}
          visible={editing}
          title="Edit Image"
          onCancel={handleCancel}
          onApply={handleApply}
          width={POST_WIDTH}
          height={POST_HEIGHT}
          borderRadius={0}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    images: selectImages(state),
  };
};

const mapDispatchToProps = {
  dispatchEditImage: PostFormActions.editImage,
};

type MappedProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo,
)(NewPostImageContainer) as React.ElementType;
