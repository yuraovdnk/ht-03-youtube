import {bloggerType, postsType} from "../repositories/db";
import {postsRepository} from "../repositories/posts-db-repository";
import {paginateType, ResponsePaginate} from "../repositories/pagination";

export const postsService = {
    async getPosts(query: paginateType):Promise<ResponsePaginate> {
        return await postsRepository.getPosts(query)
    },

    async getPostById(id:number):Promise<postsType | null>{
        return await postsRepository.getPostById(id)
    },

    async createPost(body: postsType,blogger:bloggerType): Promise<postsType | boolean> {
        const newPost = {
            id: Date.now(),
            title: body.title,
            shortDescription: body.shortDescription,
            content: body.content,
            bloggerId: blogger.id,
            bloggerName: blogger.name
        }

        const result = await postsRepository.createPost(newPost)
        if(result){
            return newPost
        }
        return result
    },

    async updatePost(body: postsType,id:number):Promise<boolean>{
        return await postsRepository.updatePost(body,id)
    },

    async deletePost(id:number):Promise<boolean>{
        return await postsRepository.deletePost(id)
    },

    async getPostByBloggerId(bloggerId: number,query: paginateType): Promise<ResponsePaginate> {
        return await postsRepository.getPostByBloggerId(bloggerId,query)
    },
}