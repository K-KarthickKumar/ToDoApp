import React, { useState,useEffect } from "react";
import './login.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
	const[user,setUser] = useState({email:"",password : ""});
	const navigate = useNavigate();
	const handleChange = (e) => {
		setUser(prev => ({...prev,[e.target.name] : e.target.value}));
	}

	// async function getWeatherData(location){
	// 	const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=aa9f05d0ff1d9d44cfc5570e6230ae13`;
	// 	const weatherData = await fetch(apiUrl).then((res) => res.json()).then((res) => {
			
	// 	})
	// }

	// useEffect(()=>{
	// 	navigator.geolocation.getCurrentPosition((position) => {
	// 		console.log(position.coords);
	// 		getWeatherData(position.coords);

	// 	})
	// },[]);

	const handleSubmit = () => {
		axios.post("http://localhost:5000/login",user)
		.then(result => {
			if(result.data === "Success"){
				alert("loggedIn Successfully")
				navigate("/home")
			}
			else{
				alert(result.data);
			}
		})
		.catch((err) =>{
			alert(err);
		})
	}

	return (
		<div className="image-container">
		        <div class="form-container">
			<p class="title">Login</p>
			
			<div class="form" >
				<div class="input-group">
					<label for="username">Username</label> 
					<input type="text" name="email" id="username" placeholder="" value={user.email} onChange={e => {handleChange(e)}} />
				</div>
				<div class="input-group">
					<label for="password">Password</label>
					<input type="password" name="password" id="password" placeholder="" value={user.password} onChange={e => {handleChange(e)}}/>
					<div class="forgot">
						<a rel="noopener noreferrer" href="#">Forgot Password ?</a>
					</div>
				</div>
				<button class="sign" onClick={e => {handleSubmit()}}>Sign in</button>
			</div>
			<p class="signup">Don't have an account?
				<a rel="noopener noreferrer" href="/signup" class="">Sign up</a>
			</p>
		</div>
		</div>
	)
}