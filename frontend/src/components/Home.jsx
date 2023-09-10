import React from 'react'
import Blogs from './Blogs'


const Home = (props) => {
    return (
        <div>
            <div className='text-center text-6xl mb-5 mt-16 font-josefins font-bold'>Latest Blogs!</div>
            <Blogs showAlert={props.showAlert}/>
        </div>
    )
}

export default Home
