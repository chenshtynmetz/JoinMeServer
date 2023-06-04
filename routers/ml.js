import express from 'express';
import * as ml_functions from "../model/dataset.js"
import bodyParser from "body-parser"

const mlRouter = express.Router()

mlRouter.use(bodyParser.urlencoded({
    extended: true
  }));
  
  /**bodyParser.json(options)
  * Parses the text as JSON and exposes the resulting object on req.body.
  */
  mlRouter.use(bodyParser.json());

  mlRouter.get('/trainModel', async (req, res) => {
    const ans = await ml_functions.create_dataset()
      if (ans.length === 0 ) {
        return res.status(404).send()
      }
      return res.status(200).send("done")
      
    })

    export { mlRouter }
    