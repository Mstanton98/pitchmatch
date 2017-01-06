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
  Navigator
} from 'react-native';


export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accessToken: '',
      userInfo: {}

    };
  }

  async componentDidMount() {
    await this.getToken();

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
    })

    if (!this.state.accessToken) {
      this.setState({ startView: 'auth', renderAuth: true });
    }
    else if (this.state.accessToken && !this.state.userInfo.bio) {
      this.setState({ startView: 'editProfile'});
    }
    else {
      this.setState({ startView: 'userView'});
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

  render() {
    return (
      <View style={styles.container}>
        <Navigator
          style={{ flex: 1 }}
          renderScene={(route, navigator) => {
            if (this.state.accessToken && !this.state.userInfo.bio) {
              return <EditProfile
                navigator={navigator}
                user={this.state.userInfo}
                token={this.state.accessToken}
              />;

            }
            if (this.state.accessToken && this.state.userInfo.bio) {
              return <UserView
                navigator={navigator}
                user={this.state.userInfo}
                token={this.state.accessToken}
              />;
            }
            else {
              return <Auth
                navigator={navigator}
                token={this.state.accessToken}
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
    marginTop: 15
  }
});

module.exports = Main;
