import { useNavigation } from '@react-navigation/native';
import routes from 'constants/routes';
import * as SecureStore from 'expo-secure-store';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { removeToken } from 'store/auth/authSlice';
import colors from 'themes/colors';

export const HomeScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const onLogout = async () => {
        await SecureStore.deleteItemAsync('token');
        dispatch(removeToken());
    };

    return (
        <View style={styles.centeredView}>
            <Text>Homescreen</Text>
            <Button title='Wyloguj' onPress={onLogout} />
            <Button title='Profil' onPress={() => navigation.navigate(routes.USER) as never} />
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: colors.WHITE
    }
});
