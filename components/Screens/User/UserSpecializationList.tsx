import React from 'react';
import { ListRenderItem } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { User, VetSpecialization } from 'types/api/user/types';
import { SimpleList } from 'components/List/SimpleList';
import { UserSpecializationListItem } from 'components/Screens/User/UserSpecializationListItem';

export const UserSpecializationList = () => {
  const user = useSelector((state: RootState) => state.user.currentUser) as User;

  const renderSpecialization: ListRenderItem<VetSpecialization> = ({ item }) => (
    <UserSpecializationListItem
      vetSpecialization={item}
    />
  );

  return (
    <SimpleList
      data={user?.specializations || []}
      renderItem={renderSpecialization}
    />
  );
};
