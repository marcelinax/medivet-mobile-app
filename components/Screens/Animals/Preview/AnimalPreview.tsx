import { View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NavigationProps, RouteProps } from 'types/Navigation/types';
import { useEffect, useState } from 'react';
import { Animal } from 'types/api/animal/types';
import { AnimalApi } from 'api/animal/animal.api';
import { getRequestErrors } from 'utils/errors';
import { useErrorAlert } from 'hooks/Alerts/useErrorAlert';
import { Loading } from 'components/Composition/Loading';
import { AnimalBasicInfo } from 'components/Screens/Animals/Preview/AnimalBasicInfo';
import { AnimalOwnerInfo } from 'components/Screens/Animals/Preview/AnimalOwnerInfo';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { User } from 'types/api/user/types';
import { hasVetRole } from 'utils/hasVetRole';

export const AnimalPreview = () => {
  const { params: { animalId } } = useRoute<RouteProps<'Animal'>>();
  const [ animal, setAnimal ] = useState<Animal | undefined>();
  const { handleErrorAlert } = useErrorAlert();
  const navigation = useNavigation<NavigationProps>();
  const user = useSelector((state: RootState) => state.user.currentUser) as User;
  const isVet = hasVetRole(user);

  useEffect(() => {
    fetchAnimal();
  }, []);

  const fetchAnimal = async () => {
    try {
      const params = {
        include: 'owner,breed,coatColor',
      };
      const res = await AnimalApi.getAnimal(animalId, params);
      setAnimal(res);
      navigation.setOptions({
        headerTitle: res.name,
      });
    } catch (err: any) {
      const errors = getRequestErrors(err);
      handleErrorAlert(errors);
    }
  };

  return (
    !animal ? <Loading /> : (
      <View>
        <AnimalBasicInfo animal={animal} />
        {isVet && <AnimalOwnerInfo owner={animal.owner} />}
      </View>
    )
  );
};
