import { useState } from 'react';
import {
  LayoutAnimation, StyleSheet, Text, TouchableWithoutFeedback, View,
} from 'react-native';
import { VetClinicProvidedMedicalService } from 'types/api/vetClinicProvidedMedicalService/types';
import Ionicons from '@expo/vector-icons/Ionicons';
import icons from 'themes/icons';
import colors from 'themes/colors';
import { BreakLine } from 'components/Composition/BreakLine';
import { PriceListMedicalService } from 'components/Screens/Home/Vet/PriceListMedicalService';

interface Props {
  medicalService: {
    id: number;
    medicalServices: VetClinicProvidedMedicalService[];
    name: string;
  };
}

export const PriceList = ({ medicalService }: Props) => {
  const [ expanded, setExpanded ] = useState(false);

  const animateDropdown = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  const drawMedicalServices = () => medicalService.medicalServices.map((service) => (
    <PriceListMedicalService
      medicalService={service}
      key={`medical-service-${service.id}`}
    />
  ));

  return (
    <View>
      <TouchableWithoutFeedback
        onPress={animateDropdown}
      >
        <View style={styles.innerContainer}>
          <View style={styles.row}>
            <Ionicons
              name={expanded ? icons.CHEVRON_UP : icons.CHEVRON_DOWN}
              size={20}
              color={colors.GRAY_DARK}
            />
            <Text style={styles.medicalService}>{medicalService.name}</Text>
          </View>
          <BreakLine style={styles.breakLine} />
        </View>
      </TouchableWithoutFeedback>
      {
        expanded && drawMedicalServices()
      }
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  medicalService: {
    fontWeight: '500',
    fontSize: 18,
    marginLeft: 5,
  },
  breakLine: {
    marginTop: 16,
  },
  innerContainer: {
    marginBottom: 16,
  },
});
