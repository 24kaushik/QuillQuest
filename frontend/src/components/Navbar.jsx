import React from 'react';
import { Link } from 'react-router-dom'
import UserIMG from "../assets/user.png"

const Navbar = () => {
    
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
                <div className="container-fluid">
                    <Link className="navbar-brand font-josefins" to="/">QuillQuest</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link font-outfit" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link font-outfit" to="/write">Write Blog</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('token')? <><Link to='/login'><button className="btn btn-outline-primary font-outfit">Login</button></Link>
                        <Link to="/signup"><button className="btn btn-primary mx-3 font-outfit">Sign up</button></Link></>: <><Link to="/profile"><img style={{width:"2.5rem", marginRight:"1em", cursor:"pointer"}} src={UserIMG} alt="" /></Link></>}
                        
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
