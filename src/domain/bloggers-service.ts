import {bloggersRepository} from "../repositories/bloggers-db-repository";
import {bloggerType} from "../repositories/db";
import {paginateType, ResponsePaginate} from "../repositories/pagination";

export const bloggersService = {
    async getBloggers(query: paginateType): Promise<ResponsePaginate> {
        return await bloggersRepository.getBloggers(query)
    },
    async getBloggerById(id: number): Promise<bloggerType | null> {
        return bloggersRepository.getBloggerById(id)
    },
    async createBlogger(body: bloggerType): Promise<bloggerType> {
        const newBlogger = {
            id: Date.now(),
            name: body.name,
            youtubeUrl: body.youtubeUrl
        }
        await bloggersRepository.createBlogger(newBlogger)
        return newBlogger

    },
    async updateBlogger(id: number, body: bloggerType): Promise<boolean> {
        return await bloggersRepository.updateBlogger(id, body)
    },

    async deleteBlogger(id: number): Promise<boolean> {
        return await bloggersRepository.deleteBlogger(id)
    },
}