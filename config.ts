import Constants from 'expo-constants';

export default {
    apiUrl: `http://${Constants?.manifest?.debuggerHost?.split(':')?.shift()}:3005/`,
};