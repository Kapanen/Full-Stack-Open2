import { render, screen } from "@testing-library/react";
import Blog from "../components/Blog";
import { expect, test } from "vitest";
import userEvent from "@testing-library/user-event";
import {  vi } from 'vitest'
import BlogForm from "../components/BlogForm";

test ('reders title and author', () => {
  const blog = {
    title: 'Test Blog',
    author: 'tester',
    url: 'http://testblog.com',
    likes: 5,
    user: { username: 'testuser'}
  }
  render(<Blog blog={blog} user={{ username: 'testuser' }} />)

  expect(screen.getByText('Test Blog')).toBeInTheDocument()
  expect(screen.getByText('tester')).toBeInTheDocument()
})

test('renders url and likes when view button is clicked', async () => {
    const blog = {
    title: 'Test Blog',
    author: 'tester',
    url: 'http://testblog.com',
    likes: 5,
    user: { name: 'testuser'}
  }
  render(<Blog blog={blog} user={{ name: 'testuser' }} />)

  const viewButton = screen.getByText('view')
  await userEvent.click(viewButton)

  expect(screen.getByText('http://testblog.com')).toBeInTheDocument()
  expect(screen.getByText('5')).toBeInTheDocument()
  expect(screen.getByText('testuser')).toBeInTheDocument()
})

test('when like is pressed twice its called twice' , async () => {
  const blog = {
    title: 'Test Blog',
    author: 'tester',
    url: 'http://testblog.com',
    likes: 5,
    user: { name: 'testuser'}
  }

  const mockHandler = vi.fn()
  const user = userEvent.setup()

  render(<Blog blog={blog} user={{ name: 'testuser' }} addlike={mockHandler} />)
  const viewButton = screen.getByText('view')
  await userEvent.click(viewButton) 

  const likeButton = screen.getByText('like')

  const clicks = 2
  for (let i = 0; i < clicks; i++) {
    await user.click(likeButton)
  }

  expect(mockHandler).toHaveBeenCalledTimes(clicks)
})

test('creating a blog calls the event handler once with correct details', async () => {
  const mockHandler = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm addBlog={mockHandler} />)

  const titleInput = screen.getByRole('textbox', { name: /title/i })
  const authorInput = screen.getByRole('textbox', { name: /author/i })
  const urlInput = screen.getByRole('textbox', { name: /url/i })
  const submitButton = screen.getByText('add blog')

  await user.type(titleInput, 'Test Blog')
  await user.type(authorInput, 'Test Author')
  await user.type(urlInput, 'http://testblog.com')

  await user.click(submitButton)

  expect(mockHandler).toHaveBeenCalledTimes(1)
  expect(mockHandler).toHaveBeenCalledWith({
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://testblog.com'
  })

})