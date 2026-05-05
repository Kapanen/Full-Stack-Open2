const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    response.json(blogs)
})


blogsRouter.post('/', async (request, response, next) => {
  try {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })
  
  const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const result = await Blog.findByIdAndDelete(request.params.id)

    if (!result) {
      return response.status(404).json({ error: 'blog not found' })
    }

    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const { title, author, url, likes } = request.body

    const updatedBlog = {
      title,
      author,
      url,
      likes
    }

    const result = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true })

    if (!result) {
      return response.status(404).json({ error: 'blog not found' })
    }

    response.json(result)
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter