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

//todo: chek why this delete all the participants!!!!!!!!!!!!!! and do order in the database
//delete all the groups that the user joined
export async function deleteUserJoinedGroups(uid) {
    const userRef = fb.doc(db, 'usersById', uid)
    const userDoc = await fb.getDoc(userRef)
    if(userDoc.exists()){
        for(var i=0; i<userDoc.data().groups_I_joined.length; i++){
            const groupRef = fb.doc(db, 'groups', userDoc.data().groups_I_joined[i])
            const groupDoc = await fb.getDoc(groupRef)
            if(groupDoc.exists()){
                for(var j=0; j<groupDoc.data().participants.length; j++){
                    var updateParticipants = []
                        if(groupDoc.data().participants[j] != uid){
                            updateParticipants.push(groupDoc.data().participants[j])
                        }
                        await fb.updateDoc(groupRef, {participants: updateParticipants})
                    }
                }
            }
            await fb.updateDoc(userRef, {groups_I_joined: []})
            return "done"
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


//todo: להוסיף בדיקת תקינות לעדכוני פרטים(תאריכים וכו)