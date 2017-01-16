import React, { Component } from 'react';
import EditProfile from './EditProfile';
import UserView from './UserView';
import Auth from './Auth';
import ChatView from './ChatView';
import MatchList from './MatchList';
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Navigator,
  ScrollView,
  TouchableOpacity,
  Image
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
    this.getToken = this.getToken.bind(this);
    this.delToken = this.delToken.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.getInfo = this.getInfo.bind(this);
    this.getMatches = this.getMatches.bind(this);
    this.userUpdate = this.userUpdate.bind(this);
    // this.getMessages = this.getMessages.bind(this);
    this.onPress = this.onPress.bind(this);
    this.onPress2 = this.onPress2.bind(this);
  }

  componentDidMount() {
    this.getToken();
  }

  getUsers() {
    return fetch('http://localhost:8000/api/users', {
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
    })
  }

  getInfo() {
    return fetch('http://localhost:8000/api/userInfo', {
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
  }

  getMatches() {
    return fetch('http://localhost:8000/api/matches', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        cookie: `token=${this.state.accessToken}`
      }
    })
    .then(response => response.json())
    .then((res) => {

      this.setState({ matches: res });
    })
    .catch((err) => {
      console.log(err);
    })
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

  userUpdate() {
    let newArr = [...this.state.users];

    newArr.pop();
    this.setState({ users: newArr });
  }

  onPress() {
    this.refs.navigator.immediatelyResetRouteStack([{ident: 'UserView'}, {ident: 'MatchList', sceneConfig: Navigator.SceneConfigs.FloatFromRight}]);
  }

  onPress2() {
    this.refs.navigator.pop();
  }

  render() {
    return (
      <View style={styles.container}>
        <Navigator
          ref='navigator'
          style={{ flex: 1 }}
          initialRoute={{ident: 'Auth'}}
          configureScene={(route) => ({
            ...route.sceneConfig || Navigator.SceneConfigs.FloatFromRight,
            gestures: route.gestures
          }
        )}
        renderScene={(route, navigator) => {
          if (route.ident === 'Auth') {
            return <Auth
              navigator={navigator}
              token={this.state.accessToken}
              getToken={this.getToken}
              delToken={this.delToken}
            />;
          }
          if (route.ident === 'EditProfile') {
            return <EditProfile
              navigator={navigator}
              user={this.state.userInfo}
              token={this.state.accessToken}
              delToken={this.delToken}
              getUsers={this.getUsers}
              getInfo={this.getInfo}
            />;
          }
          if (this.state.accessToken && route.ident === 'UserView') {
            return <UserView
              navigator={navigator}
              user={this.state.userInfo}
              users={this.state.users}
              userUpdate={this.userUpdate}
              matches={this.state.matches}
              token={this.state.accessToken}
              getUsers={this.getUsers}
              getMatches={this.getMatches}
              getInfo={this.getInfo}
            />;
          }
          if (route.ident === 'MatchList') {
            return <MatchList
              navigator={navigator}
              user={this.state.userInfo}
              token={this.state.accessToken}
              matches={this.state.matches}
              getUsers={this.getUsers}
              getInfo={this.getInfo}
            />;
          }
          if (route.ident === 'ChatView') {
            return <ChatView
              user={route.user}
            />
          }
          if (route.ident === 'MatchNotification') {
            return <ScrollView style={styles.notificationCont}>
              <Text style={{fontFamily: 'Avenir', fontSize: 30, alignSelf: 'center'}}>You matched with {route.firstName}!</Text>
              <Image style={styles.userImg} source={{uri: route.imgUrl }} />
              <TouchableOpacity style={styles.notification} onPress={this.onPress}>
                <Text style={styles.button}>Check them out</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.notification2} onPress={this.onPress2}>
                <Text style={styles.button2}>Go Away</Text>
              </TouchableOpacity>
            </ScrollView>
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
  },
  notificationCont: {
    flex: 1,
    backgroundColor: 'white'
  },
  userImg: {
    marginTop: 25,
    borderRadius: 125,
    height: 250,
    width: 250,
    alignSelf: 'center'
  },
  notification: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 75,
    borderWidth: 15,
    borderColor: '#70587B',
    borderRadius: 50
  },
  notification2: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    borderWidth: 15,
    borderColor: '#70587B',
    borderRadius: 50
  },
  button: {
    fontSize: 30,
    fontFamily: 'Avenir',
    backgroundColor: '#70587B',
    color: 'black'
  },
  button2: {
    fontSize: 30,
    fontFamily: 'Avenir',
    backgroundColor: '#70587B',
    color: 'black'
  }
});

module.exports = Main;
