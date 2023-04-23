import {useNavigation} from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {removeToken} from 'store/auth/authSlice';
import colors from 'themes/colors';
import {HomeScreenNavigationProps} from "types/Navigation/types";

export const HomeScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<HomeScreenNavigationProps>();

    const onLogout = async () => {
        await SecureStore.deleteItemAsync('token');
        dispatch(removeToken());
    };

    return (
        <View style={styles.centeredView}>
            <Text>Homescreen</Text>
            <Button title='Wyloguj' onPress={onLogout}/>
            <Button title='Profil' onPress={() => navigation.navigate('User')}/>
            <Button title='Dodaj zwierzę' onPress={() => navigation.navigate('Create Animal')}/>
            <Button title='Moje zwierzęta' onPress={() => navigation.navigate('User Animals')}/>
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
