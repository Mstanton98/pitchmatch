import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Picker,
  ScrollView,
  Button,
  TouchableOpacity,
  Navigator
} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';

const Item = Picker.Item;

export default class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      guideText: '',
      bio: '',
      instruments: '',
      projectType: 'Any',
      ready: 0
    };
    this.onValueChange = this.onValueChange.bind(this);
    this.updateDetails = this.updateDetails.bind(this);
    this.backToAuth = this.backToAuth.bind(this);
    this.delToken = this.props.delToken.bind(this);
  }

  componentDidMount() {
    if (!this.props.user) {
      return this.render();
    }

    if (!this.props.user.bio) {
      this.setState({ guideText: "You're almost ready! We just need a few more things from you." });
    }
    else {
      this.setState({ guideText: 'Update your profile', bio: this.props.user.bio, instruments: this.props.user.instruments, projectType: this.props.user.projectType });
    }
  }

  onValueChange(value) {
    this.setState({ projectType: value });
  }

  updateDetails() {
    let body = {
      userId: this.props.user.id,
      bio: this.state.bio,
      instruments: this.state.instruments,
      projectType: this.state.projectType
    }

    if (body.bio === '' || body.instruments === '') {
      return alert("Whoops! Bio and Instruments can't be blank.")
    }

    fetch('http://localhost:8000/api/details', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        cookie: `token=${this.props.token}`
      },
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then((res) => {
      alert('Profile updated!');
      this.props.navigator.push({ident: 'UserView', sceneConfig: Navigator.SceneConfigs.FloatFromBottom});
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
    return (
      <ScrollView style={{backgroundColor: 'white'}}>
        <ScrollView contentContainerStyle={styles.container}
          alwaysBounceVertical={true}
          pagingEnabled={true}
          automaticallyAdjustContentInsets={false}
          >
            <TouchableOpacity style={styles.x}
              onPress={() => {
                if (this.props.user.bio) {
                  this.props.navigator.pop();
                }
                else {
                  this.backToAuth();
                }
              }}
              >
                <Icon name="x" size={36} color="#3B2338" />
              </TouchableOpacity>
              <Image
                style={styles.userImg}
                source={{uri: this.props.user.imgUrl}}
              />
              <Text style={styles.name}>{this.props.user.firstName} {this.props.user.lastName}</Text>
              <Text style={styles.guideText}>{this.state.guideText}</Text>

              <Text style={styles.label}>Bio</Text>
              <TextInput
                style={styles.bio}
                editable={true}
                multiline={true}
                placeholder={'Tell the world about yourself! What kind of music to you like, what kind of music do you play, etc.'}
                autoCapitalize="none"
                value={this.state.bio}
                onChangeText={(bio) => this.setState({bio})}
                placeholderTextColor='#7C7382'
                maxLength={255}
              />
              <Text style={styles.label}>Instruments</Text>
              <TextInput
                style={styles.instruments}
                editable={true}
                multiline={true}
                autoCapitalize="none"
                placeholder={'What instruments do you play?'}
                placeholderTextColor='#7C7382'
                value={this.state.instruments}
                onChangeText={(instruments) => this.setState({instruments})}
                maxLength={100}
              />
              <Text style={styles.label}>Type of Project</Text>
              <Picker
                style={styles.projectType}
                selectedValue={this.state.projectType}
                itemStyle={styles.item}
                onValueChange={this.onValueChange}
                >
                  <Item label="Band" value="Band" />
                  <Item label="Live Session" value="Live Session" />
                  <Item label="Studio Session" value="Studio Session" />
                  <Item label="Any" value="Any" />
                </Picker>
                <TouchableOpacity
                  style={styles.button}
                  onPress={this.updateDetails}
                  >
                    <Text style={styles.buttonText}>
                      Save your changes
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={this.backToAuth}
                    >
                      <Text style={styles.buttonText}>
                        Back to login
                    </Text>
                    </TouchableOpacity>
                  </ScrollView>
                </ScrollView>

              );
            }
          }

          const styles = StyleSheet.create({
            container: {
              flex: 1,
              alignItems: 'center',
              marginBottom: 100,
              backgroundColor: 'white'
            },
            userImg: {
              borderRadius: 100,
              height: 200,
              width: 200
            },
            name: {
              fontFamily: 'Avenir',
              fontSize: 36,
              justifyContent: 'center'
            },
            guideText: {
              fontSize: 18,
              color: '#70587C',
              margin: 20
            },
            bio: {
              height: 130,
              width: 340,
              borderRadius: 10,
              borderWidth: 2,
              padding: 3,
              fontSize: 16,
              borderColor: '#70587C',
              alignSelf: 'center'
            },
            instruments: {
              borderRadius: 10,
              height: 70,
              width: 340,
              fontSize: 16,
              borderWidth: 2,
              padding: 3,
              borderColor: '#70587C',
              alignSelf: 'center'
            },
            projectType: {
              width: 400
            },
            label: {
              fontSize: 18,
              color: '#70587C',
              marginTop: 20
            },
            item: {
              color: '#70587C'
            },
            button: {
              height: 40,
              width: 180,
              borderWidth: 3,
              borderRadius: 90,
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
            x: {
              flex: 1,
              alignSelf: 'flex-start'
            }

          });

          module.exports = EditProfile;
