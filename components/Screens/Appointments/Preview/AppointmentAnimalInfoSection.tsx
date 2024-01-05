import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { appointmentBasicInfoSectionStyles } from 'components/Screens/Appointments/Preview/styles/styles';
import moment from 'moment/moment';
import { Avatar } from 'components/Composition/Avatar';
import { BreakLine } from 'components/Composition/BreakLine';
import { Animal } from 'types/api/animal/types';

interface Props {
  animal: Animal;
}

export const AppointmentAnimalInfoSection = ({ animal }: Props) => {
  const { t } = useTranslation();

  return (
    <>
      <View style={appointmentBasicInfoSectionStyles.container}>
        <View style={appointmentBasicInfoSectionStyles.innerContainer}>
          <Text style={appointmentBasicInfoSectionStyles.text}>
            {animal.name}
          </Text>
          <Text style={[ appointmentBasicInfoSectionStyles.text, appointmentBasicInfoSectionStyles.date ]}>
            {moment(animal.birthDate).format('DD.MM.YYYY')}
          </Text>
          <Text style={appointmentBasicInfoSectionStyles.text}>
            {t(`enums.animal.type.${animal.type.toUpperCase()}`)}
          </Text>
          <Text style={appointmentBasicInfoSectionStyles.text}>
            {animal.breed.name}
          </Text>
        </View>
        <Avatar
          size="small"
          url={animal.profilePhotoUrl}
        />
      </View>
      <BreakLine style={appointmentBasicInfoSectionStyles.breakLine} />
    </>
  );
};
