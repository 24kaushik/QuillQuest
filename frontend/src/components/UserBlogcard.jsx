import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const UserBlogcard = (props) => {
    const { title, content, author, id } = props;
    const handleEdit = () => {
        props.show({title, content}, id)
    }

    return (
        <>

            <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title.length > 70 ? title.slice(0, 69) + "..." : title}</h5>
                <p className="mb-2 font-normal text-gray-700 dark:text-gray-400">{content.length > 380 ? content.slice(0, 379) + "..." : content}</p>
                <p className='text-gray-500 font-outfit font-semibold mb-2 ml-1'>Author: {author}</p>
                <div className='flex justify-between'>
                    <Link to={`/blog/${id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Read more
                        <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </Link>
                    <div>
                        <button className='btn btn-md btn-warning text-white mx-1' onClick={handleEdit}>Edit</button>
                        <button className='btn btn-md btn-danger text-white mx-1'>Delete</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserBlogcard
