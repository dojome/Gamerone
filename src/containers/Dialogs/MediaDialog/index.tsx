import React from 'react';
import { connect } from 'react-redux';
import Dialog from 'components/common/Dialog';
import Image from 'components/common/Image';
import {
  selectMediaDialogIsOpen,
  selectMediaDialogProp,
} from 'redux/dialogs/selectors';
import DialogActions from 'redux/dialogs/actions';
import { RootState } from 'redux/types';
import { DialogTypeEnum } from 'redux/dialogs/types';
import { PostMedia } from 'interfaces';

const MediaDialog: React.FC<MappedProps> = ({
  media,
  isOpen,
  dispatchShowDialog,
}: MappedProps): JSX.Element => {
  const images = media.map((media, index) => (
    <Image key={index} src={media.filename} alt="" width={600} />
  ));

  const handleClose = React.useCallback(() => {
    dispatchShowDialog(DialogTypeEnum.MEDIA, false);
  }, [dispatchShowDialog]);

  return media.length > 1 ? (
    <Dialog
      type="media"
      testid="media-dialog"
      show={isOpen}
      images={images}
      onClose={handleClose}
      disableOutlineClick={true}
    ></Dialog>
  ) : (
    <Dialog
      type="media"
      testid="media-dialog"
      show={isOpen}
      onClose={handleClose}
      disableOutlineClick={true}
    >
      {images[0]}
    </Dialog>
  );
};

const mapStateToProps = (state: RootState) => ({
  isOpen: selectMediaDialogIsOpen(state),
  media: (selectMediaDialogProp(state) || []) as PostMedia[],
});

const mapDispatchToProps = {
  dispatchShowDialog: DialogActions.showDialog,
};

type MappedProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MediaDialog);
