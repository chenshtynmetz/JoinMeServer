import express from 'express';
import * as post_functions from "../model/post_functions.js"

const postRouter = express.Router()

//increase the number of reports of the user
postRouter.post('/addReportToUser', async (req, res) => {
    const userList = await post_functions.addReportToUser(req.query.uid)
    if (userList.length === 0 ) {
      return res.status(404).send()
    }
    return res.status(200).send("done")
    
  })

//delete all the groups that the user create
postRouter.post('/deleteUserGroups', async (req, res) => {
  const userList = await post_functions.deleteUserGroups(req.query.uid)
  if (userList.length === 0 ) {
    return res.status(404).send()
  }
  return res.status(200).send("done")
  
})

//delete all the groups that the user joined
postRouter.post('/deleteUserJoinedGroups', async (req, res) => {
  const userList = await post_functions.deleteUserJoinedGroups(req.query.uid)
  if (userList.length === 0 ) {
    return res.status(404).send()
  }
  return res.status(200).send("done")
  
})


//update user details
postRouter.post('/updateUserDetails', async (req, res) => {
  const userList = await post_functions.updateUserDetails(req.query.uid, req.query.name, req.query.birth_date, req.query.phone)
  if (userList.length === 0 ) {
    return res.status(404).send()
  }
  return res.status(200).send("done")
  
})


//update group details
postRouter.post('/updateGroupDetails', async (req, res) => {
  const userList = await post_functions.updateGroupDetails(req.query.gid, req.query.title, req.query.city, req.query.date, req.query.time, req.query.num_of_participant)
  if (userList.length === 0 ) {
    return res.status(404).send()
  }
  return res.status(200).send("done")
  
})

//add new user to the database
postRouter.post('/addUser', async (req, res) => {
  const userList = await post_functions.addUserToDb(req.query.user)
  if (userList.length === 0 ) {
    return res.status(404).send()
  }
  return res.status(200).send("done")
})

//add new group to the database
postRouter.post('/addGroup', async (req, res) => {
  const userList = await post_functions.addGroupToDb(req.query.group)
  if (userList.length === 0 ) {
    return res.status(404).send()
  }
  return res.status(200).send("done")
})

//add user to group
postRouter.post('/addUserToGroup', async (req, res) => {
  const userList = await post_functions.addUserToGroup(req.query.gid, req.query.uid)
  if (userList.length === 0 ) {
    return res.status(404).send()
  }
  return res.status(200).send("done")
})

//block user
postRouter.post('/blockThisUser', async (req, res) => {
  const userList = await post_functions.blockUser(req.query.uid)
  if (userList.length === 0 ) {
    return res.status(404).send()
  }
  return res.status(200).send("done")
})


export { postRouter }