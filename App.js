
import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Alert
} from 'react-native';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Notes from "./notes.js";
import CreateNote from "./createnote.js";
import AddFriend from "./addFriend.js";
import Login from "./login.js";

import * as firebase from 'firebase';

 // include your firebase config object here 
 
  firebase.initializeApp(firebaseConfig);
 

 class App extends Component {
  state = {
    loggedin: false,
    notes: [
      {
        id: 1,
        text: "mow the lawn",
        author: "dean",
        time: "10am"
      },
      {
        id: 2,
        text: "feed the dog",
        author: "sam",
        time: "2pm"
      }
    ]
  }
  
  initState = async() => {  //sets initial state = all database items for a user
    const uId = firebase.auth().currentUser.uid
    let noteState = await firebase.database().ref('Users/'+uId+'/Notes').once('value')

    let data=[];
       for( var note in noteState.val() ){
           var obj = noteState.val()[note];
           console.log("new obj",obj)
           data.push(obj)
         }
   this.setState({ notes: data });
 }

componentDidMount () {
 this.initState()
} 



    confirmLogin=()=>{
      this.setState({loggedin:true})
    }


  updateNotes = async () => {
    const uId = firebase.auth().currentUser.uid
    console.log("grabbing new notes");
    const snapshot = await firebase.database().ref('Users/'+uId+'/Notes').once('value')
    
    let data=[];
    for( var note in snapshot.val() ){
      var obj = snapshot.val()[note];
      console.log("new obj",obj)
      data.push(obj)
    }
    this.setState({ notes: data });
  
  };

  deleteNotes = noteId => {
    const uId = firebase.auth().currentUser.uid
    console.log("logging note id", noteId);

    firebase.database().ref('Users/'+uId+'/Notes/'+noteId).remove()
    .then(()=>{
      console.log("successfully removed reference")

    })
  };

  addToFamily = (friend) =>{
    console.log('added user to family')
    Alert.alert("Success",`added ${friend} to your family`)
  }


  conditionalRender=()=>{
    if(this.state.loggedin===false){
      return (
        <View style={styles.app}>
          <Login confirmlogin = {this.confirmLogin} />
        </View>
      )
    }

    return(
      <View style= {styles.app}>
        <AddFriend addToFamily = {this.addToFamily}/>
          <CreateNote
            notes={this.state.notes}
            handleName={this.handleName}
            handleEvent={this.handleEvent}
            handleTime={this.handleTime}
            updateNotes={this.updateNotes}
          />
          <Notes style={styles.notes} notes={this.state.notes} deleteNotes = {this.deleteNotes} />
        </View>
    );
  }

  render() {
   return(
    <View>
    {this.conditionalRender()}
    </View>
   );
    
  }
}

const styles = StyleSheet.create({
  app: {
    marginHorizontal: "auto",
    maxWidth: 500,
    padding: 20
  },
  logo: {
    height: 80
  },
  header: {
    padding: 20
  },
  title: {
    fontWeight: "bold",
    fontSize: 15,
    marginVertical: 10,
    textAlign: "center"
  },
  notes:{
    marginHorizontal: '50%'
  },
  text: {
    lineHeight: 15,
    fontSize: 11,
    marginVertical: 11,
    textAlign: "center"
  },
  link: {
    color: "#1B95E0"
  },
  code: {
    fontFamily: "monospace, monospace"
  }
});

export default App;
