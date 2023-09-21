import { User } from 'types/api/user/types';
import { Card } from 'components/Composition/Card';
import { VetListItemBasicInfo } from 'components/Screens/Home/VetListItem/VetListItemBasicInfo';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { listItemStyles } from 'screens/utils/styles';

interface Props {
  vet: User;
}

export const VetListItem = ({ vet }: Props) => {
  const specializations = '';
  return (
    <TouchableWithoutFeedback>
      <View style={[ listItemStyles.container, styles.container ]}>
        <Card>
          <VetListItemBasicInfo vet={vet} />
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
});
