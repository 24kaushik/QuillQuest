import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";

const Login = (props) => {
    const [disabled, setDisabled] = useState(false);
    const [credentials, setCredentials] = useState({ username: '', password: '' })
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setDisabled(true)
        const response = await fetch("https://quillquest-backend.vercel.app/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)

        })
        const json = await response.json()

        try {
            if (json.success) {
                //save the authtoken and redirect
                localStorage.setItem('token', json.authToken)
                setDisabled(false)
                props.showAlert("Logged in succesfully", "success")
                navigate('/')
            } else if (!json.success) {
                props.showAlert(json.error, "danger")
                setDisabled(false)
            } else {
                props.showAlert("Something went wrong! Please try again later.")
                setDisabled(false)
            }
        } catch (error) {
            props.showAlert("Something went wrong! Please try again later.")
            setDisabled(false)
        }
    }

    return (
        <div className='container pt-3 mt-16'>
            <h1 className='text-4xl sm:text-5xl mb-10 font-bold'>Login to write blogs.</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" value={credentials.username} onChange={handleChange} name="username" className="form-control border-solid border-gray-300" id="username" aria-describedby="usernameHelp" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" value={credentials.password} onChange={handleChange} autoComplete="on" name="password" className="form-control border-solid border-gray-300" id="password" required />
                </div>
                <div id="emailHelp" className="form-text my-2">Dont have an account? <Link className='text-blue-600 underline' to={'/signup'}>Create one.</Link></div>
                <button type="submit" className="btn btn-primary bg-blue-600 mt-3" disabled={disabled}>Submit</button>
            </form>
        </div>
    )
}

export default Login