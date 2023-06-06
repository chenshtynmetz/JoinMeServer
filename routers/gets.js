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
  const check = await get_functions.checkBlockedUser(req.query.uid)
  console.log(check)
  if (check.length === 0){
    return res.status(404).send()
  }
  return res.status(200).send(check)
})

//get all the categories
getRouter.get('/getCategories', async(req, res) =>{
  const categoryList = await get_functions.getCategories()
  if (categoryList.length === 0){
    return res.status(404).send()
  }
  return res.status(200).send(categoryList)
})

//count groups from each category
getRouter.get('/countCategories', async(req, res) =>{
  const groupsList = await get_functions.countCategories()
  if (groupsList.length === 0){
    return res.status(404).send()
  }
  return res.status(200).send(groupsList)
})

//compare the number of groups that opened to the groups that happened in each category 
getRouter.get('/compareHappened', async(req, res) =>{
  const groupsList = await get_functions.compareHappened()
  if (groupsList.length === 0){
    return res.status(404).send()
  }
  return res.status(200).send(groupsList)
})

//get group details 
getRouter.get('/getGroupDetails', async(req, res) =>{
  const group = await get_functions.getGroupDetails(req.query.gid)
  if (group.length === 0){
    return res.status(404).send()
  }
  return res.status(200).send(group)
})

getRouter.get('/getUserDetails', async(req, res) =>{
  const user = await get_functions.getUser(req.query.uid)
  if (user.length === 0){
    return res.status(404).send()
  }
  return res.status(200).send(user)
})

//get top users 
getRouter.get('/getTopUsers', async(req, res) =>{
  const groupsList = await get_functions.getTopUsers()
  if (groupsList.length === 0){
    return res.status(404).send()
  }
  return res.status(200).send(groupsList)
})

//get groups by title
getRouter.get('/getGroups', async(req, res) =>{
  const groupsList = await get_functions.getGroups(req.query.title)
  if (groupsList.length === 0){
    return res.status(404).send()
  }
  return res.status(200).send(groupsList)
})

//get groups by machine learning
getRouter.get('/getRelatedGroups', async(req, res) =>{
  const groupsList = await get_functions.getRelatedGroups(req.query.title)
  if (groupsList.length === 0){
    return res.status(404).send()
  }
  return res.status(200).send(groupsList)
})

//get groups by title and city
getRouter.get('/getGroupsCity', async(req, res) =>{
  const groupsList = await get_functions.getGroupsCity(req.query.title, req.query.city)
  if (groupsList.length === 0){
    return res.status(404).send()
  }
  return res.status(200).send(groupsList)
})

export { getRouter }