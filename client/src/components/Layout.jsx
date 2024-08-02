import React from 'react'
import "../styles/Layout.css"
import { adminMenu, userMenu } from '../Data/NavData'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { message, Badge } from "antd";


const Layout = ({ children }) => {

    // for active class
    const location = useLocation();
    const navigate = useNavigate();

    const { user } = useSelector(state => state.user);
    // console.log(user);

    // diff. list for admin and user
    // console.log(user?.isAdmin);

    const handleLogOut = () => {
        localStorage.clear();
        message.success("Logout Successful");
        navigate('/login');
    }

    const doctorMenu = [
        {
            name: 'Home',
            path: '/',
            icon: "fa-solid fa-house-chimney"
        },
        {
            name: 'Profile',
            path: `/doctor/profile/${user?._id}`,
            icon: "fa-solid fa-user"
        },
        {
            name: 'Appoint ments',
            path: '/doctor/appointments',
            icon: "fa-solid fa-calendar-check"
        },
        {
            name: 'BMI Calculator',
            path: '/bmi',
            icon: "fa-solid fa-weight-scale"
        },
        {
            name: 'Health and Fitness',
            path: '/health-articles',
            icon: "fa-solid fa-newspaper"
        },

    ]


    const SideBarMenu = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu;

    return (
        <>
            <div className='main'>
                <div className='layout'>
                    <div className='sidebar position-sticky'>
                        <div className="logo">
                            <h6>Doc App</h6>
                        </div>
                        <hr />
                        <div key={'logout-btn'} className="icon-link-hover fa-solid fa-right-from-bracket menu-item cursor-pointer btn" onClick={handleLogOut}>
                            <i className=""></i>
                            <span className='text-white fs-2'>Log Out</span>
                        </div>
                        <div className="menu">
                            {SideBarMenu.map((item) => {
                                const isActive = location.pathname === item.path
                                const path = item.path
                                return (

                                    <div key={item.name} className={`menu-item ${isActive ? "active" : ""}`}>
                                        <i className={item.icon}></i>
                                        <Link className='fs-6' key={path} to={path}>{item.name}</Link>
                                    </div>
                                )
                            })}

                        </div>

                    </div>
                    <div className='content'>
                        <div className="header">

                            <div className="header-content flex-d gap-5" style={{ cursor: 'pointer' }}>

                                <Badge count={user && user?.notifications.length} onClick={() => navigate('/getAllNotifications')}>
                                    <i className="fa-solid fa-envelope"></i>
                                </Badge>



                                {/* <Link to={`/profile`}>{user ? user.name : null}</Link> */}
                                <h6 className='mt-1'>{user ? user.name : null}</h6>

                            </div>
                        </div>
                        <div className="content-body">
                            {children}

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Layout