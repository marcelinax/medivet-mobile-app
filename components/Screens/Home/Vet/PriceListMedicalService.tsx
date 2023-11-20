import { StyleSheet, Text, View } from 'react-native';
import { FormatAddress } from 'components/Formatters/FormatAddress';
import { BreakLine } from 'components/Composition/BreakLine';
import { VetClinicProvidedMedicalService } from 'types/api/vetClinicProvidedMedicalService/types';
import colors from 'themes/colors';

interface Props {
  medicalService: VetClinicProvidedMedicalService;
}

export const PriceListMedicalService = ({ medicalService }: Props) => (
  <>
    <View style={styles.container}>
      <FormatAddress
        style={styles.address}
        address={medicalService.clinic.address}
      />
      <Text style={styles.price}>{`${medicalService.price} PLN`}</Text>
    </View>
    <Text style={styles.clinic}>{medicalService.clinic.name}</Text>
    <BreakLine style={styles.breakLine} />
  </>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
  },
  address: {
    fontWeight: '500',
    fontSize: 16,
    flex: 0.7,
  },
  price: {
    flex: 0.3,
    fontSize: 15,
    color: colors.PRIMARY,
    textAlign: 'right',
  },
  breakLine: {
    marginVertical: 16,
  },
  clinic: {
    color: colors.GRAY_DARK,
    fontSize: 16,
    marginTop: 3,
  },
});
