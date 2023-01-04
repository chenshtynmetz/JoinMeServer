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


