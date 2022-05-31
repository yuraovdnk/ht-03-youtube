import {MongoClient} from "mongodb";

export type bloggerType = {
    id: number
    name: string
    youtubeUrl: string
}
export type postsType = {
    id: number
    title: string
    shortDescription: string
    content:string
    bloggerId:number
}
const mongoUri = process.env.MongoURI || 'mongodb+srv://d9A6uIMka4p9L6XP:ovdey1970@cluster0.sbzbx.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(mongoUri)
const db = client.db('youtube')
export const bloggerCollection = db.collection<bloggerType>("bloggers")
export const postsCollection = db.collection<postsType>("posts")

export async function runDb() {
    try {
        await client.connect()
        console.log("succesfully")

    } catch (e) {
        console.log("Not connected to db")
        await client.close()
    }
}