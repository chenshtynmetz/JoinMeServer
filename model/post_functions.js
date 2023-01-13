import { initializeApp } from 'firebase/app';
import * as fb from 'firebase/firestore'
import 'firebase/auth';
import 'firebase/firestore'
import { FieldValue } from 'firebase/firestore';


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


//increase the number of reports of the user
export async function addReportToUser(uid) {
    const userRef = fb.doc(db, 'usersById', uid)
    const userDoc = await fb.getDoc(userRef)
    if(userDoc.exists()){
        var numReports = userDoc.data().num_of_reports + 1
        await fb.updateDoc(userRef, {num_of_reports: numReports})
        return userDoc;
    }
    else{
        console.log("error")
        return null
    }
}

//delete all the groups that the user create
export async function deleteUserGroups(uid) {
    const userRef = fb.doc(db, 'usersById', uid)
    const userDoc = await fb.getDoc(userRef)
    if(userDoc.exists()){
        for(var i=0; i<userDoc.data().my_groups.length; i++){
            const groupRef = fb.doc(db, 'groups', userDoc.data().my_groups[i])
            const groupDoc = await fb.getDoc(groupRef)
            if(groupDoc.exists()){
                for(var j=0; j<groupDoc.data().participants.length; j++){
                    const currUserRef = fb.doc(db, 'usersById', groupDoc.data().participants[j])
                    const currUserDoc = await fb.getDoc(currUserRef)
                    if(currUserDoc.exists()){
                        var updateUserGroups = []
                        for(var k=0; k<currUserDoc.data().groups_I_joined.length; k++){
                            if(currUserDoc.data().groups_I_joined[k] != userDoc.data().my_groups[i]){
                                updateUserGroups.push(currUserDoc.data().groups_I_joined[k])
                            }
                        }
                        await fb.updateDoc(currUserRef, {groups_I_joined: updateUserGroups})
                    }
                }
            }
            await fb.deleteDoc(groupRef)
        }
        await fb.updateDoc(userRef, {my_groups: []})
        return "done"
    }
    else{
        console.log("error")
        return null
    }
}

//delete all the groups that the user joined
export async function deleteUserJoinedGroups(uid) {
    const userRef = fb.doc(db, 'usersById', uid)
    const userDoc = await fb.getDoc(userRef)
    if(userDoc.exists()){
        for(var i=0; i<userDoc.data().groups_I_joined.length; i++){
            const groupRef = fb.doc(db, 'groups', userDoc.data().groups_I_joined[i])
            const groupDoc = await fb.getDoc(groupRef)
            if(groupDoc.exists()){
                var updateParticipants = []
                for(var j=0; j<groupDoc.data().participants.length; j++){
                        if(groupDoc.data().participants[j] != uid){
                            updateParticipants.push(groupDoc.data().participants[j])
                    }
                }
                const numOfPart = groupDoc.data().num_of_participant - 1
                await fb.updateDoc(groupRef, {participants: updateParticipants})
                await fb.updateDoc(groupRef, { num_of_participant: numOfPart})
            }
            await fb.updateDoc(userRef, {groups_I_joined: []})
            return "done"
        }
    }
    else{
        console.log("error")
    }
}

//update user details
export async function updateUserDetails(uid, name, birth_date, phone) {
    const userRef = fb.doc(db, 'usersById', uid)
    const userDoc = await fb.getDoc(userRef)
    if(userDoc.exists()){
        await fb.updateDoc(userRef, {name: name})
        await fb.updateDoc(userRef, {birth_date: birth_date})
        await fb.updateDoc(userRef, {phone: phone})
        return "done"
    }
    else{
        console.log("error")
    }
}

