import React, { useRef, useState } from 'react'
import "./Signup.css"
import googleLogo from "../../assets/gmail_logo.webp"
import emailLogo from "../../assets/email.avif"
import arrow from "../../assets/arrow.png"
import Circle from '../Circle'
import car3 from "../../assets/car3.png"
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Signup = () => {
    const [open, setOpen] = useState();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const userNameRef = useRef();
    const { update , signup , signInPopup } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    async function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Password do not match');
        }

        try{
            setError('');
            setLoading(true);
            await signup(emailRef.current.value , passwordRef.current.value);
            update(userNameRef.current.value);
            navigate("/search");
        } catch (error){
            console.log(error.message);
            setError('Failed to create an account');
        }
        setLoading(false);
    }
  return (
    <div className='signupContainer'>
        <Circle className = "circle1" top = "80vh" left= "25vh" backgroundColor="#FEB06Eff" />
        <Circle className = "circle2" top = "-100vh" right= "-50vh" backgroundColor="#FEB06Eff" />
        <div className="wrapper1">
        <img src={car3} alt="car" className='car3' />
        </div>
        <div className="wrapper2">
            <div className='formContainer'>
            <div className="overlay">
                <h1>Welcome</h1>
                <p>Let's get you started</p>
                <div className='google'>
                    <span onClick={() => signInPopup().then((result) => {
                        navigate('/search');
                    })}>
                        <img src={googleLogo} alt="google" />
                        <p>Signup using Google</p>
                    </span>
                </div>
                <div className= {"email"} onClick={() => setOpen(!open)}>
                    <span>
                        <img src={emailLogo} alt="email" />
                        <p>Signup with Email/password</p>
                    </span>
                    </div>
                </div>
                {open && 
                <div className='form'>

                    <img src={arrow} alt="back" className='arrow' onClick={() => setOpen(!open)} />
                    <span>
                        <img src={emailLogo} alt="email" />
                        <p>Signup with Email/password</p>
                    </span>
                    {error && <p className='error'>{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder='Username' ref = {userNameRef} />
                        <input type="email" placeholder = "Email" required ref = {emailRef} />
                        <input type="password" placeholder = "Password" required ref = {passwordRef} />
                        <input type="password" placeholder = "Confirm Password" required ref = {passwordConfirmRef} />
                        <button disabled = {loading}>Submit</button>
                    </form>
                <p>Already have an account? <Link to = "/">Login</Link></p>
                </div>
                }
                </div>
        </div>        
    </div>
  )
}

export default Signup