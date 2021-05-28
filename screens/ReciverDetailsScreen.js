import React ,{Component}from 'react'
import {StyleSheet,FlatList,View,Text,TouchableOpacity,TextInput,Alert,Modal, ScrollView,KeyboardAvoidingView} from 'react-native'
import db from '../config'
import firebase from 'firebase'
import MyHeader from '../component/MyHeader'

export default class reciverDetailScreen extends Component{

constructor(props){
super(props);
this.state = {
    userId: firebase.auth().currentUser.email,
    recieverId : this.props.navigation.getParam('details')["user_id"],
    requestId       : this.props.navigation.getParam('details')["request_id"],
    bookName        : this.props.navigation.getParam('details')["book_name"],
    reason_for_requesting     : this.props.navigation.getParam('details')["reason_to_request"],
    recieverName    : '',
    recieverContact : '',
    recieverAddress : '',
    recieverRequestDocId : ''

}
}
getRecieverDetails(){
    db.collection('users').where('email_id','==',this.state.recieverId).get()
    .then(snapshot=>{
      snapshot.forEach(doc=>{
          this.setState({
            recieverName    : doc.data().first_name,
            recieverContact : doc.data().contact,
            recieverAddress : doc.data().address,

          })
        })
    });

    db.collection('requested_books').where('request_id','==',this.state.requestId).get()
    .then(snapshot=>{
      snapshot.forEach(doc => {
        this.setState({recieverRequestDocId:doc.id})
     })
  })}

updateBookStatus=()=>{
    db.collection('all_donations').add({
        book_name           : this.state.bookName,
        request_id          : this.state.requestId,
        requested_by        : this.state.recieverName,
        donor_id            : this.state.userId,
        request_status      :  "Donor Interested"

    })

}
addNotification =()=>{
  var Message  =this.state.userName+"has shown interst in donating the book"
  db.collection("all_notification").add({
    "targeted_user_id":this.state.recieverId,
    "donar_id":this.state.user_id,
    "request_id":this.state.requestId,
    "book_name":this.state.bookName,
    "date":firebase.firestore.FieldValue.serverTimestamp(),
    "notification_status":"unread",
    "message":message
  })
}

componentDidMount(){
    this.getRecieverDetails()
  }
  
render(){
    return(
        <View style= {StyleSheet.container}>

<View style = {{flex:01}}>
<Header
            leftComponent ={<Icon name='arrow-left' type='feather' color='#696969'  onPress={() => this.props.navigation.goBack()}/>}
            centerComponent={{ text:"Donate Books", style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } }}
            backgroundColor = "#eaf8fe"
          />
  </View>

  <View style={{flex:0.3}}>
  <Card
              title={"Book Information"}
              titleStyle= {{fontSize : RFValue(20)}}
            >
            <Card >
              <Text style={{fontWeight:'bold'}}>Name : {this.state.bookName}</Text>
            </Card>
            <Card>
              <Text style={{fontWeight:'bold'}}>Reason : {this.state.reason_for_requesting}</Text>
            </Card>
 </Card>
 </View>

 <View style={{flex:0.3}}>
 <Card
            title={"Reciever Information"}
            titleStyle= {{fontSize : RFValue(20)}}
            >
            <Card>
              <Text style={{fontWeight:'bold'}}>Name: {this.state.recieverName}</Text>
            </Card>
            <Card>
              <Text style={{fontWeight:'bold'}}>Contact: {this.state.recieverContact}</Text>
            </Card>
            <Card>
              <Text style={{fontWeight:'bold'}}>Address: {this.state.recieverAddress}</Text>
            </Card>
</Card>
</View>

<View style={styles.buttonContainer}>
{
            this.state.recieverId !== this.state.userId
            ?(
              <TouchableOpacity
                  style={styles.button}
                  onPress={()=>{
                    this.updateBookStatus()
                    this.addNotification()
                    this.props.navigation.navigate('MyDonations')
                  }}>
                <Text>I want to Donate</Text>
              </TouchableOpacity>
            )
            : null
          }
        </View>




         </View>
    )
}







}

const styles = StyleSheet.create({
    container: {
      flex:1,
    },
    buttonContainer : {
      flex:0.3,
      justifyContent:'center',
      alignItems:'center'
    },
    button:{
      width:RFValue(200),
      height:RFValue(50),
      justifyContent:'center',
      alignItems : 'center',
      borderRadius: RFValue(10),
      backgroundColor: 'orange',
      shadowColor: "#000",
      shadowOffset: {
         width:RFValue(0),
         height:RFValue(8)
       },
      elevation : 16
    }
  })
  








