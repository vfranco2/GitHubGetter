import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, Image, View, FlatList, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import colors from '../resources/colors.js'

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

      <FlatList
        data={dataRepos}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.repoList}>
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

const styles = StyleSheet.create({
  profilePage: {
    flex:1,
    backgroundColor: colors.bgAccent
  },
  userProfile: {
    flex:0,
    margin: 8,
    padding: 16,
    backgroundColor: colors.bg,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 12
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 100/2,
    margin: 6,
    alignSelf: 'center',
  },
  userName: {
    margin: 4,
    fontSize: 30,
    color: colors.textSec,
    textAlign: 'center',
    alignSelf: 'center'
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userDetailsLeft: {
    fontSize: 16,
    color: colors.textPri,
  },
  userDetailsRight: {
    fontSize: 16,
    color: colors.textPri,
    textAlign: 'right',
  },
  repoList: {
    backgroundColor: colors.bg,
    padding: 12,
    marginHorizontal: 8,
    marginVertical: 4,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: 'column',
  },
  repoName: {
    fontSize: 20,
    color: colors.textPri,
  },
  repoName: {
    fontSize: 16,
    color: colors.textSec,
    textAlign: 'left',
  }

});

export default ProfilePage;
