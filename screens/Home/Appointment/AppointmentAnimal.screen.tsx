import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from 'types/Navigation/types';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimalList } from 'components/Screens/Home/Appointment/AnimalList';
import { ListLayout } from 'layouts/List.layout';

export const AppointmentAnimalScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProps>();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: t('navigation.appointment_animal.title'),
    });
  }, []);

  return (
    <ListLayout withoutBackgroundColor>
      <AnimalList />
    </ListLayout>
  );
};
