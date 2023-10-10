import { ScrollView, StyleSheet, View } from 'react-native';
import colors from 'themes/colors';
import { useTranslation } from 'react-i18next';
import { FilterButton } from 'components/Composition/FilterButton';
import { getAvailableDatesSelectOptions } from 'constants/selectOptions';
import { SelectId } from 'constants/enums/selectId.enum';

export const VetListFilters = () => {
  const { t } = useTranslation();

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal
      style={styles.scrollView}
    >
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <FilterButton
            title={t('words.available_dates.title')}
            isMultiSelect={false}
            options={getAvailableDatesSelectOptions(t)}
            selectId={SelectId.AVAILABLE_DATES}
            filterId="available_dates"
            selectScreenHeaderTitle={t('words.available_dates.title')}
            defaultSelectedFilterValue={getAvailableDatesSelectOptions(t)[2]}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: colors.WHITE,
    marginBottom: 10,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.65,
    elevation: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    flexDirection: 'row',
  },
  buttonContainer: {
    marginRight: 10,
  },
});
