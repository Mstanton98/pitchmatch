import React, { Component } from 'react';
import ChatView from './ChatView'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

export default class Match extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    // fetch('http://localhost:8000/api/messagesList', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     cookie: `token=${this.props.token}`
    //   },
    //   body: JSON.stringify({matchId: this.props.match.id})
    // })
    // .then(response => response.json())
    // .then((res) => {
    //   console.log(res);
    //     this.props.navigator.push({ident: 'ChatView', user: this.props.match})
    //
    //     this.setState({messages: res});
    //   }
    // )
    // .catch((err) => {
    //   console.log(err);
    // });
    // this.props.navigator.push({ident: 'ChatView', user: this.props.match})

  }

  render() {
    console.log(this.props);
    return (
      <TouchableOpacity style={{flex: 1}} >
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={{uri: this.props.match.imgUrl}}
          />
          <Text style={styles.name}>{this.props.match.firstName}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    width: 400,
    height: 80,
    borderBottomWidth: 1,
    borderColor: '#70587B'
  },
  name: {
    marginTop: 15,
    fontSize: 40,
    color: '#70587B'
  },
  image: {
    alignSelf: 'flex-start',
    height: 80,
    width: 80,
    borderRadius: 20
  }
});

module.exports = Match;
