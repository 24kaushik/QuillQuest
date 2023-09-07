import React, { useState } from 'react'
import { useNavigate, Link } from "react-router-dom";

const SignUp = (props) => {
  const [disabled, setDisabled] = useState(false);
  const [credentials, setCredentials] = useState({ name: "", username: '', password: '', cpassword: '' })
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setDisabled(true)
    const { name, username, password } = credentials
    const response = await fetch("https://quillquest-backend.vercel.app/auth/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, username, password })

    })
    const json = await response.json()

    if (json.success) {
      //save the authtoken and redirect
      localStorage.setItem('token', json.authToken)
      props.showAlert('Account created successfully!', "primary")
      setDisabled(false)
      navigate('/')
    } else if (!json.success) {
      props.showAlert(json.error, "danger")
      setDisabled(false)
    } else {
      props.showAlert("Something went wrong! Please try again later.", "danger")
      setDisabled(false)
    }
  }


  return (
    <div className='container'>
      <h1 className='mb-10 text-4xl font-bold'>Create an account.</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input required onChange={handleChange} type="text" value={credentials.name} className="form-control border-gray-300 border-solid" id="name" name='name' aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input required onChange={handleChange} type="text" value={credentials.username} className="form-control border-gray-300 border-solid" id="username" name='username' aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input required minLength='5' onChange={handleChange} type="password" value={credentials.password} className="form-control border-gray-300 border-solid" name='password' id="password" autoComplete='on'/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm password</label>
          <input required minLength='5' onChange={handleChange} type="password" value={credentials.cpassword} className="form-control border-gray-300 border-solid" name='cpassword' id="cpassword" autoComplete='on'/>
          <div id="emailHelp" style={{ height: 30 }} className="form-text">{credentials.password === credentials.cpassword ? "" : "Password and Confirm password does not match!"}</div>
        </div>
        <div id="emailHelp" className="form-text my-2">Already have an account? <Link to={'/login'} className='text-blue-600 underline'> Login now.</Link></div>
        <button type="submit" className="btn btn-primary bg-blue-600" disabled={credentials.password !== credentials.cpassword || disabled}>Submit</button>
      </form>
    </div>
  )
}

export default SignUp