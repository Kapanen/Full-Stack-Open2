import { useState, useEffect, use } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import './index.css'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newurl, setUrl] = useState('')
  const [newauthor, setAuthor] = useState('')
  const [newtitle, setNewTitle] = useState('')
  const [notification, setNotification] = useState({ message: '', type: '' })

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
      } catch (error) {
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

  const handleaddBlog = async (event) => {

    event.preventDefault()
    if (!user) return

    const blogObject = {
      title: newtitle,
      author: newauthor,
      url: newurl
    }
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(prev => prev.concat(returnedBlog))
      setNotification({ message: `a new blog ${newtitle} by ${newauthor} added`, type: 'success' })
      setTimeout(() => {
        setNotification({ message: '', type: '' })
      }, 5000)
      setNewTitle('')
      setUrl('')
      setAuthor('')
    } catch (exception) {
      setNotification({ message: 'Error adding blog', type: 'error' })
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleBlogChange = (event) => {
    setNewTitle(event.target.value)
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


  const blogform = () => (
    <form onSubmit={handleaddBlog}>
      <div>
        title
        <input 
          value={newtitle}
          onChange={(e) => setNewTitle(e.target.value)} 
        />
      </div>

      <div>
        author
        <input 
          value={newauthor}
          onChange={(e) => setAuthor(e.target.value)} 
        />
      </div>

      <div>
        url
        <input 
          value={newurl}
          onChange={(e) => setUrl(e.target.value)} 
        />
      </div>
      <button type="submit">add blog</button>
    </form>
  )

  return (
    <div>
      <h1>Bloglist</h1>
      <Notification notification={notification} />
      {!user && loginForm()}
      {user && <div><p>{user.name} logged in<button onClick={logout}>logout</button></p>{blogform()}</div>}

      {user && (
        <>
        <h2>Blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
        </>
      )}
    </div>
  )
}

export default App