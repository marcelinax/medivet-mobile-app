import { Clinic } from 'types/api/clinic/types';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from 'types/Navigation/types';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Card } from 'components/Composition/Card';
import { Avatar } from 'components/Composition/Avatar';
import { listItemStyles } from 'screens/utils/styles';
import icons from 'themes/icons';
import { FormatAddress } from 'components/Formatters/FormatAddress';

interface Props {
  clinic: Clinic;
}

export const VetClinicListItem = ({ clinic }: Props) => {
  const navigation = useNavigation<NavigationProps>();

  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate('Vet Clinic', { clinicId: clinic.id })}
    >
      <View style={listItemStyles.container}>
        <Card>
          <View style={listItemStyles.innerContainer}>
            <Avatar
              size="medium"
              icon={icons.BUSINESS_OUTLINE}
            />
            <View style={listItemStyles.nameContainer}>
              <Text style={listItemStyles.name}>{clinic.name}</Text>
              <FormatAddress
                address={clinic.address}
                style={listItemStyles.description}
              />
            </View>
          </View>
        </Card>
      </View>
    </TouchableWithoutFeedback>
  );
};
