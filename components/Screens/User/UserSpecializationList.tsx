import React, {useState} from 'react';
import {ListRenderItem} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from 'store/store';
import {User, VetSpecialization} from 'types/api/user/types';
import {SimpleList} from 'components/List/SimpleList';
import {UserSpecializationListItem} from 'components/Screens/User/UserSpecializationListItem';
import {FullScreenLoading} from "components/Composition/FullScreenLoading";
import {useSuccessAlert} from "hooks/Alerts/useSuccessAlert";

export const UserSpecializationList = () => {
  const user = useSelector((state: RootState) => state.user.currentUser) as User;
  const [removeLoading, setRemoveLoading] = useState(false);
  const {drawSuccessAlert, handleSuccessAlert} = useSuccessAlert();

  const renderSpecialization: ListRenderItem<VetSpecialization> = ({item}) => (
    <UserSpecializationListItem
      vetSpecialization={item}
      setRemoveLoading={setRemoveLoading}
      handleSuccessAction={handleSuccessAction}
    />
  );

  const handleSuccessAction = () => {
    handleSuccessAlert();
  };

  return (
    <>
      <FullScreenLoading loading={removeLoading}/>
      {drawSuccessAlert()}
      <SimpleList
        data={user?.specializations || []}
        renderItem={renderSpecialization}
        searchKeys={['name']}
      />
    </>
  );
};
