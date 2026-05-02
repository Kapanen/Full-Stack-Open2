const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')


describe('favorite blog', () => {
    const listWithOneBlog = [
        {
            title: "a",
            likes: 6
        }
    ],
    listWithMultipleBlogs = [
        {
            title: "a",
            likes: 6
        },
        {
            title: "b",
            likes: 8
        },
        {
            title: "c",
            likes: 3
        }
    ]
    test('when list has only one blog, returns that blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    assert.deepStrictEqual(result, {
        title: "a",
        likes: 6
    })
})

test('when list has multiple blogs, returns the blog with the most likes', () => {
    const result = listHelper.favoriteBlog(listWithMultipleBlogs)
    assert.deepStrictEqual(result, {
        title: "b",
        likes: 8
    })
})

})

