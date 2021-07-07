import React from 'react';
import withChrome from 'components/common/Chrome/withChrome';
import Page from 'components/layout/Page';
import { Link } from 'react-router-dom';
import Badge from 'components/common/Badge';

const Discover: React.FC = (): JSX.Element => {
  return (
    <Page title="Discover">
      <section style={{ textAlign: 'center', padding: '10rem 0 3rem' }}>
        <h1>Discover</h1>
      </section>

      <section style={{ textAlign: 'center', padding: '3rem 0' }}>
        <h2>Trending topics</h2>

        {[
          'Callofduty',
          'Playofthegame',
          'Gamerone',
          'Crossoutvideos',
          'Livestream',
          'Overwatchvideos',
        ].map((item, index) => {
          return (
            <Link
              to={`search?q=${item}`}
              key={index.toString()}
              style={{ marginRight: '1rem' }}
            >
              <Badge type="hashtag" testid="hashtag-badge">
                <i className="icon icon-hash" />
                {item}
              </Badge>
            </Link>
          );
        })}
      </section>
    </Page>
  );
};

export default withChrome(Discover);
