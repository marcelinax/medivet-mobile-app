import { Card } from 'components/Composition/Card';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Animal } from 'types/api/animal/types';
import { Avatar } from 'components/Composition/Avatar';
import { useNavigation } from '@react-navigation/native';
import icons from 'themes/icons';
import { listItemStyles } from 'screens/utils/styles';
import { NavigationProps } from 'types/Navigation/types';
import { AnimalStatus } from 'constants/enums/enums';
import { AnimalStatusBadge } from 'components/Screens/Animals/AnimalStatusBadge';

interface Props {
  animal: Animal;
}

export const AnimalListItem = ({ animal }: Props) => {
  const navigation = useNavigation<NavigationProps>();

  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.push('Animal', { animalId: animal.id })}
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
              {animal.status === AnimalStatus.ARCHIVED
                && (
                  <AnimalStatusBadge
                    status={animal.status}
                    style={{ marginTop: 6 }}
                  />
                )}
            </View>
          </View>
        </Card>
      </View>
    </TouchableWithoutFeedback>
  );
};
