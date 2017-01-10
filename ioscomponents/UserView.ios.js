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
  }

  componentDidMount() {
    this.props.getUsers();
    this.props.getInfo();
  }

  onPress() {
    this.props.navigator.push({ident: 'EditProfile', sceneConfig: Navigator.SceneConfigs.FloatFromLeft});
  }

  onPress2() {
    this.props.navigator.push({ident: 'MatchList', sceneConfig: Navigator.SceneConfigs.FloatFromRight});
  }

  render() {
    if (this.props.user && !this.props.user.bio) {
      return <ScrollView style={styles.container}>
        <TouchableOpacity style={styles.getStart} onPress={this.onPress}>
          <Text style={styles.getStartButton}>Get started</Text>
        </TouchableOpacity>
      </ScrollView>
    }
    else if (!this.props.users) {
      return null;
    }
    else return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>

          <ScrollView style={styles.userContainer}>
            <View style={{flex: 1, alignItems: 'center'}}>

            <Image
              // source={require('./img/logo.png')}
              style={styles.image}
              source={{uri: this.props.users[this.props.users.length - 1].imgUrl}}
            />
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text style={styles.header} >Looking For</Text>
              <Text style={styles.infoText}> {this.props.users[this.props.users.length - 1].projectType} </Text>
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text style={styles.header} >Instruments</Text>
              <Text style={styles.infoText}> {this.props.users[this.props.users.length - 1].instruments} </Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.header} >About Me</Text>
              <Text style={styles.infoText}> {this.props.users[this.props.users.length - 1].bio} </Text>
            </View>
          </View>
          </ScrollView>

          <View
            style={styles.buttonCont}
            >
              <TouchableOpacity style={styles.thumbsdown} onPress={this.onPress}>
                <Icon name="thumbsdown" size={36} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.thumbsup} onPress={this.onPress}>
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
      borderColor: '#70587B',
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
      marginLeft: 110
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
    }

  });

  module.exports = UserView;
