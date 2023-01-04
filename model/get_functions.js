
import { initializeApp } from 'firebase/app';
import * as fb from 'firebase/firestore'
import 'firebase/auth';
import 'firebase/firestore'


//connect to firebase
const firebaseConfig = {
    apiKey: "AIzaSyAMCzLhOCo9FEZTEB8sSEOtmFGjkinb74o",
    authDomain: "1:1056818816676:android:0496c991d8b439fae82831.firebaseapp.com",
    databaseURL: "https://JoinMe.firebaseio.com",
    projectId: "joinme-423bf"
    // storageBucket: "<BUCKET>.appspot.com",
    // messagingSenderId: "<SENDER_ID>",
  };

const fireBaseRef = initializeApp(firebaseConfig);
const db = fb.getFirestore(fireBaseRef);

// Get a list of users to the block page 
export async function getUsers() {
    const userSnapshot = await fb.getDocs(fb.collection(db, 'usersById'))
    const userListFromDB = userSnapshot.docs || []
    const userList = userListFromDB.map(doc=> {
      const {name, mail,uid} = doc.data()
      return {name,mail,uid}
    })
    return userList;
}

//get the history of the groups that the user created
export async function getMyCreatedHistory(uid){
  const userRef = fb.doc(db, 'usersById', uid)
  const userDoc = await fb.getDoc(userRef)
  var groupsList = []
  if(userDoc.exists()){
    for(var i=0; i<userDoc.data().my_groups.length; i++){
      const groupRef = fb.doc(db, 'groups', userDoc.data().my_groups[i])
      const groupDoc = await fb.getDoc(groupRef)
      const data = groupDoc.data()
      groupsList[i] = [data.title, data.city, data.date, data.time, data.is_happened, userDoc.data().my_groups[i]]
    }
    return groupsList
  }
  else{
    console.log("error")
    return null
  }
}

//get the history of the groups that the user joined
export async function getMyJoinedHistory(uid){
  const userRef = fb.doc(db, 'usersById', uid)
  const userDoc = await fb.getDoc(userRef)
  var groupsList = []
  if(userDoc.exists()){
    for(var i=0; i<userDoc.data().groups_I_joined.length; i++){
      const groupRef = fb.doc(db, 'groups', userDoc.data().groups_I_joined[i])
      const groupDoc = await fb.getDoc(groupRef)
      const data = groupDoc.data()
      groupsList[i] = [data.title, data.city, data.date, data.time, data.is_happened, userDoc.data().groups_I_joined[i]]
    }
    return groupsList
  }
  else{
    console.log("error")
    return null
  }
}

//get the participent in this group
export async function getGroupParticipants(gid){
  const groupRef = fb.doc(db, 'groups', gid)
  const groupDoc = await fb.getDoc(groupRef)
  var usersList = []
  if(groupDoc.exists()){
    for(var i=0; i<groupDoc.data().participants.length; i++){
      const userRef = fb.doc(db, 'usersById', groupDoc.data().participants[i])
      const userDoc = await fb.getDoc(userRef)
      const data = userDoc.data()
      usersList[i] = [data.name, data.mail, data.phone, groupDoc.data().participants[i]]
    }
    return usersList
  }
  else{
    console.log("error")
    return null
  }
}