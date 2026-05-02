const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe ('most blogs by author', () => {
    const listWithOneauthor = [
        { author: "a" },
        { author: "a" },
        { author: "a" }
    ]
    const listWithMultipleAuthors = [
        { author: "a" },
        { author: "a" },
        { author: "b" },
        { author: "b" },
        { author: "b" },
        { author: "b" },
        { author: "c" }
    ]

    test('when list has only one author, returns that author', () => {
        const result = listHelper.mostBlogs(listWithOneauthor)
        assert.deepStrictEqual(result, { author: "a", blogs: 3 })
})

    test('when list has multiple authors, returns the author with the most blogs', () => {
        const result = listHelper.mostBlogs(listWithMultipleAuthors)
        assert.deepStrictEqual(result, { author: "b", blogs: 4 })
})

})

