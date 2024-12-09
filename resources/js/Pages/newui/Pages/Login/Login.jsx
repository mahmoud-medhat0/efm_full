
import photo from "../../photo/login.svg";
import Telegram from "../../photo/telegram.png";
import face from "../../photo/facebook.png";
import LinkedIn from "../../photo/linkedin-logo.png";
import NavbarAuth from "../../Component/auth/NavbarAuth";
import { route } from 'ziggy-js';
import { Link } from '@inertiajs/inertia-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { Inertia } from '@inertiajs/inertia';
const onSubmit = async (data) => {
    try {
      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
      const { status, data: resData } = await axios.post(
        route('client.login.post'),
        data,
        {
          headers: {
            'X-CSRF-TOKEN': csrfToken
          }
        }
      );
      
      if (status === 200 || status === 201) {
        // Inertia.reload({ only: ['authed'] });
        toast.success("Login successful! Redirecting in 2 seconds...", {
          position: "bottom-center",
          duration: 4000,
        });
        setTimeout(() => {
          Inertia.get(route('client.dashboard.dashboard'));
        }, 2000);
      } else {
        throw new Error("Unexpected response status");
      }
    } catch (error) {
      console.error(error);
      let errorMessage = "An unexpected error occurred";
      
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data.message || error.message;
      }
      
      toast.error(`Login failed: ${errorMessage}`, {
        position: "bottom-center",
        duration: 3000,
      });
    } finally {
    }
  };
const Login = () => {
    const { register, handleSubmit } = useForm();

    return (
        <div className="login-container">
            <div className="login-left">
                <p>
                    <span style={{ fontStyle: "bold" }}>
                        <strong>EFM</strong>
                    </span>{" "}
                    is the strongest company for making money online, offering
                    unparalleled features and strong rewards that make it the
                    best choice for everyone.
                </p>
                <p>Welcome back! Please login to your account.</p>
                <br />

                <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" placeholder="Email" {...register("username")} className="login-inputemil" />
                    <div className="password-container">
                        <input type="password" placeholder="Password" {...register("password")} className="login-inputpassword" />
                    </div>
                    <div className="login-options">
                        <label>
                            <input type="checkbox" className="checkbox-login " />{" "}
                            Remember Me
                        </label>
                        <Link href={route('client.reset-password')}>Forgot Password?</Link>
                    </div>
                    <button type="submit" className="login-btn">
                        Login
                    </button>
                    <Link href={route('client.register')} className="signup-btn">
                        Sign Up
                    </Link>
                </form>
                <div className="login-social-icons">
                    <img src={Telegram} alt="face" className="login-icon" />
                    <img src={face} alt="face" className="login-icon" />
                    <img src={LinkedIn} alt="face" className="login-icon" />
                    <span>@EFM Hub</span>
                </div>
            </div>

            <div className="login-right">
                <NavbarAuth />
                <img src={photo} alt="Referral" className="login-image" />
            </div>
        </div>
    );
}

export default Login;
