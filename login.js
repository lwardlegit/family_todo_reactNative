
import React, {Component} from 'react';
import {StyleSheet,ScrollView,View,Text,TextInput,Button,secureTextEntry,ActivityIndicator} from 'react-native';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import * as firebase from 'firebase';

 export default class Login extends Component {
     state={
         email: '',
         password: '',
         authenticating: false
     };
  

    login = () =>{
        
        this.setState({authenticating:true})
        try {
            firebase
               .auth()
               .signInWithEmailAndPassword(this.state.email, this.state.password)
               .then(res => {
                   console.log(res.user.email)
                   this.setState({authenticating:false});
                   
            })
            .then(()=>{
                this.props.confirmlogin()
            });
      } catch (error) {
            console.log(error.toString(error));
          }
    }

    signUp = () =>{
        try {
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(user => { 
                       console.log(user);
                 });
      } catch (error) {
            console.log(error.toString(error));
          }
    }
    

    contentBoolRender = () =>{
        if(this.state.authenticating===true){
            return(
            <View>
                <ActivityIndicator style={styles.activity} size="large"/>
                
            </View>
            ) 
        }

        return(
            <View>
                <TextInput
                    placeholder="Enter your Email..."
                    label = "Email"
                    onChangeText = {email => this.setState({email})}
                    value = {this.state.email}
                />

                <TextInput
                    placeholder="Enter your Password..."
                    label = "Password"
                    onChangeText = {password => this.setState({password})}
                    value = {this.state.password}
                    secureTextEntry
                />
                    <Button style = {styles.button} title="login" onPress={()=>this.login()}></Button>
                    <Button style = {styles.button} title="signup" onPress={()=>this.signUp()}></Button>
            </View>
        )
    }


  render() {
    
    return(
        <View>
        {this.contentBoolRender()}
        </View>
    );
  }
}

const styles = StyleSheet.create({
  login:{
    padding: 20,
    backgroundColor: 'white'
  },
  button:{
      marginTop:5
  },
  activity:{
      justifyContent: 'center',
      paddingTop: 30
  }
});

