import { useState } from 'react'
import './blog.css'

const Blog = ({ blog, user, deleteBlog, addlike }) => {
  const [expanded, setExpanded] = useState(false)

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${blog.title}?`)) {
      deleteBlog(blog.id)
    }
  }

  const canDelete = blog.user && blog.user.username === user.username

  const toggleView = () => {
    setExpanded(!expanded)
  }

  


return (
  <div className="blog">
    <div className="blog-header">
      <span className="title">{blog.title}</span>
      <span className="author">{blog.author}</span>

      <button onClick={toggleView}>
        {expanded ? 'hide' : 'view'}
      </button>

      {canDelete && (
        <button onClick={handleDelete}>delete</button>
      )}
    </div>

    {expanded && (
      <div className="blog-details">
        <div>{blog.url}</div>
        <div>
          {blog.likes}
          <button onClick={() => addlike(blog)}>like</button>
        </div>
        <div>{blog.user.name}</div>
      </div>
    )}
  </div>
)
}
export default Blog