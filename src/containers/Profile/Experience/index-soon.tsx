import React from 'react';
import './style.scss';
import OpenGraph, { PageMeta } from 'components/common/OpenGraph';
import { useSelector } from 'react-redux';
import { selectProfileUser } from 'redux/selectors';
import { SITE_URL } from 'utils/constants';
import GridSpacer from 'components/layout/GridSpacer';

const ExperienceSoon: React.FC = (): JSX.Element => {
  const user = useSelector(selectProfileUser);
  const pageTitle = user?.username + "'s Experience";
  const achievementMeta = {
    title: 'Check out ' + user?.username + "'s  experience.",
    description: user?.bio,
    image: user?.avatar,
    url: SITE_URL + '/' + user?.username + '/experience',
    type: 'profile',
    username: user?.username,
    firstName: user?.firstName,
    lastName: user?.lastName,
  } as PageMeta;

  return (
    <>
      <OpenGraph title={pageTitle} meta={achievementMeta} />
      <GridSpacer size={5}>
        <div style={{ marginTop: '3rem' }}>
          <h1 style={{ textAlign: 'center', fontSize: '1.5rem' }}>
            Experience: Coming Soon
          </h1>
        </div>
      </GridSpacer>
    </>
  );
};

export default ExperienceSoon;
