import React, { Component } from 'react';
import ChatMessage from './ChatMessage';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ListView,
  TextInput
} from 'react-native';

export default class ChatView extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      message: '',
      dataSource: ds.cloneWithRows(this.props.messages),
    }
  }
  render() {
    return (
      <ScrollView contentContainerStyle={{flex: 1, backgroundColor: 'white'}}>
        <Text style={styles.header}>{this.props.firstName}</Text>
        <ListView
          style={{flex: .7}}
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <ChatMessage user={this.props.user} message={rowData}/>}
        />

        <View>

          <TextInput
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    alignSelf: 'center',
    color: '#70587B',
    fontFamily: 'Avenir'
  }
});

module.exports = ChatView;
