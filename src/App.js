import React from 'react';
import Login from './components/Login';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Signup from './components/Signup';
import Admin from './components/Admin/Admin';
import Home from './components/Home/Home';
import Adminlogin from './components/Home/Adminlogin';
import Userlogin from './components/Home/Userlogin';
import Student from './components/Student/Student';
import Adminsignup from './components/Adminsignup';
import Addusers from './components/Admin/admincomponents/Addusers';
import Trainings from './components/Student/student_component/Trainings';
import Batches from './components/Admin/admincomponents/Batches';
import Dashboard from './components/Admin/admincomponents/Dashboard';
import Admintraining from './components/Admin/admincomponents/Admintraining';
import Trainers from './components/Admin/admincomponents/Trainers';
import Classform from './components/Student/student_component/Classform';
import Record from './components/Student/student_component/Record';
import ShowRecord from './components/Student/student_component/ShowRecord';
import AdminRecord from './components/Admin/admincomponents/AdminRecord';
import AdminShowRecord from './components/Admin/admincomponents/AdminShowRecord';
import User from './components/User/User';

function App() {

    const router= createBrowserRouter([
        {
          path: "/",
          element: <Home />,
          children:[
            {
              path: "/adminlogin",
              element: <Adminlogin />
            },
            {
              path: "/",
              element: <Userlogin />
            },
            {
              path : "/user-signup",
              element: <Signup />
            }
          ]
        },
        {
          path:"/admin",
          element:<Admin />,
          children: [
            {
              path: "/admin/",
              element: <Dashboard />
            },
            {
              path: "/admin/batches",
              element: <Batches />
            },
            {
              path: "/admin/trainings",
              element: <Admintraining />
            },
            {
              path: "/admin/trainers",
              element: <Trainers />
            },
            {
              path: "/admin/record",
              element: <AdminRecord />
            },
            {
              path: "/admin/showrecord",
              element: <AdminShowRecord />
            },
          ]
        },
        {
          path:"/student",
          element:<Student />,
          children: [
            {
              path: "/student/",
              element: <Trainings />
            },
            {
              path: "/student/classform",
              element: <Classform />
            },
            {
              path: "/student/record",
              element: <Record />
            },
            {
              path: "/student/showrecord",
              element: <ShowRecord />
            },
          ]
        },
        {
          path : "/user",
          element : <User />
        },
        // {
        //   path: "/tempregister",
        //   element:<Signup />
        // },
        {
          path: "/adminsignup",
          element:<Adminsignup />
        }

    ]);





  return (
    <RouterProvider router={router} />
  );
}

export default App;
