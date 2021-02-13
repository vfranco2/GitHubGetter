import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, Image, View, FlatList, Text } from 'react-native';
import colors from '../resources/colors.js'

const MainPage = () => {

  const dataTest = [
    { id: '1', title: 'User1' },
    { id: '2', title: 'User2' },
    { id: '3', title: 'User3' }
  ];
  //states
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const allUsersLink = 'https://api.github.com/users';

  //updates and re-renders page, fetches data
  useEffect(() => {
    //setIsLoading(true);
    loadDefaultData(allUsersLink)
  }, []);

  function loadDefaultData(apiLink) {
    fetch(apiLink)
      .then(response => response.json())
      .then(response => {
        setData(response);
        //setIsLoading(false);
      })
      .catch(err => {
        //setIsLoading(false);
        setError(err);
      });
  }

  //Main view
  return (
    <View style={styles.mainPage}>
      <FlatList
        data={data}
        keyExtractor={item => item.login}
        renderItem={({ item }) => (
          <View style={styles.userList}>
            <Image style={styles.userImage} source={{ uri: item.avatar_url }} />
            <Text style={styles.userName}>{item.login}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainPage: {
    flex:0,
    backgroundColor: colors.bgAccent
  },
  userList: {
    backgroundColor: colors.bg,
    padding: 12,
    marginHorizontal: 8,
    marginVertical: 4,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 40/2,
    marginRight: 12
  },
  userName: {
    fontSize: 26,
    color: colors.textPri
  },
});

export default MainPage;
