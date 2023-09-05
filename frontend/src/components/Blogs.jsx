import React, { useEffect, useState } from 'react'
import Blogcard from './Blogcard'


const Blogs = () => {

  const [blogs, setBlogs] = useState([]);


  const getNotes = async () => {
    const response = await fetch(`https://quillquest-backend.vercel.app/blog/fetchall`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const data = await response.json()
    if (data.success) {
      setBlogs(data.blogs)
    } else {
      console.log("Success false while fetching all blogs")
    }
  }

  useEffect(() => {
    getNotes()
  }, [])
  useEffect(() => {
    console.log(blogs)
  }, [blogs])


  return (
    <div className='flex flex-wrap gap-4 justify-center'>

      {blogs.map(e => <Blogcard title={e.title} content={e.content} author={e.author} id={e._id} />)}



    </div>
  )
}

export default Blogs
