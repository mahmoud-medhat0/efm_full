import './ForgetPassword.css'
import forget from './../../photo/Forget.svg'
import logooos from './../../photo/logo2.svg'
import Telegram from './../../photo/telegram.png'
import LinkedIn from './../../photo/linkedin-logo.png'
import face from './../../photo/facebook.png'
import NavbarAuth from "../../Component/auth/NavbarAuth";
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/inertia-react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { route } from 'ziggy-js';
import toast from 'react-hot-toast';
import axios from 'axios'
// Define the schema if not already defined
const resetSchema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
});

const ForgetPassword = () => {
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(resetSchema),
      });
    const onSubmit = async (data: any) => {
        setIsLoading(true);
        try {
          const response = await axios.post(route('client.reset-password.post'), data);
          if (response.data.success) {
            toast.success(response.data.message, {
              position: "bottom-center",
              duration: 4000,
            });
          } else {
            toast.error(response.data.message, {
              position: "bottom-center",
              duration: 4000,
            });
          }
        } catch (error: any) {
            const message = error.response?.data.message || "An error occurred";
            toast.error(message, {
              position: "bottom-center",
              duration: 4000,
            });
        } finally {
          setIsLoading(false);
        }
      };
    
  return (
    <>
         
         <div className="login-container">
      <div className="login-left">
        <p>
          <span style={{ fontWeight: 'bold' }}>EFM</span> is the strongest company for making money online, offering unparalleled features and strong rewards that make it the best choice for everyone.
        </p>
        <p>Welcome back! Please login to your account.</p>
        <br/>
        
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <input type="email" placeholder="Email" {...register("email")} />
          <button type="submit" className="login-btn">ForgetPassword</button>
          <button type="button" className="signup-btn" onClick={()=>Inertia.visit(route('client.register'))}>Sign Up</button>
        </form>
        
        <div className="social-icons">
          <img src={Telegram} alt="Telegram Icon" className="icon" />
          <img src={face} alt="Facebook Icon" className="icon" />
          <img src={LinkedIn} alt="LinkedIn Icon" className="icon" />
          <span style={{textAlign:'center'}}>@EFM Hub</span>
        </div>
      </div>
      
      <div className="login-right">
        <NavbarAuth/>
        <img src={forget} alt="Referral" className="login-image" />
      </div>
    </div>


    
    </>
  )
}

export default ForgetPassword;
