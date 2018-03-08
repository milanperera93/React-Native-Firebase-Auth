import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import * as firebase from 'firebase';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base'

//Initialize firebase
//add your configuration
var config = {
  apiKey: "AIzaSyCcgVeET9iRBr00KDnJZBn421M_SufCWTA",
  authDomain: "react-firebase-77977.firebaseapp.com",
  databaseURL: "https://react-firebase-77977.firebaseio.com",
  projectId: "react-firebase-77977",
  storageBucket: "react-firebase-77977. appspot.com",
  messagingSenderId: "275411035059"
};
firebase.initializeApp(config);

export default class App extends React.Component {

  constructor(props){
    super(props)
    this.state = ({
      email :'',
      password : ''
    })

  }

  signUpUser =(email,password) =>{
    try{
      if(this.state.password.length<6){
        alert('Please enter atlease 6 chracters');
        return; 
      }
      firebase.auth().createUserWithEmailAndPassword(email,password)
    }
    catch(error){
      console.log(error.toString())
    }
  }

  loginUser = (email,password) =>{
    try{
      firebase.auth().signInWithEmailAndPassword(email,password).then(function(user){
        console.log(user)
      }) 
    }
    catch(error){
      console.log(error.toString());
    }
  }

  
  async loginWithFacebook(){
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('488723911544363',{permissions : ['public_profile']})

    if(type=='success'){
       const credential = firebase.auth.FacebookAuthProvider.credential(token)
       firebase.auth().signInWithCredential(credential).catch((error)=>{
         console.log(error)
       })
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user)=>{
      if( user != null){
        console.log(user)
      }
    })
  }

  render() {
    return (
      <Container style ={styles.container} >
        <Form>
          <Item floatingLabel >
            <Label>Email</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText ={(email)=>this.setState({email})}
            />
          </Item>

          <Item floatingLabel >
            <Label>Password</Label>
            <Input
              secureTextEntry ={true}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText = {(password)=>this.setState({password})}
            />
          </Item>
          <Button
           full
           rounded
           success
           style ={{marginTop :20}}
           onPress = {()=>this.loginUser(this.state.email, this.state.password)}
          >
          <Text style={{color:'#fff'}} >LOGIN</Text>
          </Button>
          <Button
            full
            rounded
            primary
            style={{ marginTop: 10 }}
            onPress ={()=> this.signUpUser(this.state.email, this.state.password )}
          >
            <Text style={{ color: '#fff' }} >SIGNUP</Text>
          </Button>
          <Button
            full
            rounded
            primary
            style={{ marginTop: 10 }}
            onPress ={()=> this.loginWithFacebook()}
          >
            <Text style={{ color: '#fff' }} >LOGIN WITH FACEBOOK</Text>
          </Button>
        </Form>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex :1,
    justifyContent : 'center',
    padding : 20
  }
});