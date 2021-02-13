import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import colors from './resources/colors.js';
import MainPage from './components/MainPage.js';
import ProfilePage from './components/ProfilePage.js';

const Stack = createStackNavigator();

function GitHeader() {
  return (
    <View style={styles.navBar}>
      <Icon name="github" size={40} color="#FFF" />
      <Text style={styles.navText}>GitVlad</Text>
    </View>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">

        <Stack.Screen name="Home" component={MainPage}
          options={{ headerTintColor: colors.bg, headerStyle: { backgroundColor: colors.textPri, },
                     headerTitle: props => <GitHeader /> }}/>

        <Stack.Screen name="Profile" component={ProfilePage}
          options={{ headerTintColor: colors.bg, headerStyle: { backgroundColor: colors.textPri, },
                   headerTitle: props => <GitHeader /> }}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  navBar: {
    padding: 8,
    flex: 0,
    flexDirection: 'row',
    backgroundColor: colors.textPri,
    alignItems: "center",
    justifyContent: "center",
  },
  navText: {
    fontSize: 20,
    marginLeft: 8,
    color: colors.bg,
  },
});

export default App;
