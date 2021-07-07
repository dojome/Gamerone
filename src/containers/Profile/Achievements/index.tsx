import React from 'react';
import { connect } from 'react-redux';
import { selectCurrentProfileUser } from 'redux/profile/selectors';
import { RootState } from 'redux/types';
import { Achievement } from 'interfaces';
import usePromise from 'lib/usePromise';
import { getProfileAchievementsById } from 'api/achievements';
import { UserModel } from 'models/user';
import Loader from 'components/common/Loader';
import AchievementFullCard from './AchievementFull';
import AchievementCard from './AchievementCard';
import { AchievementModel } from 'models/AchievementModel';
import AchievementBannerCard from './AchievementBannerCard';
import './style.scss';
import OpenGraph, { PageMeta } from 'components/common/OpenGraph';
import { SITE_URL } from 'utils/constants';
import sort from 'fast-sort';

const Achievements: React.FC<MappedProps> = ({
  user,
}: MappedProps): JSX.Element => {
  const [isLoading, achievements, error] = usePromise<AchievementModel[]>(
    () =>
      new Promise(async (resolve, reject) => {
        try {
          const data = (await getProfileAchievementsById(
            user.id,
          )) as Achievement[];
          const achivements = data.map((item) =>
            new AchievementModel().fromDto(item),
          );

          sort(achivements).desc((ach) => ach.date.getTime());

          resolve(achivements);
        } catch (ex) {
          reject(ex);
        }
      }),
    [user],
  );

  const pageTitle = user?.username + "'s Achievements";
  const achievementMeta = {
    title:
      'Check out ' +
      user?.username +
      "'s " +
      achievements?.length +
      ' achievements.',
    description: user?.bio,
    image: user?.avatar,
    url: SITE_URL + '/' + user?.username + '/achievements',
    type: 'profile',
    username: user?.username,
    firstName: user?.firstName,
    lastName: user?.lastName,
  } as PageMeta;

  return (
    <>
      <OpenGraph title={pageTitle} meta={achievementMeta} />
      <AchievementBannerCard action="follower" achievements={achievements} />
      <AchievementFullCard>
        {isLoading && !error && <Loader />}
        {!isLoading && achievements?.length === 0 && <h3>No Achievements</h3>}
        {achievements != null &&
          achievements.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
      </AchievementFullCard>
      <AchievementBannerCard action="post" achievements={achievements} />
    </>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    user: selectCurrentProfileUser(state) || new UserModel(),
  };
};

type MappedProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Achievements);
