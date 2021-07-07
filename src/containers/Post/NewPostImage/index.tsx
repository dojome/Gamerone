import React, { useCallback, memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Badge from 'components/common/Badge';
import Image from 'components/common/Image';
import Icon from 'components/common/Icon';

import PostFormActions from 'redux/post-form/actions';
import { PostFormImage } from 'redux/post-form/types';
import './style.scss';

export type NewPostImageProps = {
  image: PostFormImage;
  onEdit: (ig: PostFormImage) => void;
};

function NewPostImage({
  image,
  onEdit,
  dispatchRemoveImage,
}: NewPostImageProps & MappedProps) {
  const handleRemoveClick = useCallback(() => {
    dispatchRemoveImage(image.id);
  }, [dispatchRemoveImage, image.id]);

  const handleEditClick = useCallback(() => {
    onEdit(image);
  }, [onEdit, image]);

  return (
    <div style={{ position: 'relative' }}>
      <Badge
        size="small"
        testid="badge-new-post-image"
        onClick={handleEditClick}
      >
        <Image
          src={image.croppedBlob ? image.croppedBlob : image.originalBlob}
          alt="new post image"
          useCdn={false}
        />
      </Badge>
      <div
        style={{ position: 'absolute', top: '-0.625rem', right: '-0.625rem' }}
      >
        <Badge
          type="flat-dark"
          size="tiny"
          testid="badge-new-post-image-remove"
        >
          <Icon name={'icon-remove'} onClick={handleRemoveClick} />
        </Badge>
      </div>
    </div>
  );
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = {
  dispatchRemoveImage: PostFormActions.deleteImage,
};
type MappedProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(NewPostImage) as React.ElementType;