//update group details
export async function updateGroupDetails(gid, title, city, date, time, num_of_participant) {
    const groupRef = fb.doc(db, 'groups', gid)
    const grouoDoc = await fb.getDoc(groupRef)
    if(grouoDoc.exists()){
        await fb.updateDoc(groupRef, {title: title})
        await fb.updateDoc(groupRef, {city: city})
        await fb.updateDoc(groupRef, {date: date})
        await fb.updateDoc(groupRef, {time: time})
        await fb.updateDoc(groupRef, {num_of_participant: num_of_participant})
        return "done"
    }
    else{
        console.log("error")
    }
}

//add new user to the database
export async function addUserToDb(uid, name, phone, email, birthday) {
    await fb.setDoc(fb.doc(db, "usersById", uid), 
    {
        birth_date: birthday,
        groups_I_joined: [],
        mail: email,
        my_groups: [],
        name: name,
        num_of_reports: 0,
        phone: phone,
        success_creating_groups: 0,
        uid: uid
    });
    return "done"
}

//add new group to the database
export async function addGroupToDb(title, city, time, date, head_uid, min, max) {
    const docRef = await fb.addDoc(fb.collection(db, "groups"), 
    {
        city: city,
        date: date,
        head_of_group: head_uid,
        is_happened: false,
        max_participants: max,
        min_participants: min,
        num_of_participant: 1,
        participants: [head_uid],
        time: time,
        title: title
    });
    //add group to user db
    const userRef = fb.doc(db, 'usersById', head_uid)
    const userDoc = await fb.getDoc(userRef)
    if(userDoc.exists()){
        var myGroups = []
        for(var i=0; i<userDoc.data().my_groups.length; i++){
            myGroups.push(userDoc.data().my_groups[i])
        }
        myGroups.push(docRef.id)
        await fb.updateDoc(userRef, {my_groups: myGroups})
    }
    else{
        console.log("error")
    }
    return "done"
}

//add user to group
export async function addUserToGroup(gid, uid) {
    //add group to user db
    const userRef = fb.doc(db, 'usersById', uid)
    const userDoc = await fb.getDoc(userRef)
    if(userDoc.exists()){
        var myGroups = []
        for(var i=0; i<userDoc.data().groups_I_joined.length; i++){
            myGroups.push(userDoc.data().groups_I_joined[i])
        }
        myGroups.push(gid)
    }
    else{
        console.log("error")
    }

    //add user to group db
    const groupRef = fb.doc(db, 'groups', gid)
    const groupDoc = await fb.getDoc(groupRef)
    if(groupDoc.exists()){
        var groupUsers = []
        for(var i=0; i<groupDoc.data().participants.length; i++){
            if(groupDoc.data().participants[i] === uid){
                return ""
            }
            groupUsers.push(groupDoc.data().participants[i])
        }
        groupUsers.push(uid)
        const numOfPart = groupDoc.data().num_of_participant + 1
        await fb.updateDoc(groupRef, {participants: groupUsers})
        await fb.updateDoc(groupRef, { num_of_participant: numOfPart})
        await fb.updateDoc(userRef, {groups_I_joined: myGroups})
    }
    else{
        console.log("error")
    }
    return "done"
}

//add user to blockUsers collection
export async function blockUser(uid) {
    const userRef = fb.doc(db, 'usersById', uid)
    const userDoc = await fb.getDoc(userRef)
    if(userDoc.exists()){
        await fb.setDoc(fb.doc(db, "blockUsers", uid), userDoc.data());
        await fb.deleteDoc(fb.doc(db, "usersById", uid))
    }
    else{
        console.log("error")
    }
    return "done"
}

export async function isHappened(gid, flag){
    const groupRef = fb.doc(db, 'groups', gid)
    const groupDoc = await fb.getDoc(groupRef)
    if(groupDoc.exists()){
        await fb.updateDoc(groupRef, {is_happened: flag})
    }
    else{
        console.log("error")
    }
    return "done"
}

//add new category to the database
export async function addCategory(category) {
    await fb.addDoc(fb.collection(db, "categories"), {name: category});
    return "done"
}
