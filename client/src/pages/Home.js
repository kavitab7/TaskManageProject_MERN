import React from 'react'
import { NavLink } from 'react-router-dom'
const Home = () => {
    return (
        <>
            <div className="home-page">
                <div className="container-home">
                    <p className='text-center' >Ready to take control of your tasks and transform the way you work?
                    </p>
                    <NavLink to='/login' >  <button className='home-btn' role="button"><span className="text">Lets go!</span><span>Login</span></button></NavLink>
                </div>
            </div>
        </>
    )
}

export default Home