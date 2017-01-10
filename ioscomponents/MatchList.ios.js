import React, { Component } from 'react';
import Match from './Match';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ListView,
  TouchableOpacity

} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';


export default class MatchList extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(this.props.matches),
    };

    this.backButton = this.backButton.bind(this);
  }

  backButton() {
    this.props.navigator.pop();
  }

  render() {
    if (this.props.matches.length < 1) {

      return <ScrollView contentContainerStyle={{flex: 1, alignItems: 'center', backgroundColor: 'white'}}>
        <Text style={styles.header2}>You don't have any matches yet.</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={this.backButton}>
            <Text style={styles.header3}>
              Back to Matching
            </Text>
          </TouchableOpacity>
        </ScrollView>

      } else return (
        <ScrollView contentContainerStyle={{flex: 1, backgroundColor: 'white'}}>
          <TouchableOpacity style={styles.x}
            onPress={this.backButton}
          >
              <Icon name="x" size={36} color="#3B2338" />
              <Text style={styles.header}>Your Matches</Text>
            </TouchableOpacity>
              <ListView
                style={{flex: .8}}
              enableEmptySections={true}
              dataSource={this.state.dataSource}
              renderRow={(rowData) => <Match token={this.props.token} navigator={this.props.navigator} match={rowData}/>}
            />
          </ScrollView>
        );
      }
    }

    const styles = StyleSheet.create({
      header: {
        fontSize: 40,
        fontFamily: 'Avenir',
        color: '#70587B',
        borderBottomWidth: 1,
        borderColor: '#70587B',
        marginLeft: 30
      },
      header2: {
        alignSelf: 'center',
        fontSize: 20,
        fontFamily: 'Avenir',
        color: '#70587B',
        borderBottomWidth: 1,
        borderColor: '#70587B',
      },
      header3: {
        alignSelf: 'center',
        fontSize: 20,
        fontFamily: 'Avenir',
        color: 'white',
        borderBottomWidth: 1,
        borderColor: '#70587B',
      },
      button: {
        height: 40,
        width: 200,
        borderWidth: 3,
        borderRadius: 25,
        marginBottom: 10,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#70587B',
        backgroundColor: '#70587C'
      },
      x: {
        flex: .2,
        flexDirection: 'row',
        alignSelf: 'flex-start',
      }
    });

    module.exports = MatchList;
