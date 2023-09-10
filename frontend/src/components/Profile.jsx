import React, { useEffect, useRef, useState } from 'react'
import UserIMG from '../assets/user.png'
import { useNavigate } from 'react-router-dom'
import Error from './Error'
import Loader from './Loader'
import UserBlogcard from './UserBlogcard'

const Profile = props => {
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const [errorCmp, setErrorCmp] = useState();
  const [blogs, setBlogs] = useState();

  const handleLogout = (e) => {
    localStorage.removeItem('token');
    navigate('/')
    console.log("object")
    window.location.reload();
  }

  const getUser = async () => {
    try {
      let response = await fetch('https://quillquest-backend.vercel.app/auth/getuser', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token")
        }
      })

      const data = await response.json()
      if (data.success) {
        setUser({ name: data.user.name, username: data.user.username })

        getBlogs()
        setLoaded(true);
      } else if (!data.success) {
        setLoaded(true);
        setErrorCmp(data.error)
      } else {
        setLoaded(true);
        setErrorCmp("Some unexpected error occured! Please try refreshing!")
      }
    } catch (error) {
      setLoaded(true);
      setErrorCmp("Some unexpected error occured!")
    }
  }

  const getBlogs = async () => {
    try {
      const response = await fetch("https://quillquest-backend.vercel.app/blog/getuserblog", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token")
        }
      })
      const data = await response.json();
      if (data.success) {
        setBlogs(data.blogs.reverse())
      } else if (!data.success) {
        setErrorCmp("No blogs found!")
      } else {
        setErrorCmp("Something went wrong while loading blogs!")
      }

    } catch (error) {
      setErrorCmp("Some unexpected error occured!")
      console.log(error)
    }

  }

  //Edit blog
  const showModal = useRef()
  const closeModal = useRef()
  const [newBlog, setNewBlog] = useState({ title: "", content: "" })
  const [currentBlog, setCurrentBlog] = useState()
  const [disabledSave, setDisabledSave] = useState(true);
  const show = (prevContent, id) => {
    setNewBlog(prevContent)
    setCurrentBlog(id)
    showModal.current.click()
    document.getElementById('editTitle').value = prevContent.title;
    document.getElementById('editContent').value = prevContent.content;
  }

  const handleChange = (e) => {
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value })
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setDisabledSave(true)
    try {
      let response = await fetch(`https://quillquest-backend.vercel.app/blog/update/${currentBlog}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify(newBlog)
      })
      let data = await response.json()
      if (data.success) {
        closeModal.current.click()
        getBlogs()
      } else if (!data.success) {
        closeModal.current.click()
        props.showAlert(data.error, "danger")
      }
    } catch (error) {
      closeModal.current.click()
      props.showAlert("Some unexpected error occured!")
      console.log(error)
    }
  }

  //Delete blog.
  const deleteBlog = async (id) => {
    const response = await fetch(`https://quillquest-backend.vercel.app/blog/delete/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    })

    const data = await response.json()

    if (data.success) {
      getBlogs()
      props.showAlert("Blog deleted successfully!", "success")
    } else if (!data.success) {
      props.showAlert(data.error, "danger")
    } else {
      props.showAlert("Something went wrong!", "danger")
    }
  }

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/')
    } else {
      getUser()
    }

  }, [])

  useEffect(() => {
    let titleIsValid = false;
    let contentIsValid = false;

    if (newBlog.title && newBlog.title.length > 4 && newBlog.title.length < 100) {
      titleIsValid = true;
    }

    if (newBlog.content && newBlog.content.length > 10 && newBlog.content.length < 4000) {
      contentIsValid = true;
    }

    setDisabledSave(!(titleIsValid && contentIsValid));
  }, [newBlog]);

  return (
    <div className='container'>
      {!loaded && <Loader />}
      {user && <><h1 className='text-center text-8xl font-josefins mb-4'>Profile</h1>
        <img src={UserIMG} className='w-36 m-auto mb-2' alt="" />
        <h4 className='text-center text-4xl font-bold'>{user.name}</h4>
        <h4 className='text-center text-xl -mt-1 text-gray-500 -ml-2 font-bold'>@{user.username}</h4>
        <button className='btn btn-danger my-2 mx-auto block' onClick={handleLogout}>Logout</button>
        <h2 className='text-5xl font-josefins mt-14 ml-3'>User blogs:</h2></>}
      {errorCmp && <Error text={errorCmp} />}
      {user && blogs && <div className='flex mt-4 flex-wrap gap-4 justify-center'>{blogs.map(e => <UserBlogcard show={show} deleteBlog={deleteBlog} title={e.title} content={e.content} author={e.author} id={e._id} key={e._id} />)}</div>}
      {user && blogs && <div>
        {/* <!-- Button trigger modal --> */}
        <button ref={showModal} type="button" className="btn btn-primary hidden" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Launch demo modal
        </button>

        {/* <!-- Modal --> */}
        <form>
          <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Blog</h1>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
                    <input name="title" onChange={handleChange} type="text" className="form-control" id="editTitle" minLength={4} maxLength={100} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Content</label>
                    <textarea name="content" onChange={handleChange} className="form-control text-sm" rows={10} id="editContent" minLength={10} maxLength={4000} required></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary bg-gray-500" data-bs-dismiss="modal" ref={closeModal}>Close</button>
                  <button type="submit" className="btn btn-primary bg-blue-600" onClick={handleSave} disabled={disabledSave}>Save changes</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>}
    </div>
  )
}


export default Profile
