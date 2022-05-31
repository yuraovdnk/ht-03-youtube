import {postsType} from "./db";
import {Collection} from "mongodb";

export type paginateType = {
    PageSize: string,
    PageNumber: string,
    SearchNameTerm: string
}
export type ResponsePaginate = {
    pagesCount: number
    page: number,
    pageSize: number,
    totalCount: number,
    items: postsType[]
}

export async function pagination(query: paginateType, filter: object, collection: Collection<any>): Promise<ResponsePaginate> {
    let pageSize = +query.PageSize || 10
    let pageNumber = +query.PageNumber || 1

    let skip = pageSize * (pageNumber - 1)

    let totalCount = await collection.countDocuments(filter)
    const items = await collection.find(filter).skip(skip).limit(pageSize).toArray()

    let obj = {
        pagesCount: Math.ceil(totalCount / pageSize),
        page: pageNumber,
        pageSize,
        totalCount,
        items
    }
    return obj
}