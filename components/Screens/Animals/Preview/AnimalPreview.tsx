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
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { User } from 'types/api/user/types';
import { hasVetRole } from 'utils/hasVetRole';
import { AnimalAppointmentDiaryInfo } from 'components/Screens/Animals/Preview/AnimalAppointmentDiaryInfo';
import { AppointmentApi } from 'api/appointment/appointment.api';
import { AppointmentDiary } from 'types/api/appointment/types';
import { AnimalNavigationMoreButton } from 'components/Navigation/Animal/AnimalNavigationMoreButton';
import { setForceFetchingList } from 'store/list/listSlice';

export const animalPreviewInclude = 'owner,breed,coatColor';

export const AnimalPreview = () => {
  const { params: { animalId } } = useRoute<RouteProps<'Animal'>>();
  const [ animal, setAnimal ] = useState<Animal | undefined>();
  const { handleErrorAlert } = useErrorAlert();
  const navigation = useNavigation<NavigationProps>();
  const user = useSelector((state: RootState) => state.user.currentUser) as User;
  const isVet = hasVetRole(user);
  const [ appointmentDiaryLoading, setAppointmentDiaryLoading ] = useState(true);
  const [ appointmentDiary, setAppointmentDiary ] = useState<AppointmentDiary | undefined>();
  const dispatch = useDispatch();

  useEffect(() => {
    handleInit();
  }, []);

  useEffect(() => {
    if (animal) {
      navigation.setOptions({
        headerRight: () => (
          <AnimalNavigationMoreButton
            setAnimal={setAnimal}
            animal={animal}
          />
        ),
      });
      dispatch(setForceFetchingList(true));
    }
  }, [ animal?.status ]);

  const handleInit = async () => {
    await fetchAnimal();
    await fetchAppointmentDiary();
  };

  const fetchAnimal = async () => {
    try {
      const params = {
        include: animalPreviewInclude,
      };
      const res = await AnimalApi.getAnimal(animalId, params);
      setAnimal(res);
      navigation.setOptions({
        headerTitle: res.name,
        headerRight: () => (
          <AnimalNavigationMoreButton
            setAnimal={setAnimal}
            animal={res}
          />
        ),
      });
    } catch (err: any) {
      const errors = getRequestErrors(err);
      handleErrorAlert(errors);
    }
  };

  const fetchAppointmentDiary = async () => {
    setAppointmentDiaryLoading(true);
    try {
      const params = {
        size: 1,
        include: 'appointment',
      };
      const res = await AppointmentApi.getAnimalAppointmentDiaries(animalId, params);
      setAppointmentDiary(res[0]);
    } catch (err: any) {
      const errors = getRequestErrors(err);
      handleErrorAlert(errors);
    }
    setAppointmentDiaryLoading(false);
  };

  return (
    !animal || appointmentDiaryLoading ? <Loading /> : (
      <View>
        <AnimalBasicInfo animal={animal} />
        {isVet && <AnimalOwnerInfo owner={animal.owner} />}
        {appointmentDiary && (
          <AnimalAppointmentDiaryInfo
            diary={appointmentDiary}
            animalId={animal.id}
          />
        )}
      </View>
    )
  );
};
