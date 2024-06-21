import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Userlogin = () => {

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
      });
      const navigate = useNavigate();
    
      const changeHandle = (e) => {
        
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
        // console.log(loginData);
    };
      const submitHandle = async (e) => {
        // console.log(loginData);
        e.preventDefault();
        try {
          const response = await axios.post(
            "http://localhost:9000/userlogin",
            loginData
          )
          .then((res)=> {
            console.log(res.data);
            localStorage.setItem("token", res.data.token);
            navigate("/user")
            toast.success(res.data.message);
          })

          
        } catch (err) {
          toast.error(err.response.data.message);
        }
      };


      /*=== Add focus ===*/
function addfocus(e){
  let parent = e.target.parentNode.parentNode
  parent.classList.add("focus")
}

/*=== Remove focus ===*/
function remfocus(e){
  let parent = e.target.parentNode.parentNode
  if(e.target.value == ""){
      parent.classList.remove("focus")
  }
}
    
  return (
    // <div>
    //         <div className="flex items-center mb-5">
    //             <label for="Email" className="w-20 inline-block text-right mr-4 text-gray-500">Email</label>
    //             <input onChange={changeHandle} name="email" id="email" value={loginData.email} required type="email" placeholder="Email" className="border-b-2 border-gray-400 flex-1 py-2 placeholder-gray-300 outline-none focus:border-green-400"/>
    //         </div>

    //         <div className="flex items-center mb-5">
    //             <label for="Password" className="w-20 inline-block text-right mr-4 text-gray-500">Password</label>
    //             <input onChange={changeHandle} name="password" id="name" value={loginData.password} autoComplete="complete-password" required type="password" placeholder="Password" className="border-b-2 border-gray-400 flex-1 py-2 placeholder-gray-300 outline-none focus:border-green-400"/>
    //         </div>

            

            
    //         <div className="text-right">
    //             <button type="submit" onClick={submitHandle} className="py-3 px-8 bg-green-500 text-green-100 font-bold rounded">Submit</button>
    //         </div>
    // </div>




    <form action="" className="form__content">
                    <h1 className="form__title">Welcome</h1>

                    <div className="form__div form__div-one">
                        <div className="form__icon">
                            <i className='bx bx-user-circle'></i>
                        </div>

                        <div className="form__div-input">
                            <label for="" className="form__label">Email</label>
                            <input type="email" className="form__input" onFocus={addfocus} onBlur={remfocus} onChange={changeHandle} name="email" id="email" value={loginData.email} required />
                        </div>
                    </div>

                    <div className="form__div">
                        <div className="form__icon">
                            <i className='bx bx-lock' ></i>
                        </div>

                        <div className="form__div-input">
                            <label for="" className="form__label">Password</label>
                            <input type="password" className="form__input" onFocus={addfocus} onBlur={remfocus} onChange={changeHandle} name="password" id="name" value={loginData.password} autoComplete="complete-password" required />
                        </div>
                    </div>
                    <a href="#" className="form__forgot">Forgot Password?</a>

                    <input type="submit" onClick={submitHandle} className="form__button" value="Login" />

                    <p className="form__para">Don't have an Acount! <Link to="/user-signup" className="form__link">Sign up</Link></p>

                    {/* <div className="form__social">
                        <span className="form__social-text">Our login with</span>

                        <a href="#" className="form__social-icon"><i className='bx bxl-facebook' ></i></a>
                        <a href="#" className="form__social-icon"><i className='bx bxl-google' ></i></a>
                        <a href="#" className="form__social-icon"><i className='bx bxl-instagram' ></i></a>
                    </div> */}
                </form>
    
  )
}

export default Userlogin