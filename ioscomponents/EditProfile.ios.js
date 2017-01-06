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
  TouchableOpacity
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
      projectType: 'Any'
    }
  }

  componentDidMount() {
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
    })
    .catch((err) => {
      console.log(err);
    });
  }

  delToken() {
    this.props.delToken();
    this.props.navigator.replaceAtIndex({ident: 'Auth'}, 0);
    this.props.navigator.popToTop(0);
  }

  render() {
    return (
      <ScrollView>
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
                this.delToken();
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
          onValueChange={this.onValueChange.bind(this)}
        >
          <Item label="Band" value="Band" />
          <Item label="Live Session" value="Live Session" />
          <Item label="Studio Session" value="Studio Session" />
          <Item label="Any" value="Any" />
        </Picker>
        <View
          style={styles.button}
          >
          <Button
            color={"#3B2338"}
            title={'Save your changes'}
            onPress={this.updateDetails.bind(this)}
          />
      </View>
      <View
        style={styles.button}
        >
        <Button
          color={"#3B2338"}
          title={'Log Out'}
          onPress={this.delToken.bind(this)}
        />
      </View>
      </ScrollView>
      </ScrollView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 100
  },
  userImg: {
    borderRadius: 100,
    height: 200,
    width: 200
  },
  name: {
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
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 10
  },
  x: {
    flex: 1,
    alignSelf: 'flex-start'
  }

});

module.exports = EditProfile;
