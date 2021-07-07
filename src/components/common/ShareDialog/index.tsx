import React from 'react';
import Dialog, { DialogContent } from '../Dialog';
import DataItem from '../DataItem';
import Input from '../Form/Input';
import Button from '../Button';
import { connect } from 'react-redux';
import {
  selectShareDialogIsOpen,
  selectShareDialogProp,
} from 'redux/dialogs/selectors';
import DialogActions from 'redux/dialogs/actions';
import { RootState } from 'redux/types';
import { DialogTypeEnum } from 'redux/dialogs/types';
import copyToClipboard from 'utils/clipboard';
import { SHARE_FACEBOOK_APP_ID } from 'utils/constants';
import { SharePostActionPayload } from 'redux/post/types';

const ShareDialog: React.FC<MappedProps> = ({
  param,
  isOpen,
  dispatchShowDialog,
}: MappedProps): JSX.Element => {
  const [isUrlCopied, setIsUrlCopied] = React.useState(false);
  const linkDisabled = process.env.NODE_ENV !== 'production';
  const { url: shareURL, content: postContent } = param;
  const twitterShareURL =
    `https://twitter.com/intent/tweet?text=${postContent} - ` +
    encodeURI(shareURL) +
    ' via @WeAreGamerOne';

  const facebookShareURL =
    `https://www.facebook.com/dialog/share?app_id=${SHARE_FACEBOOK_APP_ID}&display=popup&quote=${postContent}&href=` +
    encodeURI(shareURL);

  const redditShareURL =
    'http://www.reddit.com/submit?url=' +
    encodeURI(shareURL) +
    `&title=${postContent}`;

  const handleClose = React.useCallback(() => {
    dispatchShowDialog(DialogTypeEnum.SHARE, false);
  }, [dispatchShowDialog]);

  const handleCopyURLClick = React.useCallback(() => {
    copyToClipboard(shareURL);
    setIsUrlCopied(true);
  }, [shareURL]);

  React.useEffect(() => {
    setIsUrlCopied(false);
  }, [shareURL]);

  return (
    <Dialog
      type="narrow"
      title="Share post"
      testid="share-post"
      show={isOpen}
      onClose={handleClose}
    >
      <DialogContent>
        <DataItem
          icon="icon-social-media-twitter"
          label="Share on Twitter"
          link={linkDisabled ? '' : twitterShareURL}
        />
        <hr
          style={{
            margin: '0.75rem -1.25rem',
            width: 'calc(100% + 2.5rem)',
          }}
        />
        <DataItem
          icon="icon-social-media-facebook"
          label="Share on Facebook"
          link={linkDisabled ? '' : facebookShareURL}
        />
        <hr
          style={{
            margin: '0.75rem -1.25rem',
            width: 'calc(100% + 2.5rem)',
          }}
        />
        <DataItem
          icon="icon-social-media-reddit"
          label="Share on Reddit"
          link={linkDisabled ? '' : redditShareURL}
        />
      </DialogContent>

      <div className="dialog__actions" style={{ paddingBottom: '0.5rem' }}>
        <Input
          name="shareURL"
          value={shareURL}
          appendRight={
            <div style={{ margin: '0.25rem' }}>
              <Button size="small" onClick={handleCopyURLClick}>
                {isUrlCopied ? 'Copied' : 'Copy URL'}
              </Button>
            </div>
          }
        />
      </div>
    </Dialog>
  );
};

const mapStateToProps = (state: RootState) => ({
  isOpen: selectShareDialogIsOpen(state),
  param: (selectShareDialogProp(state) || {
    url: '',
    content: '',
  }) as SharePostActionPayload,
});

const mapDispatchToProps = {
  dispatchShowDialog: DialogActions.showDialog,
};

type MappedProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ShareDialog);
