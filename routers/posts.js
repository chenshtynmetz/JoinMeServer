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

export { postRouter }