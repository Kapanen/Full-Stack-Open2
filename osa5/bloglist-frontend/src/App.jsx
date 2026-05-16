import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/toggle'
import BlogForm from './components/BlogForm'
import './index.css'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: '', type: '' })
  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {
      try {
        const user = JSON.parse(loggedUserJSON)
        if(user && user.token) {
          setUser(user)
          blogService.setToken(user.token)
        }
        else {
          window.localStorage.removeItem('loggedBlogappUser')
        }
      } catch {
        window.localStorage.removeItem('loggedBlogappUser')
      }
    }

    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()


    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))


      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

      setNotification({ message: `welcome ${user.name}`, type: 'success' })
      setTimeout(() => {
        setNotification({ message: '', type: '' })
      }, 5000)

    } catch {
      setNotification({ message: 'wrong username or password', type: 'error' })
      setTimeout(() => {
        setNotification({ message: '', type: '' })
      }, 5000)
    }
  }

  const handlelike = async (blog) => {
    try {
      const updateBlog ={
        user: blog.user.id || blog.user._id,
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url
      }

      const returnedBlog = await blogService.update(blog.id, updateBlog)
      setBlogs(prev => prev.map(b => b.id === blog.id ? {...returnedBlog, user: blog.user} : b))
    }catch {
      setNotification({ message: 'Error liking blog', type: 'error' })
      setTimeout(() => {
        setNotification({ message: '', type: '' })
      }, 5000)
    }
  }

  
  const handleaddBlog = async (blogObject) => {
  try {
    const returnedBlog = await blogService.create(blogObject)

    setBlogs(prev => prev.concat(returnedBlog))

    blogFormRef.current.toggleVisibility()

    setNotification({
      message: `a new blog ${blogObject.title} by ${blogObject.author} added`,
      type: 'success'
    })
    setTimeout(() => {
      setNotification({ message: '', type: '' })
    }, 5000)

  } catch {
    setNotification({
      message: 'Error adding blog',
      type: 'error'
    })
  } setTimeout(() => {
    setNotification({ message: '', type: '' })
  }, 5000)
}

  const handledeleteBlog = async (id) => {
    if (!user) return


    try {
      await blogService.remove(id)
      setBlogs(prev => prev.filter(blog => blog.id !== id))
      setNotification({ message: 'blog deleted', type: 'success' })
      setTimeout(() => {
        setNotification({ message: '', type: '' })
      }, 5000)
    } catch {
      setNotification({ message: 'Error deleting blog', type: 'error' })
      setTimeout(() => {
        setNotification({ message: '', type: '' })
      }, 5000)
    }
  }

  const loginForm = () => (
          <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>

        <div>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form> 
  )

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
  }

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h1>Bloglist</h1>
      <Notification notification={notification} />
      {!user && loginForm()}
      {user && <div><p>{user.name} logged in<button onClick={logout}>logout</button>
      </p>
      <Togglable buttonLabel="add blog" ref={blogFormRef}>
        <BlogForm
          addBlog={handleaddBlog}
        />
      </Togglable></div>}

      {user && (
        <>
        <h2>Blogs</h2>
        {sortedBlogs.map(blog =>
          <Blog key={blog.id} blog={blog} user={user} deleteBlog={handledeleteBlog} addlike={handlelike}/>
        )}
        </>
      )}
    </div>
  )
}

export default App