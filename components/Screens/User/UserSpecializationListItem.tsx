import { VetSpecialization } from 'types/api/user/types';
import { simpleListItemStyles } from 'screens/utils/styles';
import { Text, View } from 'react-native';
import React from 'react';
import { SwipeButtonActionProps } from 'types/components/Buttons/types';
import { SwipeButton } from 'components/Buttons/SwipeButton/SwipeButton';
import { BreakLine } from 'components/Composition/BreakLine';

interface Props {
  vetSpecialization: VetSpecialization;
  actions?: SwipeButtonActionProps[];
}

// przekazać opcjonalne akcji wykorzystujaca swipeable action button
// preview button? (strzalka)
// dorobić akcje usuwania/edycji/podgladu
export const UserSpecializationListItem = ({ vetSpecialization, actions }: Props) => (
  <View
    style={simpleListItemStyles.container}
  >
    <SwipeButton
      rightActions={actions}
    >
      <View style={simpleListItemStyles.innerContainer}>
        <View style={simpleListItemStyles.nameContainer}>
          <Text style={simpleListItemStyles.name}>{vetSpecialization.name}</Text>
        </View>
      </View>
    </SwipeButton>
    <BreakLine />
  </View>
);
