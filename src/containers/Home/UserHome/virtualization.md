```javascript
import React, { memo } from 'react';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import AutoSizer from 'react-virtualized-auto-sizer';

import Cover from 'components/common/Cover';

import { RootState } from 'redux/types';
import { selectHomeFeed, selectHasMoreHomeFeed } from 'redux/post/selectors';
import { PostModel } from 'models/post';
import { selectSettingsProfileUser } from 'redux/settings/selectors';
import Feed from 'components/layout/Feed';
import Card, { CardTypeEnum } from 'components/common/Card';
import UserCard, { UserCardTypeEnum } from 'containers/Cards/UserCard';
import Page from 'components/layout/Page';

import { PostActionTypes } from 'redux/post/types';
import PostActions from 'redux/post/actions';
import { selectHomeFeedStatus } from 'redux/request-status/selectors';

import {MemoizedPostCard} from 'containers/Cards/PostCard';

import './style.scss';
import Loader from 'components/common/Loader';

const ListContainer = (props: any) => {
  return <div style={{ position: 'relative' }} {...props}></div>;
};

function UserHome({
  feed,
  user,
  hasMoreFeed,
  // loadStatus,
  dispatchLoadNextFeed,
}: MappedProps) {
  const { banner } = user;
  const [data, setData] = React.useState<PostModel[]>([]);

  const isItemLoaded = (index: number) =>
    index < data.length && data[index] !== null;
  const loadMoreItems = (startIndex: number, stopIndex: number) => {
    console.log(`Need more items from ${startIndex} to ${stopIndex}`);
    if (!isLastPage) {
      dispatchLoadNextFeed();
    }

    return new Promise((resolve) => {
      while (true) {
        if (loadStatus?.isSuccess === true) {
          resolve();
          break;
        }
      }
    });
  };

  React.useEffect(() => {
    setData(feed);
  }, [feed]);

  return (
    <Page title="Home">
      <Cover src={banner} />
      <Feed
        outerWrap
        left={
          <UserCard type={UserCardTypeEnum.Compact} user={user} isSelf={true} />
        }
        right={<Card type={CardTypeEnum.FLAT}></Card>}
      >
        <AutoSizer>
          {({ height, width }) => (
            <InfiniteLoader
              isItemLoaded={isItemLoaded}
              itemCount={data.length}
              loadMoreItems={loadMoreItems}
            >
              {({ onItemsRendered, ref }) => (
                <List
                  className="List"
                  height={height}
                  width={width}
                  itemCount={data.length}
                  itemSize={230}
                  itemData={data}
                  innerElementType={ListContainer}
                  onItemsRendered={onItemsRendered}
                  ref={ref}
                >
                  {MemoizedPostCard}
                </List>
              )}
            </InfiniteLoader>
          )}
        </AutoSizer>
      </Feed>
    </Page>
  );
}

const mapStateToProps = (state: RootState) => ({
  user: selectSettingsProfileUser(state),
  feed: selectHomeFeed(state) as PostModel[],
  hasMoreFeed: selectHasMoreHomeFeed(state),
  loadStatus: selectHomeFeedStatus(state),
});

export function mapDispatchToProps(dispatch: Dispatch<PostActionTypes>) {
  return {
    dispatchLoadNextFeed: () => dispatch(PostActions.loadNextFeed('home')),
  };
}

type MappedProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(UserHome) as React.ElementType;
```
