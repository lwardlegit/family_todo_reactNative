import React, { Component } from 'react'
import {View,TextInput,Button} from 'react-native';
export default class AddFriend extends Component {
    state={
        friend: ''
    }

    onTextChange = (name) => (value) => {
        this.setState({ [name]: value });
      };

    render() {
        let friend = this.state.friend
        return (
            <View>
                <TextInput
                    placeholder="add friend"
                    type="text"
                    onChangeText={this.onTextChange('friend')}
                />
                <Button title="+" onPress = {()=>{this.props.addToFamily(friend)}}></Button>
            </View>
        )
    }
}
