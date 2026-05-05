const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const assert = require('node:assert')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'a', author: 'A', url: 'http://a.com', likes: 1,
  },
  {
    title: 'b', author: 'B', url: 'http://b.com', likes: 2,
  },
  {
    title: 'c', author: 'C', url: 'http://c.com', likes: 3,
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = initialBlogs.map(blog => new Blog(blog))
  await Promise.all(blogObjects.map(blog => blog.save()))
})

describe('get /api/blogs', () => {

    test('blogs are returned as json', async () => {
        await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('return correct amount of blogs', async () => {
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, initialBlogs.length)
    })

    test('blogs have id and not _id field', async () => {
        const response = await api.get('/api/blogs')
        response.body.forEach(blog => {
            assert.ok(blog.id)
            assert.strictEqual(blog._id, undefined)
        })
    })

    test('valid blog can be added and amount of blogs is increased', async () => {
        const newBlog = {
            title: 'd', author: 'D', url: 'http://d.com', likes: 4,
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, initialBlogs.length + 1)
    })

    test('if likes property is missing, it defaults to 0', async () => {
        const newBlog = {
            title: 'e', author: 'E', url: 'http://e.com',
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        const addedBlog = response.body.find(b => b.title === newBlog.title)
        assert.strictEqual(addedBlog.likes, 0)
    })

    test('if title or url properties are missing, response is 400 Bad Request', async () => {
        const blogsatart = await api.get('/api/blogs')
        const newBlogWithoutTitle = { author: 'F', url: 'http://f.com', likes: 5 }
        await api
            .post('/api/blogs')
            .send(newBlogWithoutTitle)
            .expect(400)

        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, blogsatart.body.length)

        const newBlogWithoutUrl = { title: 'g', author: 'G', likes: 6 }
        await api
            .post('/api/blogs')
            .send(newBlogWithoutUrl)
            .expect(400)

        const response2 = await api.get('/api/blogs')
        assert.strictEqual(response2.body.length, blogsatart.body.length)
    })

    test('deletation of a blog', async () => {
        const blogsatart = await helper.blogsInDb()
        const blogToDelete = blogsatart[0]  
        
        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, blogsatart.length - 1)
        const ids = blogsAtEnd.map(b => b.id)
        assert(!ids.includes(blogToDelete.id))
    })

    test('editing a blog', async () => {
        const blogsatart = await helper.blogsInDb()
        const blogToEdit = blogsatart[0]  
        const newBlogData = { title: 'edited', author: 'Edited', url: 'http://edited.com', likes: 10 }

        await api
            .put(`/api/blogs/${blogToEdit.id}`)
            .send(newBlogData)
            .expect(200)

        const blogsAtEnd = await helper.blogsInDb()
        const editedBlog = blogsAtEnd.find(b => b.id === blogToEdit.id)
        assert.strictEqual(editedBlog.title, newBlogData.title)
        assert.strictEqual(editedBlog.author, newBlogData.author)
        assert.strictEqual(editedBlog.url, newBlogData.url)
        assert.strictEqual(editedBlog.likes, newBlogData.likes)
    })
})
after(async () => {
  await mongoose.connection.close()
})