import {bloggerCollection, bloggerType} from "./db";
import {paginateType, pagination, ResponsePaginate} from "./pagination";


export const bloggersRepository = {
    async getBloggers(query: paginateType): Promise<ResponsePaginate> {
        let filter = query.SearchNameTerm ? {name: {$regex: query.SearchNameTerm}} : {}
        return await pagination(query, filter, bloggerCollection)
    },

    async getBloggerById(id: number): Promise<bloggerType | null> {
        return bloggerCollection.findOne({id: id})
    },
    async createBlogger(body: bloggerType): Promise<bloggerType> {
        await bloggerCollection.insertOne(body)
        return body
    },
    async updateBlogger(id: number, body: bloggerType): Promise<boolean> {
        const result = await bloggerCollection.updateOne({id: id}, {
            $set: {
                name: body.name,
                youtubeUrl: body.youtubeUrl
            }
        })
        return result.matchedCount === 1
    },
    async deleteBlogger(id: number): Promise<boolean> {
        const result = await bloggerCollection.deleteOne({id: id})
        return result.deletedCount === 1
    }
}
