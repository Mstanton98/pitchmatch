import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  Navigator
} from 'react-native';

import EditProfile from './EditProfile';


export default class UserView extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    if (!this.props.user.bio) {
      this.props.navigator.replaceAtIndex({ident: 'EditProfile', sceneConfig: Navigator.SceneConfigs.FloatFromBottom}, 0);
      this.props.navigator.popToTop(0);
    }
  }

  onPress() {
    this.props.navigator.push({ident: 'EditProfile', sceneConfig: Navigator.SceneConfigs.FloatFromLeft});
  }

  render() {
    return (
      <ScrollView>
        <Button
          title={'edit profile'}
          onPress={this.onPress.bind(this)}
        />
        <View style={styles.navbar}>

        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  navbar: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    height: 50,
    width: 400,
    backgroundColor: '#70587B'
  }
});

module.exports = UserView;
