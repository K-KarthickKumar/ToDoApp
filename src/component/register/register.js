import react, { useState } from 'react';
import './register.css';
import axios from 'axios';
export default function Register(){

    const[user,setUser] = useState({
        "firstname" : "",
        "lastname" : "",
        "email" : "",
        "password" : ""
    })

    const handleChange=(e) => {
        setUser(prev => ({
        ...prev,
        [e.target.name] : e.target.value
    }))};

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/signup',user)
        .then(result => alert("user created successfuly"))
        .catch(err => console.log(err))
    }

    return(
        <div> 
        <div class="form" >
    <p class="title">Register </p>
    <p class="message">Signup now and get full access to our app. </p>
        <div class="flex">
        <label>
            <input class="input" type="text" name="firstname" placeholder="" required="" value={user.firstname} onChange={e=> handleChange(e)} />
            <span>Firstname</span>
        </label>

        <label>
            <input class="input" type="text" name="lastname" placeholder="" required="" value={user.lastname} onChange={e=> handleChange(e)} />
            <span>Lastname</span>
        </label>
    </div>  
            
    <label>
        <input class="input" type="email" placeholder="" name="email" required="" value={user.email} onChange={e=> handleChange(e)} />
        <span>Email</span>
    </label> 
        
    <label>
        <input class="input" type="password" placeholder="" name="password" required="" value={user.password} onChange={e=> handleChange(e)} />
        <span>Password</span>
    </label>
    {/* <label>
        <input class="input" type="password" placeholder="" required="" />
        <span>Confirm password</span>
    </label> */}
    <button class="submit" onClick={e=> {handleSubmit(e)}} >Submit</button>
    <p class="signin">Already have an acount ? <a href="/">Signin</a> </p>
</div>
</div>
    )
}