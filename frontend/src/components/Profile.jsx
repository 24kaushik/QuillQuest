import React, { useEffect, useState } from 'react'
import UserIMG from '../assets/user.png'
import { useNavigate } from 'react-router-dom'
import Error from './Error'
import Loader from './Loader'
import Blogcard from './Blogcard'

const Profile = props => {
    const [loaded, setLoaded] = useState(false);
    const [user, setUser] = useState();
    const navigate = useNavigate();
    const [errorCmp, setErrorCmp] = useState();
    const [blogs, setBlogs] = useState();

    const handleLogout = (e) => {
        localStorage.removeItem('token');
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
            const response = await fetch("http://localhost:6969/blog/getuserblog", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token")
                }
            })
            const data = await response.json();
            if (data.success) {
                setBlogs(data.blogs)
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

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login')
        } else {
            getUser()
        }

    }, [])

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
            {user && blogs && <div className='flex mt-4 flex-wrap gap-4 justify-center'>{blogs.map(e => <Blogcard title={e.title} content={e.content} author={e.author} id={e._id} key={e._id} />)}</div>}
        </div>
    )
}


export default Profile
