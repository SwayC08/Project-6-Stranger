import { useState } from "react"; 
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [loginUser, setLoginUser] = useState("");
    const [loginPass, setLoginPass] = useState("");

    const nav = useNavigate();

    const COHORT_NAME ='2301-ftb-mt-web-ft';
    const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

    async function logIn(event){
        event.preventDefault();

        try {
            if(loginUser.length < 5){
                alert("User Name is too short. 5 Character Minimum")
                return;
            } else if (loginPass.length < 5){
                alert("Password is too short. 5 Character Minimum")
                return;
            };
            const response = await fetch(`${BASE_URL}/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user: {
                        username: loginUser,
                        password: loginPass
                    }
                })
            });
            const transData = await response.json();

            if (!transData.success){
                alert("Login was unsuccessful. Please try again. ");
            } else {
                const tokenKey = transData.data.token;
                // console.log(tokenKey);
                localStorage.setItem("token", tokenKey);
                alert("Login was successfully.");
// reset form
                setLoginUser("")
                setLoginPass("")
                nav("/Home")
            }
        } catch(error){
            console.log(error)
        }
    }

    return(
        <div>
            <h2>Sign In</h2>
            <form onSubmit={ logIn }>
                <input 
                    type="text"
                    placeholder="Username"
                    onChange={(event)=> setLoginUser(event.target.value)}
                />
                <input 
                    type="text"
                    placeholder="Password"
                    onChange={(event)=> setLoginPass(event.target.value)}
                />
                <button type="submit" >Login</button>
            </form>
        </div>
    )
}

export default Login; 