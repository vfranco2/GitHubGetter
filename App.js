import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, StatusBar, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import MainPage from './components/MainPage.js'
import colors from './resources/colors.js';



const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.navBar}>
          <Icon name="github" size={40} color="#FFFFFF" />
          <Text style={styles.navText}>VladHub</Text>
        </View>
        <MainPage/>
      </SafeAreaView>
    </>
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
