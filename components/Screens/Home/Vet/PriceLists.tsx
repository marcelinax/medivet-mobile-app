import { ScrollView, StyleSheet } from 'react-native';
import { VetClinicProvidedMedicalService } from 'types/api/vetClinicProvidedMedicalService/types';
import { PriceList } from 'components/Screens/Home/Vet/PriceList';

interface Props {
  medicalServices: VetClinicProvidedMedicalService[];
}

export const PriceLists = ({ medicalServices }: Props) => {
  const getGroupedServicesByMedicalService = () => {
    const groupedServices: ({
      id: number;
      name: string;
      medicalServices: VetClinicProvidedMedicalService[];
    }) [] = [];

    medicalServices.forEach((medicalService) => {
      const existingService = groupedServices.find((groupedService) => groupedService.id === medicalService.medicalService.id);
      if (existingService) {
        groupedServices[groupedServices.indexOf(existingService)] = {
          ...existingService,
          medicalServices: [ ...existingService.medicalServices, medicalService ],
        };
      } else {
        groupedServices.push({
          medicalServices: [ medicalService ],
          id: medicalService.medicalService.id,
          name: medicalService.medicalService.name,
        });
      }
    });

    return groupedServices;
  };

  const drawMedicalServicePriceLists = () => getGroupedServicesByMedicalService().map((medicalService) => (
    <PriceList
      medicalService={medicalService}
      key={`price-list-${medicalService.id}`}
    />
  ));

  return (
    <ScrollView
      style={styles.scrollView}
      bounces={false}
    >
      {drawMedicalServicePriceLists()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    marginTop: 10,
  },
});
