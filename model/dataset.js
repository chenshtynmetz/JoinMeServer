import { initializeApp } from 'firebase/app';
import * as fb from 'firebase/firestore'
import 'firebase/auth';
import 'firebase/firestore'
import { where } from 'firebase/firestore';
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const spawner = require("child_process").spawn;
var fs = require('fs');

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

async function get_groups(){
    const q = fb.query(fb.collection(db, 'groups'));
    const groupsSnapshot = await fb.getDocs(q)
    const groupListFromDB = groupsSnapshot.docs || []
    const groupList = groupListFromDB.map(doc=> {
    const {title, participants} = doc.data()
    return {title, participants}
  })
//   console.log(groupList)
  return groupList
}

export async function create_dataset(){
    try {//if the file exist, delete it and create a new one
        if (fs.existsSync("model.csv")) {
            fs.unlinkSync("model.csv");
        }
    } catch (e) {
        console.error(e);
    }
    //fields
    var csv = "uid,category\r\n";
    await fs.appendFile("model.csv", csv, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("success");
        }
    });
    var groupList = await get_groups()
    for(const group of groupList){
        for(const participant of group.participants){
            csv = participant +","+group.title+"\r\n"

            fs.appendFile("model.csv", csv, (err)=>{
                if (err){
                    console.log(err)
                }
            });
        }
    }
    const python_process = spawner('python', ['./main.py'])
    python_process.stdout.on('data', async (data) => {
        const pairsSnapshot = await fb.getDocs(fb.collection(db, 'pairsFromTraining'));
        const pairsFromDB = pairsSnapshot.docs || [];
        const pairsList = pairsFromDB.map(doc => {
        const pid = doc.id;
        return pid;
        });

        for (const pair of pairsList) {
        await fb.deleteDoc(fb.doc(db, 'pairsFromTraining', pair));
        }
        const pairs = JSON.parse(data.toString())
        // console.log(pairs[0])
        for(var p in pairs){
            console.log(pairs[p])
            const docRef = await fb.addDoc(fb.collection(db, "pairsFromTraining"),
            {
                pair1: pairs[p][0],
                pair2: pairs[p][1]
            })
        }
        // console.log(JSON.parse(data.toString()))
    });
    return "done"
}
