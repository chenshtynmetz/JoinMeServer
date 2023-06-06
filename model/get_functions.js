
import { initializeApp } from 'firebase/app';
import * as fb from 'firebase/firestore'
import 'firebase/auth';
import 'firebase/firestore'
import { where, or } from 'firebase/firestore';


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
      const {name, mail,uid, num_of_reports} = doc.data()
      return {name,mail,uid, num_of_reports}
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
      const gid = userDoc.data().my_groups[i]
      const {title, city, date, time, is_happened} = groupDoc.data()
      groupsList[i] = {title, city, date, time, is_happened, gid}
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
      const gid = userDoc.data().groups_I_joined[i]
      const {title, city, date, time, is_happened} = groupDoc.data()
      groupsList[i] = {title, city, date, time, is_happened, gid}
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
      const {name, mail, phone, uid} = userDoc.data()
      usersList[i] = {name, mail, phone, uid}
      // console.log(usersList[i])
    }
    return usersList
  }
  else{
    console.log("error")
    return null
  }
}

// Get a list of users that had been reported
export async function getReportedUsers() {
  const q = fb.query(fb.collection(db, 'usersById'), fb.where("num_of_reports", "!=", 0));
  const userSnapshot = await fb.getDocs(q)
  const userListFromDB = userSnapshot.docs || []
  const userList = userListFromDB.map(doc=> {
    const {name, num_of_reports} = doc.data()
    return {name, num_of_reports}
  })
  return userList;
}

//Check if the user is blocked
export async function checkBlockedUser(uid){
  const userRef = fb.doc(db, 'blockUsers', uid)
  const userDoc = await fb.getDoc(userRef)
  if(userDoc.exists()){
    return "blocked"
  }
  else{
    return "not"
  }
}

// Get user details
export async function getUser(uid) {
  console.log(uid)
  const userRef = fb.doc(db, 'usersById', uid)
  const userDoc = await fb.getDoc(userRef)
  if(userDoc.exists()){
    const { name } = userDoc.data()
    return { name }
  }
  else{
    console.log("error")
  }
  return null
}

// Get a list of users to the block page 
export async function getCategories() {
  const cateroriesSnapshot = await fb.getDocs(fb.collection(db, 'categories'))
  const categoryListFromDB = cateroriesSnapshot.docs || []
  const categoryList = categoryListFromDB.map(doc=> {
    const { name } = doc.data()
    return { name }
  })
  return categoryList;
}

//count groups from each category 
export async function countCategories() {
  // const cateroriesSnapshot = await fb.getDocs(fb.collection(db, 'categories'))
  // const categoryListFromDB = cateroriesSnapshot.docs || []
  const coll = fb.collection(db, "groups");
  var countList = []
  var categoryList = ["Football", "Group games", "Basketball", "Hang out", "Minnian", "Volunteer"]
  for(const category of categoryList) {
    console.log(category)
    var query_ = fb.query(coll, where('title', '==', category));
    var snapshot = await fb.getCountFromServer(query_);
    var obj = {name:category, count:snapshot.data().count}
    countList.push(obj)
  };
  return countList
}

//compare the number of groups that opened to the groups that happened in each category 
export async function compareHappened() {
  const cateroriesSnapshot = await fb.getDocs(fb.collection(db, 'categories'))
  const categoryListFromDB = cateroriesSnapshot.docs || []
  console.log(categoryListFromDB[0].data().name)
  const coll = fb.collection(db, "groups");
  var countListTotal = []
  var countListHappened = []
  for(const category of categoryListFromDB){
    var query_ = fb.query(coll, where('title', '==', category.data().name));
    var snapshot = await fb.getCountFromServer(query_);
    countListTotal.push({name:category.data().name, count:snapshot.data().count})
    query_ = fb.query(coll, where('title', '==', category.data().name), where('is_happened', '==', true));
    snapshot = await fb.getCountFromServer(query_);
    countListHappened.push({name:category.data().name, count:snapshot.data().count})
  };
  return [countListTotal, countListHappened]
}

//get group details  
export async function getGroupDetails(gid) {
  const groupRef = fb.doc(db, 'groups', gid)
  const groupDoc = await fb.getDoc(groupRef)
  if(groupDoc.exists()){
    const headObj = await getUser(groupDoc.data().head_of_group)
    const head_of_group_uid = headObj.name
    console.log(head_of_group_uid)
    const {title, city, time, date, num_of_participant} = groupDoc.data()
    return {title, city, time, date, num_of_participant, head_of_group_uid}
  }
  else{
    console.log("error")
    return null
  }
}

//get top users   
export async function getTopUsers() {
  const q = fb.query(fb.collection(db, 'usersById'), fb.orderBy("my_groups", "desc"), fb.limit(3));
  const userSnapshot = await fb.getDocs(q)
  const userListFromDB = userSnapshot.docs || []
  const userList = userListFromDB.map(doc=> {
    const count = doc.data().my_groups.length
    const {name} = doc.data()
    return {name, count}
  })
  return userList;
}

//get groups by title   
export async function getGroups(title) {
  const q = fb.query(fb.collection(db, 'groups'), fb.where("title", "==", title), fb.where("is_happened", "==", false));
  const groupsSnapshot = await fb.getDocs(q)
  const groupListFromDB = groupsSnapshot.docs || []
  const groupList = groupListFromDB.map(doc=> {
    const {city, max_participants, min_participants, num_of_participant} = doc.data()
    const id = doc.id
    const date = doc.data().date + " " + doc.data().time
    return {title, city, date, id, max_participants, min_participants, num_of_participant}
  })
  return groupList;
}

//get groups by machine learning   
export async function getRelatedGroups(category) {
  const q_pairs = fb.query(fb.collection(db, 'pairsFromTraining'), or(fb.where("pair1", "==", category), fb.where("pair2", "==", category)))
  const pairsSnapshot = await fb.getDocs(q_pairs)
  const pairsListFromDB = pairsSnapshot.docs || []
  const pairsList = pairsListFromDB.map(doc=> {
    if(doc.data().pair1 == category){
      const currTitle = doc.data().pair2
      return currTitle
    }
    else{
      const currTitle = doc.data().pair1
      return currTitle
    }
  })
  console.log(pairsList)
  var groupList = []
  for(const title of pairsList){
    const q = fb.query(fb.collection(db, 'groups'), fb.where("title", "==", title), fb.where("is_happened", "==", false));
    const groupsSnapshot = await fb.getDocs(q)
    const groupListFromDB = groupsSnapshot.docs || []
    const currGroupList = groupListFromDB.map(doc=> {
      const {city, max_participants, min_participants, num_of_participant} = doc.data()
      const id = doc.id
      const date = doc.data().date + " " + doc.data().time
      return {title, city, date, id, max_participants, min_participants, num_of_participant}
    })
    for(const group of currGroupList){
      groupList.push(group);
    }
  }
  console.log(groupList)
  return groupList
}

//get groups by title and city
export async function getGroupsCity(title, city) {
  const q = fb.query(fb.collection(db, 'groups'), fb.where("title", "==", title), fb.where("city", "==", city), fb.where("is_happened", "==", false));
  const groupsSnapshot = await fb.getDocs(q)
  const groupListFromDB = groupsSnapshot.docs || []
  const groupList = groupListFromDB.map(doc=> {
    const {max_participants, num_of_participant} = doc.data()
    const id = doc.id
    const date = doc.data().date + " " + doc.data().time
    return {title, city, date, id, max_participants, num_of_participant}
  })
  return groupList;
}



