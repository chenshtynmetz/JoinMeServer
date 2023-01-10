import express from 'express';
import * as get_functions from "../model/get_functions.js"

const getRouter = express.Router()

// Get a list of users to the block page 
getRouter.get('/presentUsersToBlock', async (req, res) => {
    const userList = await get_functions.getUsers()
    if (userList.length === 0 ) {
      return res.status(404).send()
    }
    return res.status(200).send(userList)
    
  })
//presentMyCreatedHistory?uid=P7PiC4RN6uPvTR6zSRK1G8nDLza2

//get the history of the groups that the user created
getRouter.get('/presentMyCreatedHistory', async(req, res) =>{
  const groupsList = await get_functions.getMyCreatedHistory(req.query.uid)
  if (groupsList.length === 0){
    return res.status(404).send()
  }
  return res.status(200).send(groupsList)
})


//get the history of the groups that the user joined
getRouter.get('/presentMyJoinedHistory', async(req, res) =>{
  const groupsList = await get_functions.getMyJoinedHistory(req.query.uid)
  if (groupsList.length === 0){
    return res.status(404).send()
  }
  return res.status(200).send(groupsList)
})

//get the participent in this group
getRouter.get('/presentGroupParticipants', async(req, res) =>{
  const usersList = await get_functions.getGroupParticipants(req.query.gid)
  if (usersList.length === 0){
    return res.status(404).send()
  }
  return res.status(200).send(usersList)
})

// Get a list of users to the block page 
getRouter.get('/presentReportedUsers', async (req, res) => {
  const userList = await get_functions.getReportedUsers()
  if (userList.length === 0 ) {
    return res.status(404).send()
  }
  return res.status(200).send(userList)
})

//Check if the user is blocked
getRouter.get('/checkBlockedUser', async(req, res) =>{
  const groupsList = await get_functions.checkBlockedUser(req.query.uid)
  if (groupsList.length === 0){
    return res.status(404).send()
  }
  return res.status(200).send(groupsList)
})

//Check if the user is blocked
getRouter.get('/userDetails', async(req, res) =>{
  const groupsList = await get_functions.getUser(req.query.uid)
  if (groupsList.length === 0){
    return res.status(404).send()
  }
  return res.status(200).send(groupsList)
})

export { getRouter }