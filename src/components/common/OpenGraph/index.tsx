import React from 'react';
import { Helmet } from 'react-helmet';
import { SITE_NAME, SHARE_FACEBOOK_APP_ID } from 'utils/constants';
import { CDN_URL } from '../../../utils/constants';

export type PageMeta = {
  title: string;
  description?: string;
  url: string;
  type:
    | 'website'
    | 'music.song'
    | 'music.album'
    | 'music.playlist'
    | 'music.radio_station'
    | 'video.movie'
    | 'video.episode'
    | 'video.tv_show'
    | 'video.other'
    | 'article'
    | 'book'
    | 'profile'
    | 'profile:username'
    | 'profile:first_name'
    | 'profile:last_name';
  image: string;
  username?: string;
  firstName?: string;
  lastName?: string;
};

export interface OpenGraphProps {
  title: string;
  meta: PageMeta;
}

const OpenGraph: React.FC<OpenGraphProps> = ({
  title,
  meta,
}: OpenGraphProps): JSX.Element => {
  return (
    <Helmet>
      <title>
        {title} | {SITE_NAME}
      </title>
      <meta property="og:title" content={meta.title} />
      {meta.description && (
        <meta property="og:description" content={meta.description} />
      )}
      {meta && <meta property="og:type" content={meta.type} />}
      {meta && <meta property="og:url" content={meta.url} />}
      {meta && (
        <meta property="og:image" content={CDN_URL + '/0x0/' + meta.image} />
      )}
      <meta property="og:site_name" content="Gamer One" />
      <meta property="og:locale" content="en_CA" />
      {meta.type === 'profile' && meta.username && (
        <meta property="og:profile:username" content={meta.username} />
      )}
      {meta.type === 'profile' && meta.username && (
        <meta property="og:profile:first_name" content={meta.firstName} />
      )}
      {meta.type === 'profile' && meta.username && (
        <meta property="og:profile:last_name" content={meta.lastName} />
      )}
      <meta property="fb:app_id" content={SHARE_FACEBOOK_APP_ID} />
    </Helmet>
  );
};

export default OpenGraph;
