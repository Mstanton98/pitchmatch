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
          <Text style={styles.getStartButton}>Get started </Text>
        </TouchableOpacity>
      </ScrollView>
    } else return (
      <View style={{flex: 1}}>
      <ScrollView style={styles.container}>

      <View style={styles.userContainer}>
        <Image
          source={require('./img/logo.png')}
          style={{ alignSelf: 'center', height: 200, width: 200}}
          // source={{uri: this.props.users[this.props.users.length - 1].imgUrl}}
        />
        <View>
          <Text>projectType</Text>
          {/* <Text> {this.props.users[this.props.users.length - 1].bio} </Text> */}
          <Text>Placeholder for user data</Text>
        </View>
        <View>
          <Text>Instruments</Text>
          {/* <Text> {this.props.users[this.props.users.length - 1].bio} </Text> */}
          <Text>Placeholder for user data</Text>
        </View>
        <View>
          <Text>Bio</Text>
          {/* <Text> {this.props.users[this.props.users.length - 1].bio} </Text> */}
          <Text>Placeholder for user data</Text>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
          marginBottom: 20,
          marginLeft: 40,
          marginRight: 40,
          height: 80
        }}
      >
        <TouchableOpacity style={styles.thumbsup} onPress={this.onPress}>
          <Icon name="thumbsdown" size={36} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.thumbsdown} onPress={this.onPress}>
          <Icon name="thumbsup" size={36} color="black" />
        </TouchableOpacity>
      </View>



      </ScrollView>

      <View style={styles.navbar}>
        <TouchableOpacity style={styles.profileButton} onPress={this.onPress}>
          <Icon name="person" size={36} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.profileButton} onPress={this.onPress2}>
          <Icon name="comment" size={36} color="black" />
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
    borderWidth: 2,
    borderColor: '#70587B',
    height: 400,
    margin: 20,
    borderRadius: 40,
  },
  navbar: {
    flex: .1,
    flexDirection: 'row',
    alignItems: 'center',
    // paddingBottom: 40,
    // position: 'absolute',
    // height: 40,
    // width: 400,
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
    alignSelf: 'flex-end',
    borderWidth: 3,
    borderColor: 'grey',
    borderRadius: 100,
    padding: 20,
  },
  thumbsdown: {
    alignSelf: 'flex-start',
    borderWidth: 3,
    borderColor: 'grey',
    borderRadius: 100,
    padding: 20,
    marginLeft: 100
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
