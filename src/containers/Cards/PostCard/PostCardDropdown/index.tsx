import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button, { ButtonSchemeEnum } from 'components/common/Button';
import Dropdown, { DropdownOptionType } from 'components/common/Dropdown';

import PostActions from 'redux/post/actions';
import { selectCurrentUserId } from 'redux/auth/selectors';
import copyToClipboard from 'utils/clipboard';

interface PostCardDropdownProps {
  postId: number;
  postUserId: number;
  postUrl: string;
  postContent: string;
}

function PostCardDropdown({
  postId,
  postUserId,
  postUrl,
  postContent,
}: PostCardDropdownProps) {
  const dispatch = useDispatch();

  const currentUserId = useSelector(selectCurrentUserId);
  const [isLinkCopied, setIsLinkCopied] = React.useState(false);

  const handleCopyLinkClick = React.useCallback(() => {
    copyToClipboard(postUrl);

    setIsLinkCopied(true);
    setTimeout(() => {
      setIsLinkCopied(false);
    }, 5000);
  }, [postUrl]);

  const dropdownOptions = React.useMemo(() => {
    const options: DropdownOptionType[] = [
      {
        label: 'Share',
        onClick: () => dispatch(PostActions.sharePost(postUrl, postContent)),
      },
      {
        label: !isLinkCopied ? 'Copy link' : 'Copied',
        onClick: handleCopyLinkClick,
      },
      //   { label: 'Report', link: '/' },
    ];

    if (currentUserId === postUserId) {
      options.push({
        label: 'Delete',
        onClick: () => dispatch(PostActions.deletePost(postId)),
      } as DropdownOptionType);
    }

    return options;
  }, [
    isLinkCopied,
    handleCopyLinkClick,
    currentUserId,
    dispatch,
    postUrl,
    postContent,
    postUserId,
    postId,
  ]);

  return (
    <Dropdown options={dropdownOptions}>
      <Button scheme={ButtonSchemeEnum.SQUARE}>...</Button>
    </Dropdown>
  );
}

export default PostCardDropdown;
