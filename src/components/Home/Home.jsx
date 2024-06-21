import React from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import './Home.css';
import logo from '../../assets/authentication.svg';

const Home = () => {
  return (
//     <div class="bg-green-200 min-h-screen flex items-center ">
//     <div class="bg-white p-10 pt-5 md:w-2/3 lg:w-1/2 mx-auto rounded">
//         <form action="">
//         <div class="flex justify-center gap-5">
//           <NavLink to="/" className={({isActive}) => `text-2xl font-semibold ${isActive?'text-sky-500' : 'text-black'}`}>User</NavLink>
//           <NavLink to="/adminlogin" className={({isActive}) => `text-2xl font-semibold ${isActive?'text-sky-500' : 'text-black'}`}>Admin</NavLink>         
//         </div>
//             <Outlet />
//         </form>
//     </div>
// </div>
<div class="l-form">
            <div class="shape1"></div>
            <div class="shape2"></div>

            <div class="form">
                <img src={logo} alt="" class="form__img" />

                <Outlet />
            </div>

        </div>
  )
}

export default Home