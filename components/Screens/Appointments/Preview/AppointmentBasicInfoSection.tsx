import { Text, View } from 'react-native';
import { Appointment } from 'types/api/appointment/types';
import { FormatAddress } from 'components/Formatters/FormatAddress';
import { Avatar } from 'components/Composition/Avatar';
import moment from 'moment';
import { BreakLine } from 'components/Composition/BreakLine';
import { appointmentBasicInfoSectionStyles } from 'components/Screens/Appointments/Preview/styles/styles';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { User } from 'types/api/user/types';
import { hasVetRole } from 'utils/hasVetRole';
import { AddressApi } from 'types/api/types';
import { PhoneNumber } from 'components/Composition/PhoneNumber';

interface Props {
  appointment: Appointment;
}

export const AppointmentBasicInfoSection = ({ appointment }: Props) => {
  const { date, medicalService, animal } = appointment;
  const user = useSelector((state: RootState) => state.user.currentUser) as User;
  const isVet = hasVetRole(user);

  const hasAddress = () => {
    if (isVet) return !!animal.owner?.address;
    return true;
  };

  // TODO dorobić przycisk wysyłania wiadomości
  return (
    <>
      <View style={appointmentBasicInfoSectionStyles.container}>
        <View style={appointmentBasicInfoSectionStyles.innerContainer}>
          <Text style={appointmentBasicInfoSectionStyles.text}>
            {isVet ? animal.owner.name : medicalService.user.name}
          </Text>
          {
            hasAddress() && (
              <FormatAddress
                address={isVet ? animal.owner!.address as AddressApi : medicalService.clinic.address}
                style={appointmentBasicInfoSectionStyles.text}
              />
            )
          }
          <Text style={[ appointmentBasicInfoSectionStyles.text, appointmentBasicInfoSectionStyles.date ]}>
            {moment(date).format('HH:mm dddd, DD.MM.YYYY')}
          </Text>
          {
            !isVet && (
              <Text style={appointmentBasicInfoSectionStyles.text}>
                {animal.name}
              </Text>
            )
          }
          {
            isVet && animal.owner.phoneNumber
            && (
              <PhoneNumber
                phoneNumber={animal.owner.phoneNumber}
                withIcon
                size="large"
              />
            )
          }
        </View>
        <Avatar
          size="small"
          url={medicalService.user.profilePhotoUrl}
        />
      </View>
      <BreakLine style={appointmentBasicInfoSectionStyles.breakLine} />
    </>
  );
};
