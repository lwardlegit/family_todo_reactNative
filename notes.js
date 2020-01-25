import React, { Component } from "react";
import { View, StyleSheet, Text, TouchableOpacity,Button,Alert} from "react-native";
import * as firebase from 'firebase';

export default class Notes extends Component {
  
state={
  Deleted:false,
  selectedId: ''
}
 
  renderCondition =()=>{
    if(this.state.Deleted === false){
      return(
        <View>
        {this.props.notes && this.props.notes.map(note => (
          <View
            style={styles.note}
            key={note.author}
          >
            <Text style={styles.noteContent}>{note.author}</Text>
            <Text style={styles.noteContent}>{note.text}</Text>

              <Text style={styles.noteContent}>{note.time}</Text>
              <Button title= 'X' onPress={() => this.setState({Deleted:true, selectedId: note.id}) }></Button>
          </View>

        ))}
      </View>
      )
        }

      return(
        Alert.alert('delete this note?', 'will you delete this note?',
        [
          {text: 'are you sure you want to delete this note?', style: {textAlign: 'center'}},
          {text: 'Yes', onPress: ()=>{this.props.deleteNotes(this.state.selectedId)}, style: {textAlign: 'center'}},
          {text: 'No', onPress: ()=>{this.setState({Deleted:false})}, style: {textAlign: 'center'}}
          
        ])
      )
  }

  render() {
    return (
      <View>
      {this.renderCondition()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
  note:{
    backgroundColor: 'skyblue', 
    margin: 10
  
  },
  noteContent: {
    textAlign: "center"
  },
  deleteHeader:{
    textAlign: 'center'
  },
  deletebtns:{
    margin: 5
  }
});
