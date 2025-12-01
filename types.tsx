export type Blog = {
    id: string,
    title: string,
    content: string,
    image: string,
    tags: string,
    author: string,
    datePublished: string
}

export type Comments = {
    blogId: string
    id: number,
    user: string,
    comment: string,
    timestamp: string,
    rating: number
}