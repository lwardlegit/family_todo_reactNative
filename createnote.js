import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  Text,
  Button,
  InputAccessoryView
} from "react-native";
import * as firebase from 'firebase';


export default class CreateNote extends Component {
  state = {
    modalVisible: false,
    id: Math.floor(Math.random() * (100 - 1) + 1).toString(),
    text: "",
    author: "",
    time: ""
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  onTextChange = (name) => (value) => {
    this.setState({ [name]: value });
  };


  sendNoteToDatabase = () =>{
    const uId = firebase.auth().currentUser.uid
    const note = {
      id: this.state.id,
      text: this.state.text,
      author: this.state.author,
      time: this.state.time
    }

    
    //pushing data to firebase using the user's id so our data only matches the specific user
    firebase.database().ref('Users/'+uId+'/Notes/'+note.id).set(note).then((data)=>{
      //success callback
      console.log('data ' , data)
  })
    .then(()=>{this.setState({id:Math.floor(Math.random() * (100 - 1) + 1).toString()})
    
  }).catch((error)=>{
      //error callback
      console.log('error ' , error)
  })
  .then(()=>{
    this.setState({modalVisible:!this.state.modalVisible})
  })
  .then(()=>this.props.updateNotes())
    
  }

  createNoteView=()=>{
    if(this.state.modalVisible === true){
      return (
        <View style={{ marginTop: 10 }}>
              
              <Button title="cancel" onPress={()=>this.setState({modalVisible:false})}></Button>
                
                <TextInput
                  placeholder="title"
                  type="text"
                  
                  onChangeText={this.onTextChange('text')}
                />

                
                <TextInput
                  placeholder="who"
                  type="text"
                  
                  onChangeText={this.onTextChange('author')}
                />

                
                <TextInput
                  placeholder="when"
                  type="text"
                  
                  onChangeText={this.onTextChange('time')}
                />

                <Button title="submit" onPress={this.sendNoteToDatabase}></Button>
        </View>
      )
    }
    
    return (
      <View style={{ marginTop: 22, width: 150 }}>
          <Button style={styles.createBtn} onPress={()=>{this.setModalVisible(!this.state.modalVisible)}} title="create"></Button>
      </View>
    )

  }


  render() {
    return(
      <View>
        {this.createNoteView()}
    </View>
    )
      
  }
}

const styles = StyleSheet.create({
  create: {
    
    marginBottom: 10,
    backgroundColor: "#87edeb",
    textAlign: "center",
    
  },

  Modal: {
    backgroundColor: "gray",
    zIndex: 2,
    marginTop: 10
  },

  ModalItems: {
    textAlign: "center"
  },
  createBtn:{
    display: 'flex',
    justifyContent: 'center'
  }
});
