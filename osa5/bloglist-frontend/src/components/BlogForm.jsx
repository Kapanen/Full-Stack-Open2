import {useState} from 'react'

const BlogForm = ({ addBlog }) => {
    const [blogForm, setBlogForm] = useState({
        title: '',
        author: '',
        url: ''
    })


const handleChange = (event) => {
    setBlogForm({ ...blogForm, [event.target.name]: event.target.value })
  }

const handleSubmit = (event) => {
    event.preventDefault()
    addBlog({
        title: blogForm.title,
        author: blogForm.author,
        url: blogForm.url
    })
    setBlogForm({
        title: '',
        author: '',
        url: ''
    })
}

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
        title
        <input
          name="title"
          value={blogForm.title}
          onChange={handleChange}
        />
        </label>
      </div>

      <div>
        <label>
        author
        <input
          name="author"
          value={blogForm.author}
          onChange={handleChange}
        />
        </label>
      </div>

      <div>
        <label>
        url
        <input
          name="url"
          value={blogForm.url}
          onChange={handleChange}
        />
        </label>
      </div>

      <button type="submit">add blog</button>
    </form>
  )
}

export default BlogForm