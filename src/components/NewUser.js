import { useState } from "react"; 
import { useNavigate } from "react-router-dom";

const NewUser = () => {

    const [newUser, setNewUser] = useState([]);
    const [newPass, setNewPass] = useState([]); 

    const nav = useNavigate();

    const COHORT_NAME ='2301-ftb-mt-web-ft';
    const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

    async function newAccount(event){
        event.preventDefault();

        try {
            if(newUser.length < 5){
                alert("User Name is too short. 5 Character Minimum")
                return;
            } else if (newPass.length < 5){
                alert("Password is too short. 5 Character Minimum")
                return;
            }
            const response = await fetch(`${BASE_URL}/users/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user: {
                        username: newUser,
                        password: newPass
                    }
                })
            })
            const transData = await response.json();
            // console.log(transData);

            if (!transData.success){
                alert("New Account was not registered. Please try again.");
            } else {
                const tokenKey = transData.data.token;
                // console.log(tokenKey);
                localStorage.setItem("token", tokenKey);
                alert("New Account was successfully created.");
//reset form 
                setNewUser("")
                setNewPass("")
                nav("/Home")
            }
        } catch(error){
            console.log(error)
        }
    }

    return(
        <div>
            <h2>Create a New Account</h2>
            <form onSubmit={ newAccount }>
                <input 
                    type="text"
                    value={ newUser }
                    placeholder="New Username"
                    onChange={(event)=> setNewUser(event.target.value)}
                />
                <input 
                    type="text"
                    value={ newPass }
                    placeholder="New Password"
                    onChange={(event)=> setNewPass(event.target.value)}
                />
                <button type="submit" >Create Account</button>
            </form>
        </div>
    )   
}

export default NewUser;