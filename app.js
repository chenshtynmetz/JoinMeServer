import express from 'express';
import { getRouter } from "./routers/gets.js"
import { postRouter } from "./routers/posts.js"
import { mlRouter } from "./routers/ml.js"
import { createRequire } from "module";
// import * as ml_functions from "./model/dataset.js"

const app = express()
app.use(postRouter)
app.use(getRouter)
app.use(mlRouter)
// app.use(express.static('routers'))

const require = createRequire(import.meta.url);
const qrcode = require('qrcode-terminal');

const { Client } = require('whatsapp-web.js');


const client = new Client();
async function createQr(){
    client.on('qr', qr => {
        qrcode.generate(qr, {small: true});
        // console.log(client.info)
    });
 
}

createQr().then(()=>{
    app.listen(3000,  () => {
        console.log("Listening on port 3000...")
        
    })
})

client.initialize();
export { client, require }

