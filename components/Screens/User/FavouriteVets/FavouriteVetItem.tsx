import {
  StyleSheet, Text, TouchableWithoutFeedback, View,
} from 'react-native';
import { User } from 'types/api/user/types';
import { Avatar } from 'components/Composition/Avatar';
import { listItemStyles } from 'screens/utils/styles';
import { Card } from 'components/Composition/Card';
import colors from 'themes/colors';
import { OpinionRating } from 'components/Composition/OpinionRating';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from 'types/Navigation/types';

interface Props {
  vet: User;
}

export const FavouriteVetItem = ({ vet }: Props) => {
  const {
    profilePhotoUrl,
    specializations,
    opinions,
    id,
  } = vet;
  const specializationTitle = (specializations || []).map((specialization) => specialization.name).join(', ');
  const navigation = useNavigation<NavigationProps>();

  const handleNavigateToVetPreview = () => {
    navigation.navigate('Home Navigator' as any, {
      screen: 'Vet',
      params: {
        vetId: id,
      },
      state: {
        routes: [
          {
            name: 'Vet',
            params: { vetId: id },
          },
        ],
      },
    });
  };

  return (
    <TouchableWithoutFeedback onPress={handleNavigateToVetPreview}>
      <View style={listItemStyles.container}>
        <Card>
          <View style={listItemStyles.innerContainer}>
            <Avatar
              size="medium"
              url={profilePhotoUrl}
            />
            <View style={[ listItemStyles.nameContainer, { flex: 1 } ]}>
              <Text style={listItemStyles.name}>{vet.name}</Text>
              <Text style={styles.specializations}>
                {specializationTitle}
              </Text>
              <OpinionRating opinions={opinions || []} />
            </View>
          </View>
        </Card>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  specializations: {
    fontSize: 15,
    color: colors.GRAY_DARK,
    marginVertical: 3,
  },
});
