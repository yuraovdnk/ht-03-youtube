import express from 'express'
const app = express()
import cors from 'cors'
import bodyParser from 'body-parser'
import {runDb} from "./repositories/db";
import {bloggersRoute} from "./routes/bloggers-route";
import {postsRoute} from "./routes/posts-route";

const port = process.env.PORT || 5000

app.use(cors())
app.use(bodyParser.json())
app.use('/bloggers', bloggersRoute)
app.use('/posts',postsRoute)

export async function start(){
    await runDb()
    app.listen(port,()=>{
        console.log(`App listening on port ${port}`)
    })
}
start()