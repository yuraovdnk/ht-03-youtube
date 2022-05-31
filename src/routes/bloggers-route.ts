import {Router, Request, Response} from "express";
import {bloggersService} from "../domain/bloggers-service";
import {bloggersRepository} from "../repositories/bloggers-db-repository";
import {bloggersValidate} from "../middleware/bloggers-validator";
import {checkAuth} from "../middleware/auth";
import {postsService} from "../domain/posts-service";
import {paginateType} from "../repositories/pagination";
import {postsValidate} from "../middleware/posts-validator";


export const bloggersRoute = Router()

bloggersRoute.get('/', async (req: Request, res: Response) => {
    const bloggers = await bloggersService.getBloggers(req.query as paginateType)
    res.status(200).send(bloggers)
})

bloggersRoute.get('/:id', async (req: Request, res: Response) => {
    const blogger = await bloggersService.getBloggerById(+req.params.id)
    if (blogger) {
        res.status(200).send(blogger)
        return
    }
    res.send(404)
})

bloggersRoute.post('/', checkAuth, bloggersValidate, async (req: Request, res: Response) => {
    const newBlogger = await bloggersService.createBlogger(req.body)
    if (newBlogger) {
        res.status(201).send(newBlogger)
        return
    }
    res.send(404)
})

bloggersRoute.put('/:id',checkAuth, bloggersValidate, async (req: Request, res: Response) => {
    const foundBlogger = await bloggersRepository.getBloggerById(+req.params.id)
    if (foundBlogger) {
        const isUpdated = await bloggersService.updateBlogger(+req.params.id, req.body)
        if (isUpdated) {
            res.send(204)
            return
        }
        res.send(400)
        return
    }
    res.send(404)
})

bloggersRoute.delete('/:id', checkAuth, async (req: Request, res: Response) => {
    const isDeleted = await bloggersService.deleteBlogger(+req.params.id)
    if (isDeleted) {
        res.send(204)
        return
    }
    res.send(404)
})

////////////get blogger`s posts //////////////

bloggersRoute.get('/:bloggerId/posts', async (req: Request, res: Response) => {
    const bloggerExist = await bloggersService.getBloggerById(+req.params.bloggerId)
    if (bloggerExist) {
        const post = await postsService.getPostByBloggerId(+req.params.bloggerId, req.query as paginateType)
        res.status(200).send(post)
        return
    }
    res.send(404)
})

bloggersRoute.post('/:bloggerId/posts', checkAuth,postsValidate,async (req: Request, res: Response) => {
    const blogger = await bloggersService.getBloggerById(+req.params.bloggerId)
    if (blogger) {
        const createdPost = await postsService.createPost(req.body, blogger)
        res.status(201).send(createdPost)
        return
    }
    res.send(404)
})


