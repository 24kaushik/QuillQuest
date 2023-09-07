import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Loader from './Loader'
import Error from './Error';

const ReadBlog = (props) => {
    const [found, setFound] = useState(true);
    const [blog, setBlog] = useState(null);
    const [loading, setloading] = useState(true);
    const { id } = useParams();

    const fetchblog = async (blogId) => {
        const response = await fetch(`https://quillquest-backend.vercel.app/blog/getblog/${id}`)
        const data = await response.json()
        try {
          if (data.success) {
            setloading(false)
            setBlog(data.blog)
        } else if (!data.success) {
            setloading(false)
            setFound(false)
        } else {
            props.showAlert("Something went wrong! Please try again later.", "danger")
            setFound(false)
            setloading(false)
        }  
        } catch (error) {
            props.showAlert("Something went wrong! Please try again later.", "danger")
            setFound(false)
            setloading(false) 
        }
        
    }

    useEffect(() => {
        fetchblog(id)
    }, [])

    return (<div className='container'>
        <Link to={`/`} className="my-3 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <svg className="w-3.5 h-3.5 mr-2 rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
            Back to Home
        </Link>
        {loading && <Loader />}
        {!found && <Error text="The blog you requested was not found!" />}
        {blog && <div className='container'>
            <h1 className='text-5xl text-center font-medium mt-3 mb-5 '>{blog.title}</h1>
            <p className='text-xl text-gray-700'>{blog.content}</p>
            <p className='text-right text-2xl mt-5 mr-5 text-gray-600 font-bold'>Author: {blog.author}</p>
        </div>}
    </div>
    )
}



export default ReadBlog
