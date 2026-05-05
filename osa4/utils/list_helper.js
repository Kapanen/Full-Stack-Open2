const dummy = (blogs) => {
    return 1
}


//likes
const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

//favorite blog
const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    const favorite = blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)
    return {
        title: favorite.title,
        likes: favorite.likes
    }
}

//mostblogs by author
const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    const authorBlogs = blogs.reduce((blogs, blog) => {
        blogs[blog.author] = (blogs[blog.author] || 0) + 1
        return blogs
    }, {})

    let most = {author: null, blogs: 0}

    for (const author in authorBlogs) {
        if (authorBlogs[author] > most.blogs) {
            most = {author, blogs: authorBlogs[author]}
        }
    }
    return most
}

// most likes by author
const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    const authorLikes = blogs.reduce((likes, blog) => {
        likes[blog.author] = (likes[blog.author] || 0) + blog.likes
        return likes
    }, {})

    let most = {author: null, likes: 0}

    for (const author in authorLikes) {
        if (authorLikes[author] > most.likes) {
            most = {author, likes: authorLikes[author]}
        }
    }
    return most
}

// delete blog
const deleteBlog = (blogs, id) => {
    return blogs.filter(blog => blog.id !== id)

}

// edit blog
const editBlog = (blogs, id, newBlog) => {
    return blogs.map(blog => blog.id === id ? {...blog, ...newBlog} : blog)
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
    deleteBlog,
    editBlog
}