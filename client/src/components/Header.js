import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/auth'
import toast from 'react-hot-toast'

const Header = () => {
    const [auth, setAuth] = useAuth()
    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: "",
        })
        localStorage.removeItem("auth")
        toast.success('User logout successfully')
    }
    return (
        <>
            <nav className="main-navbar ">
                <NavLink to="/" className="navbar-brand left-nav" >TASKMANAGER</NavLink>
                <div className="right-nav">
                    {auth.user ? (<>
                        <NavLink to='/task' className="nav-link" >Tasks</NavLink>
                        <NavLink to="/task/create-task" className="nav-link" >Create Task</NavLink>
                        <NavLink to="/" onClick={handleLogout} className="btn" >Logout</NavLink>
                    </>
                    ) : (<>
                        <NavLink to="/login" className=" btn" >Login</NavLink>
                        <NavLink to="/register" className="register btn" >Register</NavLink>
                    </>)}
                </div>

            </nav>
        </>
    )
}

export default Header