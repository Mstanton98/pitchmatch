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

    this.state = {

    }
  }

  componentDidMount() {
    // if (!this.props.user.bio) {
    //   this.props.navigator.replaceAtIndex({ident: 'EditProfile', sceneConfig: Navigator.SceneConfigs.FloatFromBottom}, 0);
    //   this.props.navigator.popToTop(0);
    // }
  }

  userSort() {
    let sorted = [];

    for (let i = 0; i < this.props.matches.length; i++) {
      if (this.props.matches[i].id !== this.props.users[this.props.users.length - 1].id) {
        this.props.users.pop();
      }
    }
    return sorted;
  }

  onPress() {
    this.props.navigator.push({ident: 'EditProfile', sceneConfig: Navigator.SceneConfigs.FloatFromLeft});
  }

  onPress2() {
    this.props.navigator.push({ident: 'MatchList', sceneConfig: Navigator.SceneConfigs.FloatFromRight});
  }

  render() {
    this.userSort();
    console.log(this.props);
    return (
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
          marginRight: 40
        }}
      >
        <TouchableOpacity style={styles.thumbsup} onPress={this.onPress.bind(this)}>
          <Icon name="thumbsdown" size={36} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.thumbsdown} onPress={this.onPress.bind(this)}>
          <Icon name="thumbsup" size={36} color="black" />
        </TouchableOpacity>
      </View>



      </ScrollView>

      <View style={styles.navbar}>
        <TouchableOpacity style={styles.profileButton} onPress={this.onPress.bind(this)}>
          <Icon name="person" size={36} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.profileButton} onPress={this.onPress2.bind(this)}>
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
    // height: 600

  },
  userContainer: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#70587B',
    height: 400,
    margin: 30,
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

  }

});

module.exports = UserView;
