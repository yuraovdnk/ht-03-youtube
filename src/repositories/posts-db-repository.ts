import {postsCollection, postsType} from "./db";

import {paginateType, pagination, ResponsePaginate} from "./pagination";


export const postsRepository = {

    async getPosts(query: paginateType):Promise<ResponsePaginate> {
        let filter =  {}
        return await pagination(query,filter,postsCollection)
    },

    async createPost(newPost: postsType):Promise<boolean>{
        const result = await postsCollection.insertOne(newPost)
        return result.acknowledged
    },

    async getPostById(id:number):Promise<postsType | null>{
        return await postsCollection.findOne({id},{projection:{_id:false}})
    },

    async updatePost(body : postsType, id:number):Promise<boolean>{
        const result = await postsCollection.updateOne({id},{
            $set : {title: body.title,shortDescription:body.shortDescription,content:body.content,bloggerId:body.bloggerId}})
        return result.matchedCount === 1
    },

    async deletePost(id:number):Promise<boolean>{
        const result = await postsCollection.deleteOne({id})
        return result.deletedCount === 1
    },

    async getPostByBloggerId(bloggerId:number,query:paginateType):Promise<ResponsePaginate>{
        let filter = {bloggerId}
        return await pagination(query,filter,postsCollection)
    }

}