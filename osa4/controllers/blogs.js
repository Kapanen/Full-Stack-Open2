const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 })

    if (!blog) {
      return response.status(404).json({ error: 'blog not found' })
    }

    response.json(blog)
  } catch (error) {
    next(error)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  try {
  const body = request.body
  const user = request.user
  console.log('user:', user)
  console.log('token:', request.token)


  if (!user) {
    return response.status(400).json({ error: 'no user found' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })
  
  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  const populatedBlog = await Blog.findById(savedBlog._id).populate('user', { username: 1, name: 1 })
  console.log('populatedBlog:', populatedBlog)
  response.status(201).json(populatedBlog)

  const updatedUser = await User.findById(user._id).populate('blogs')
  console.log('updatedUser:', updatedUser)
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const token = request.token
    const user = request.user

    if (!user) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = await Blog.findById(request.params.id)

    if (!blog) {
      return response.status(404).json({ error: 'blog not found' })
    }

    if (blog.user.toString() !== user._id.toString()) {
      return response.status(403).json({ error: 'only the creator can delete the blog' })
    }

    await Blog.findByIdAndDelete(request.params.id)

    response.status(204).send('blog deleted')
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