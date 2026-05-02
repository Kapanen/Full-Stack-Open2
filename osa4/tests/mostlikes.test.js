const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')


describe ('most likes by author', () => {
    const listWithOneauthor = [
        { author: 'a', likes: 5 }
    ]
    const listWithMultipleAuthors = [
        { author: 'a', likes: 5 },
        { author: 'b', likes: 10 },
        { author: 'a', likes: 3 },
        { author: 'c', likes: 10 }
    ]

    test('when list has only one author, returns that author with their total likes', () => {
        const result = listHelper.mostLikes(listWithOneauthor)
        assert.deepStrictEqual(result, { author: 'a', likes: 5 })
    })

    test('when list has multiple authors, returns the author with the most likes', () => {
        const result = listHelper.mostLikes(listWithMultipleAuthors)
        assert.deepStrictEqual(result, { author: 'b', likes: 10 })
    })
})