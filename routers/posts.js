import express from 'express';
import * as post_functions from "../model/post_functions.js"
import bodyParser from "body-parser"

const postRouter = express.Router()

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
postRouter.use(bodyParser.urlencoded({
  extended: true
}));

/**bodyParser.json(options)
* Parses the text as JSON and exposes the resulting object on req.body.
*/
postRouter.use(bodyParser.json());

//increase the number of reports of the user
postRouter.post('/addReportToUser', async (req, res) => {
  const uid = req.body.uid
  const userList = await post_functions.addReportToUser(uid)
    if (userList.length === 0 ) {
      return res.status(404).send()
    }
    return res.status(200).send("done")
    
  })

//delete all the groups that the user create
postRouter.post('/deleteUserGroups', async (req, res) => {
  const userList = await post_functions.deleteUserGroups(req.body.uid)
  if (userList.length === 0 ) {
    return res.status(404).send()
  }
  return res.status(200).send("done")
  
})

//delete all the groups that the user joined
postRouter.post('/deleteUserJoinedGroups', async (req, res) => {
  const userList = await post_functions.deleteUserJoinedGroups(req.body.uid)
  if (userList.length === 0) {
    return res.status(404).send()
  }
  return res.status(200).send("done")
  
})


//update user details
postRouter.post('/updateUserDetails', async (req, res) => {
  const userList = await post_functions.updateUserDetails(req.body.uid, req.body.name, req.body.birth_date, req.body.phone)
  if (userList.length === 0 ) {
    return res.status(404).send()
  }
  return res.status(200).send("done")
  
})


//update group details
postRouter.post('/updateGroupDetails', async (req, res) => {
  const userList = await post_functions.updateGroupDetails(req.body.gid, req.body.title, req.body.city, req.body.date, req.body.time, req.body.num_of_participant)
  if (userList.length === 0 ) {
    return res.status(404).send()
  }
  return res.status(200).send("done")
  
})

//add new user to the database
postRouter.post('/addUser', async (req, res) => {
  const ans = await post_functions.addUserToDb(req.body.uid, req.body.name, req.body.phone, req.body.email, req.body.date)
  if (ans.length === 0 ) {
    return res.status(404).send()
  }
  return res.status(200).send("done")
})

//add new group to the database
postRouter.post('/addGroup', async (req, res) => {
  const userList = await post_functions.addGroupToDb(req.body.gid, req.body.title, req.body.city, req.body.time, req.body.date, req.body.head_uid, req.body.min, req.body.max)
  if (userList.length === 0 ) {
    return res.status(404).send()
  }
  return res.status(200).send("done")
})

//add user to group
postRouter.post('/addUserToGroup', async (req, res) => {
  const userList = await post_functions.addUserToGroup(req.body.gid, req.body.uid)
  if (userList.length === 0 ) {
    return res.status(404).send()
  }
  return res.status(200).send("done")
})

//block user
postRouter.post('/blockThisUser', async (req, res) => {
  const ansDelete = await post_functions.deleteUserGroups(req.body.uid)
  const ansJoinedDelete = await post_functions.deleteUserJoinedGroups(req.body.uid)
  const userList = await post_functions.blockUser(req.body.uid)
  if (userList.length === 0 ) {
    return res.status(404).send()
  }
  return res.status(200).send("done")
})

//set group happened
postRouter.post('/isHappened', async(req, res) => {
  const ans = await post_functions.isHappened(req.body.gid, req.body.flag)
  if (ans.length === 0 ) {
    return res.status(404).send()
  }
  return res.status(200).send("done")
})

//add category to db
postRouter.post('/addCategory', async(req, res) => {
  const ans = await post_functions.addCategory(req.body.category)
  if (ans.length === 0 ) {
    return res.status(404).send()
  }
  return res.status(200).send("done")
})

export { postRouter }