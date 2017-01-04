import React, { Component } from 'react';
import MatchList from './MatchList';
import EditProfile from './EditProfile';
import UserView from './UserView';
import Auth from './Auth';
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
} from 'react-native';


export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: '',
    };
  }

  async getToken() {
    try {
      let token = await AsyncStorage.getItem(STORAGE_KEY);
      return this.setState({ accessToken: token });
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Auth />
        {/* <EditProfile />
        <UserView />
        <MatchList /> */}

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 40,
    marginTop: 15
  }
});

module.exports = Main;
