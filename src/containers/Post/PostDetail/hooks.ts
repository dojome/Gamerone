import React from 'react';
import { LoadPostDetailAction } from 'redux/post/types';
import { useParams } from 'react-router-dom';

interface Props {
  dispatchLoadPost: (pId: number) => LoadPostDetailAction;
}
export default function usePostDetail({ dispatchLoadPost }: Props) {
  const { username, postId } = useParams();

  React.useEffect(() => {
    dispatchLoadPost(postId);
    return () => {
      // TODO: Cancel post loading
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  return { username } as const;
}
