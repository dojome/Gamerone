import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { PostMedia } from 'interfaces';
import Image from 'components/common/Image';
import { ImageCarousel } from 'components/common/ImageCarousel';
import DialogActions from 'redux/dialogs/actions';
import { DialogTypeEnum } from 'redux/dialogs/types';

interface PostCardMediaSupportProps {
  media: PostMedia[];
}

const PostCardMediaGrid: React.FC<PostCardMediaSupportProps> = ({
  media = [],
}: PostCardMediaSupportProps): JSX.Element => {
  const [imageDisplayCount, setImageDisplayCount] = useState(
    media.length === 5
      ? 5
      : media.length === 4
      ? 4
      : media.length === 3
      ? 3
      : media.length === 2
      ? 2
      : 1,
  );

  const handleImageGrid = () => {
    if (media.length !== 1) {
      setImageDisplayCount(imageDisplayCount + 1);
      if (imageDisplayCount + 1 > media.length) {
        setImageDisplayCount(1);
      }
    }
  };

  return (
    <div className="card__media">
      <div
        className={`media-grid media-grid--count-${imageDisplayCount}`}
        onClick={handleImageGrid}
      >
        {media.slice(0, imageDisplayCount).map((item, index) => {
          return (
            <figure key={index.toString()}>
              <Image src={item.filename} alt="" width={600} cropType="fit" />
            </figure>
          );
        })}
      </div>
    </div>
  );
};

const PostCardMediaCarousel: React.FC<PostCardMediaSupportProps> = ({
  media = [],
}: PostCardMediaSupportProps): JSX.Element => {
  const images = media.map((media, index) => (
    <Image key={index} src={media.filename} alt="" width={450} cropType="fit" />
  ));

  const dispatch = useDispatch();
  const handleOpenMediaDialog = () => {
    dispatch(DialogActions.showDialog(DialogTypeEnum.MEDIA, true, media));
  };

  const handleExplandClick = (e: any) => {
    e.stopPropagation();
    dispatch(DialogActions.showDialog(DialogTypeEnum.MEDIA, true, media));
  };

  return (
    <>
      <div className="card-media">
        {media.length === 1 ? (
          <figure onClick={handleOpenMediaDialog}>
            <Image src={media[0].filename} alt="" width={700} />
          </figure>
        ) : media.length > 1 ? (
          <ImageCarousel>{images}</ImageCarousel>
        ) : (
          <></>
        )}
        <div className="card-media__zoom">
          <button
            className="button button--square button--very-small button--subtle"
            onClick={handleExplandClick}
          >
            <i className="icon icon-expand-3" />
          </button>
        </div>
      </div>
    </>
  );
};

export interface PostCardMediaProps {
  media: PostMedia[];
  grid?: boolean;
}

const PostCardMedia: React.FC<PostCardMediaProps> = ({
  media = [],
  grid = false,
}: PostCardMediaProps): JSX.Element => {
  return grid ? (
    <PostCardMediaGrid media={media} />
  ) : (
    <PostCardMediaCarousel media={media} />
  );
};

export default React.memo(PostCardMedia);
