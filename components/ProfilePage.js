import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, FlatList, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import colors from '../resources/colors.js'
import styles from '../resources/stylesProfile.js'

const ProfilePage = ({ route, navigation }) => {
  //states
  const [loading, setLoading] = useState(false);
  const [dataProfile, setDataProfile] = useState([]);
  const [dataRepos, setDataRepos] = useState([]);
  const [error, setError] = useState(null);

  //const apiLink = 'https://api.github.com/users/vfranco2';
  const {profileLink} = route.params;

  //updates and re-renders page, fetches data
  useEffect(() => {
    setLoading(true);
    loadApiData(profileLink, setDataProfile)
    loadApiData(`${profileLink}/repos`, setDataRepos)
  }, []);

  //Fetches results from GitHub API
  function loadApiData(apiLink, stateUpdater) {
    fetch(apiLink)
      .then(response => response.json())
      .then(response => {
        stateUpdater(response);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        setError(err);
      });
  }

  function navToRepo(){
    navigation.navigate('Repo', { repoLink: 'https://api.github.com/repos/vfranco2/FootForward'})
  }

  //Main view
  return (
    <View style={styles.profilePage}>
      <View style={styles.userProfile}>
        <Image source={{ uri: dataProfile.avatar_url }} style={styles.userImage} />
          <View>
            <Text style={styles.userName}>{dataProfile.login}</Text>
            <View style={styles.userInfo}>
              <View>
                <Text style={styles.userDetailsLeft}>{dataProfile.company}</Text>
                <Text style={styles.userDetailsLeft}>{dataProfile.blog}</Text>
              </View>
              <View>
                <Text style={styles.userDetailsRight}>Public Repos: {dataProfile.public_repos}</Text>
                <Text style={styles.userDetailsRight}>Followers: {dataProfile.followers}</Text>
              </View>
            </View>
          </View>
      </View>

      <Text style={styles.breakText} >Repositories</Text>

      <FlatList
        data={dataRepos}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.repoList} onPress={() => navToRepo()}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.repoName}>{item.name}</Text>
              <Text style={styles.repoName}>{item.language}</Text>
            </View>
            <Text style={styles.repoDesc}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />

    </View>
  );

};



export default ProfilePage;
