import { TabBar, TabView } from 'react-native-tab-view';
import { StyleSheet, Text } from 'react-native';
import colors from 'themes/colors';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { VetClinics } from 'components/Screens/Home/Vet/VetClinics';
import { User } from 'types/api/user/types';
import { VetClinicProvidedMedicalService } from 'types/api/vetClinicProvidedMedicalService/types';
import { PriceLists } from 'components/Screens/Home/Vet/PriceLists';
import { Opinions } from 'components/Screens/Home/Vet/Opinions';

interface Props {
  vet: User;
  medicalServices: VetClinicProvidedMedicalService[];
}

export const VetPreviewNavigation = ({ vet, medicalServices }: Props) => {
  const { t } = useTranslation();
  const [ index, setIndex ] = useState<number>(0);
  const [ routes ] = useState([
    {
      key: 'address',
      title: t('words.addresses.title'),
    },
    {
      key: 'priceList',
      title: t('words.price_list.title'),
    },
    {
      key: 'opinions',
      title: t('words.opinions.title'),
    },
  ]);

  const renderScene = ({ route }: Record<string, any>) => {
    switch (route.key) {
    case 'address':
      return (
        <VetClinics
          clinics={vet?.clinics || []}
          medicalServices={medicalServices}
          vet={vet}
        />
      );
    case 'opinions':
      return (
        <Opinions
          vetId={vet.id}
        />
      );
    case 'priceList':
      return (
        <PriceLists
          medicalServices={medicalServices}
        />
      );
    default:
      return null;
    }
  };

  return (
    <TabView
      onIndexChange={setIndex}
      navigationState={{
        index,
        routes,
      }}
      swipeEnabled={false}
      renderScene={renderScene}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          scrollEnabled
          pressOpacity={1}
          pressColor={colors.WHITE}
          indicatorContainerStyle={styles.indicatorContainer}
          indicatorStyle={styles.indicator}
          style={styles.tabBar}
          renderLabel={(scene) => (
            <Text style={{
              color: scene.focused ? colors.PRIMARY : colors.GRAY_DARK,
            }}
            >
              {scene.route.title}
            </Text>
          )}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  indicator: {
    backgroundColor: colors.PRIMARY,
  },
  indicatorContainer: {
    borderBottomWidth: 1,
    borderColor: colors.GRAY,
  },
  tabBar: {
    backgroundColor: colors.WHITE,
    marginBottom: 15,
  },
});
