import React from 'react';
import { useSelector } from 'react-redux';
import { UserModel } from 'models/user';
import { selectProfileUser } from 'redux/selectors';
import Cover from 'components/common/Cover';

const ProfileCover: React.FC = (): JSX.Element => {
  const { banner } = useSelector(selectProfileUser) || new UserModel();
  return <Cover src={banner} />;
};

export default ProfileCover;
