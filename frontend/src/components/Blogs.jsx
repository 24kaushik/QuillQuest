import React, { useEffect, useState } from 'react'
import Blogcard from './Blogcard'
import Loader from "./Loader"


const Blogs = (props) => {

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);


  const getNotes = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://quillquest-backend.vercel.app/blog/fetchall`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      const data = await response.json()
      if (data.success) {
        setBlogs(data.blogs.reverse())
        setLoading(false)
      } else {
        alert("failed fetching all blogs")
      }
    } catch (error) {
      console.log(error)
      alert('Failed to fetch Blogs. Please try refreshing.')
    }

  }

  useEffect(() => {
    getNotes()
  }, [])

  return (
    <div className='flex flex-wrap gap-4 justify-center'>
      {loading && <Loader />}
      {blogs.map(e => <Blogcard title={e.title} content={e.content} author={e.author} key={e._id} id={e._id} />)}
    </div>
  )
}

export default Blogs
