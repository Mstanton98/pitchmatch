import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  Navigator,
  TouchableOpacity,
  Image
} from 'react-native';

import EditProfile from './EditProfile';

import Icon from 'react-native-vector-icons/Octicons';


export default class UserView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onPress = this.onPress.bind(this);
    this.onPress2 = this.onPress2.bind(this);
    this.postLike = this.postLike.bind(this);
    this.backToAuth = this.backToAuth.bind(this);
  }

  componentDidMount() {
    this.props.getUsers();
    this.props.getInfo();
    this.props.getMatches();
  }

  onPress() {
    this.props.navigator.push({ident: 'EditProfile', sceneConfig: Navigator.SceneConfigs.FloatFromLeft, gestures: Navigator.SceneConfigs.FloatFromLeft.gestures});
  }

  onPress2() {
    this.props.navigator.push({ident: 'MatchList', sceneConfig: Navigator.SceneConfigs.FloatFromRight,   gestures: Navigator.SceneConfigs.FloatFromRight.gestures});
  }

  postLike() {
    const matchId ={
      matchId: this.props.users[this.props.users.length - 1].id
    }

    fetch('http://localhost:8000/api/matches', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        cookie: `token=${this.props.token}`
      },
      body: JSON.stringify(matchId)
    })
    .then(response => response.json())
    .then((res) => {
      if (res === true) {
        this.props.navigator.push({
          ident: 'MatchNotification',
          sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
          firstName: this.props.users[this.props.users.length - 1].firstName,
          imgUrl: this.props.users[this.props.users.length - 1].imgUrl
        });
      }
      this.componentDidMount();
      this.props.userUpdate();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  backToAuth() {
    this.props.navigator.replaceAtIndex({ident: 'Auth'}, 0);
    this.props.navigator.popToTop(0);
  }

  render() {
    if (this.props.user && !this.props.user.bio) {
      return <ScrollView style={styles.container}>
        <TouchableOpacity style={styles.getStart} onPress={this.onPress}>
          <Text style={styles.getStartButton}>Get started</Text>
        </TouchableOpacity>
      </ScrollView>
    }
    else if (this.props.users.length < 1) {
      return <TouchableOpacity
        style={styles.button}
        onPress={this.backToAuth}
        >
          <Text style={styles.buttonText}>
            No users left, back to login?
        </Text>
        </TouchableOpacity>
    }
    else return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>

          <ScrollView style={styles.userContainer}>
            <View style={{flex: 1, alignItems: 'center', height: 800}}>
            <Image
              style={styles.image}
              source={{uri: this.props.users[this.props.users.length - 1].imgUrl}}
            />
            <Text style={{fontFamily: 'Avenir', color: 'white', fontSize: 12}}>Scroll to read more about</Text>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text style={styles.header} >{this.props.users[this.props.users.length - 1].firstName}</Text>
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text style={styles.header} >Looking For</Text>
              <Text style={styles.infoText}> {this.props.users[this.props.users.length - 1].projectType} </Text>
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text style={styles.header} >Instruments</Text>
              <Text style={styles.infoText}> {this.props.users[this.props.users.length - 1].instruments} </Text>
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text style={styles.header} >About Me</Text>
              <Text style={styles.infoText}> {this.props.users[this.props.users.length - 1].bio} </Text>
            </View>
          </View>
          </ScrollView>

          <View
            style={styles.buttonCont}
            >
              <TouchableOpacity style={styles.thumbsdown} onPress={this.props.userUpdate}>
                <Icon name="thumbsdown" size={36} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.thumbsup} onPress={this.postLike}>
                <Icon name="thumbsup" size={36} color="white" />
              </TouchableOpacity>
            </View>



          </ScrollView>

          <View style={styles.navbar}>
            <TouchableOpacity style={styles.profileButton} onPress={this.onPress}>
              <Icon name="person" size={36} color="white" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.profileButton} onPress={this.onPress2}>
              <Icon name="comment" size={36} color="white" />
            </TouchableOpacity>

          </View>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: .9,
      backgroundColor: 'white'
    },
    userContainer: {
      flex: 1,
      backgroundColor: '#70587C',
      borderWidth: 10,
      borderColor: '#70587C',
      height: 420,
      margin: 15,
      borderRadius: 40,
    },
    header: {
      fontSize: 25,
      color: 'white',
      fontFamily: 'Avenir',
      marginTop: 5
    },
    infoText: {
      color: 'white',
      fontSize: 15,
      marginLeft: 15,
      marginRight: 15,
    },
    image: {
      width: 335,
      borderRadius: 40,
      alignSelf: 'center',
      height: 320,
    },
    buttonCont: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 20,
      marginLeft: 50,
      marginRight: 40,
      height: 80
    },
    navbar: {
      flex: .1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#70587B'
    },
    profileButton: {
      alignSelf: 'flex-start',
      marginLeft: 30,
      marginTop: 10,
      marginRight: 200,
    },
    chatButton: {
      alignSelf: 'flex-end',
      marginLeft: 50,
      marginRight: 30,
      marginTop: 10,
    },
    thumbsup: {
      backgroundColor: '#70587C',
      alignSelf: 'flex-end',
      borderRadius: 15,
      padding: 20,
      marginLeft: 120
    },
    thumbsdown: {
      backgroundColor: '#70587C',
      alignSelf: 'flex-start',
      borderRadius: 15,
      padding: 20,
    },
    getStart: {
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 250,
      borderWidth: 15,
      borderColor: '#70587B',
      borderRadius: 50
    },
    getStartButton: {
      fontSize: 50,
      fontFamily: 'Avenir',
      backgroundColor: '#70587B',
      color: 'black'
    },
    button: {
      marginTop: 250,
      height: 80,
      width: 300,
      borderWidth: 3,
      borderRadius: 100,
      marginBottom: 10,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: '#70587B',
      backgroundColor: '#70587C'
    },
    buttonText: {
      color: 'white',
      fontFamily: 'Avenir',
      fontSize: 20,
      backgroundColor: '#70587C'
    },

  });

  module.exports = UserView;
