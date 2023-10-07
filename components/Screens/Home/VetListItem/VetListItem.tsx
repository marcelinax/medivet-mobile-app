import { User } from 'types/api/user/types';
import { Card } from 'components/Composition/Card';
import { VetListItemBasicInfo } from 'components/Screens/Home/VetListItem/VetListItemBasicInfo';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { listItemStyles } from 'screens/utils/styles';
import { VetListItemClinicAddressList } from 'components/Screens/Home/VetListItem/VetListItemClinicAddressList';

interface Props {
  vet: User;
}

export const VetListItem = ({ vet }: Props) => {
  const specializations = '';
  return (
    <TouchableWithoutFeedback>
      <View style={[ listItemStyles.container, styles.container ]}>
        <Card>
          <>
            <VetListItemBasicInfo vet={vet} />
            <View style={styles.addressesContainer}>
              <VetListItemClinicAddressList
                clinics={vet?.clinics || []}
                vet={vet}
              />
            </View>
          </>
        </Card>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
    marginBottom: 10,
  },
  addressesContainer: {
    marginTop: 10,
  },
});
