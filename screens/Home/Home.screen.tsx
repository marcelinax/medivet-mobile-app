import React, { useRef, useState } from 'react';
import { DefaultLayout } from 'layouts/Default.layout';
import { HandleSearchVets, SearchVetsForm } from 'components/Forms/SearchVetsForm';
import { Button } from 'components/Buttons/Button';
import { StyleSheet, Text, View } from 'react-native';
import colors from 'themes/colors';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { useTranslation } from 'react-i18next';

export const HomeScreen = () => {
  const formRef = useRef<HandleSearchVets>(null);
  const filters = useSelector((state: RootState) => state.home.selectedFilters);
  const [ isButtonDisabled, setIsButtonDisabled ] = useState(!filters.city || !filters.specialization);
  const { t } = useTranslation();

  return (
    <DefaultLayout stickyFooterChildren={(
      <Button
        title={t('actions.search.title')}
        variant="solid"
        onPress={() => formRef.current?.onSearch()}
        disabled={isButtonDisabled}
      />
    )}
    >
      <>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>
            {t('words.find_vet.title')}
          </Text>
        </View>
        <SearchVetsForm
          ref={formRef}
          isButtonDisabled={isButtonDisabled}
          setIsButtonDisabled={setIsButtonDisabled}
        />
      </>
    </DefaultLayout>

  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginBottom: 25,
  },
  headerText: {
    fontWeight: '600',
    fontSize: 24,
    color: colors.PRIMARY,
  },
});
