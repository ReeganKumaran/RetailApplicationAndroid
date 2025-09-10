import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'token';

// Save token
const storeToken = async (token) => {
  try {
    if (token === undefined || token === null) {
      console.warn('storeToken called with null/undefined; removing token');
      await AsyncStorage.removeItem(TOKEN_KEY);
      return;
    }
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error('Error storing token:', error);
  }
};

// Get token
const getToken = async () => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

// Remove token
const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error removing token:', error);
  }
};
export { storeToken, getToken, removeToken };   
