const dummy = (blogs) => {
    return 1
}


//likes
const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}