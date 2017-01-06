import React, { Component } from 'react';
import EditProfile from './EditProfile';
import UserView from './UserView';
import Auth from './Auth';
import ChatView from './ChatView';
import MatchList from './MatchList';
import UserProfile from './UserProfile';
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Navigator
} from 'react-native';


export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accessToken: '',
      userInfo: {},
      users: [],
      matches: [],
    };
  }

  async componentDidMount() {
    await this.getToken();

    if (this.state.accessToken) {
      await fetch('http://localhost:8000/api/userInfo', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          cookie: `token=${this.state.accessToken}`
        }
      })
      .then(response => response.json())
      .then((res) => {

        this.setState({ userInfo: res[0] });
      })
      .catch((err) => {
        console.log(err);
      });

      await fetch('http://localhost:8000/api/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          cookie: `token=${this.state.accessToken}`
        }
      })
      .then(response => response.json())
      .then((res) => {

        this.setState({ users: res });
      })
      .catch((err) => {
        console.log(err);
      });

    }
  }

  async getToken() {
    try {
      let token = await AsyncStorage.getItem('id_token');

      await this.setState({ accessToken: token });
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  async delToken() {
    try {
      await AsyncStorage.removeItem('id_token');

      await this.setState({ accessToken: '' });
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Navigator
          style={{ flex: 1 }}
          initialRoute={{}}
          configureScene={(route) => ({
            ...route.sceneConfig || Navigator.SceneConfigs.FloatFromRight }
          )}
          renderScene={(route, navigator) => {
            if (!this.state.accessToken || route.ident === 'Auth') {
              return <Auth
                navigator={navigator}
                token={this.state.accessToken}
              />;
            }
            if (this.state.accessToken && !this.state.userInfo.bio || route.ident === 'EditProfile') {
              return <EditProfile
                navigator={navigator}
                user={this.state.userInfo}
                token={this.state.accessToken}
                delToken={this.delToken}
              />;

            }
            if (this.state.accessToken && this.state.userInfo.bio || route.ident === 'UserView') {
              return <UserView
                navigator={navigator}
                user={this.state.userInfo}
                users={this.state.users}
                matches={this.state.matches}
                token={this.state.accessToken}
              />;
            }
            if (route.ident === 'MatchList') {
              return <MatchList
                navigator={navigator}
                user={this.state.userInfo}
                token={this.state.accessToken}
                matches={this.state.matches}
              />;
            }
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 40,
  }
});

module.exports = Main;
