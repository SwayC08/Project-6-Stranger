import { useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";

const Profile = (props) => {
    const [createStat, setCreateStat] = useState(false);
    const [createTitle, setCreateTitle ] = useState("");
    const [createDesc, setCreateDesc ] = useState("");
    const [createPrice, setCreatePrice ] = useState("");

// toggle Create form  button 
    function togCreateFrmFnc() {
        setCreateStat(!createStat)
    };

    const nav = useNavigate();

    const COHORT_NAME ='2301-FTB-MT-WEB-FT';
    const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;
    console.log(localStorage.getItem("token"));

//     useEffect(()=> {
// // Auth Check
//         if (localStorage.getItem("token")){
//             // console.log(localStorage.getItem("token"));
//             props.setLoggedIn(true);
//             // createReqFnc();
//         } else {
//             props.setLoggedIn(false);
//             console.log("No Token Exists");
//         };

// Create request 
        async function createReqFnc(event){
            event.preventDefault();
            try {
                const response = await fetch(`${BASE_URL}/posts`, {
                        method: "POST",
                        header: {
                            'Content-type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem("token")}`,
                        },
                        body: JSON.stringify({
                            post: {
                                title: createTitle,
                                description: createDesc,
                                price: createPrice,
                                willDeliver: true
                            }   
                        })
                    }
                ); 
                const transData = await response.json();
                console.log(transData);

                if (!transData.success){
                    alert("Post was not created. Please try again. ");
                } else {
                    props.setPosts(transData);
                    alert("Post was successfully created.");
                    nav("/")
                }
            } catch (error){
                console.log(error);
            }
        };
    // }, )

    return(
        <div>
            <div>My Profile</div>
            <div>
                <button onClick={ togCreateFrmFnc }>Create New Post</button>
                {
                    createStat ? (
                        <form onSubmit={createReqFnc}>
                            <h3>Create New Post</h3>
                            <input 
                                type="text" 
                                onChange={(event)=>{
                                    // console.log(event.target.value);
                                    setCreateTitle(event.target.value);
                                }}
                                placeholder="Post Name"
                            />
                            <textarea 
                                type="text" 
                                rows="4" 
                                cols="75"
                                placeholder="Post Description"
                                onChange={(event)=>{
                                    // console.log(event.target.value);
                                    setCreateDesc(event.target.value);
                                }}
                            />
                            <input 
                                type="text" 
                                onChange={(event)=>{
                                    // console.log(event.target.value);
                                    setCreatePrice(event.target.value);
                                }}
                                placeholder="Price"
                            />
                            <button type="submit">Submit</button>
                        </form>
                    ): ""
                }
            </div>
            <div></div>
        </div>
    );
}

export default Profile;