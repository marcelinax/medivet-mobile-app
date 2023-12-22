import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { listItemStyles } from 'screens/utils/styles';
import { Card } from 'components/Composition/Card';
import { Avatar } from 'components/Composition/Avatar';
import icons from 'themes/icons';
import { Animal } from 'types/api/animal/types';
import { updateAppointmentDetails } from 'store/home/appointmentSlice';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from 'types/Navigation/types';
import { useDispatch } from 'react-redux';

interface Props {
  animal: Animal;
}

export const AnimalListItem = ({ animal }: Props) => {
  const navigation = useNavigation<NavigationProps>();
  const dispatch = useDispatch();

  const handleChooseAnimal = () => {
    dispatch(updateAppointmentDetails({
      field: 'animal',
      value: {
        label: animal.name,
        id: animal.id.toString(),
      },
    }));
    navigation.navigate('Appointment Confirmation');
  };
  return (
    <TouchableWithoutFeedback
      onPress={handleChooseAnimal}
    >
      <View style={listItemStyles.container}>
        <Card>
          <View style={listItemStyles.innerContainer}>
            <Avatar
              size="medium"
              url={animal?.profilePhotoUrl}
              icon={icons.PAW_OUTLINE}
            />
            <View style={listItemStyles.nameContainer}>
              <Text style={listItemStyles.name}>{animal.name}</Text>
            </View>
          </View>
        </Card>
      </View>
    </TouchableWithoutFeedback>
  );
};
