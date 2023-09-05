import React, { useState } from 'react'


const Writeblog = () => {
    const [blogContent, setBlogContent] = useState({});
    const [disabled, setDisabled] = useState(true);

    const handleChange = (e) => {
        setBlogContent({ ...blogContent, [e.target.name]: e.target.value })
        if (document.querySelector('#title').value.length < 5 || document.querySelector('#content').value.replace(/\s/g, '').length < 10) {
            setDisabled(true)
        }else{
            setDisabled(false)
        }
    }



    const handleClick = (e) => {
        e.preventDefault()
        console.log(blogContent)
    }

    return (
        <>
        <h1 className='text-6xl text-center text-emerald-700 font-josefins mt-5'>This page is under development!</h1>
        <div className='container mt-10 min-h-[60vh]'>
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
