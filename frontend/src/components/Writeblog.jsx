import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Writeblog = (props) => {
    const navigate = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login')
        }
    }, [])

    const [blogContent, setBlogContent] = useState({});
    const [disabled, setDisabled] = useState(true);

    const handleChange = (e) => {
        setBlogContent({ ...blogContent, [e.target.name]: e.target.value })
        if (document.querySelector('#title').value.length < 5 || document.querySelector('#content').value.replace(/\s/g, '').length < 10) {
            setDisabled(true)
        } else {
            setDisabled(false)
        }
    }

    const createBlog = async (blog) => {
        setDisabled(true)
        const data = await fetch("https://quillquest-backend.vercel.app/blog/create", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify(blog)
        })

        const json = await data.json()
        try {
            if (json.success) {
                props.showAlert("Blog added succesfully", "success")
                document.getElementById('title').value = "";
                document.getElementById('content').value = "";
            } else if (!json.success) {
                props.showAlert(json.error, "danger")
            } else {
                props.showAlert("Something went wrong! Please try again later", "danger")
            }
        } catch (error) {
            props.showAlert("Something went wrong! Please try again later", "danger")
        }


        setDisabled(false)
    }

    const handleClick = async (e) => {
        e.preventDefault()
        await createBlog(blogContent)
    }

    return (
        <>
            <div className='container min-h-[60vh] mt-16'>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label font-outfit text-xl font-medium ml-1">Blog Title</label>
                    <input type="text" className="form-control" id="title" placeholder='Enter your title here (minimum: 5)...' name='title' onChange={handleChange} min="5" />

                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label font-outfit text-xl font-medium ml-1">Content</label>
                    <textarea className="form-control" id="content" placeholder='Enter your blog content here (minimum: 10)...' rows="10" name='content' onChange={handleChange}></textarea>
                </div>
                <button className="btn btn-primary" disabled={disabled} onClick={handleClick}>Upload</button>
            </div>
        </>
    )
}

export default Writeblog
