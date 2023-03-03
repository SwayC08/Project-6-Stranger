import { useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";

const Profile = (props) => {
    console.log(props);
    const [createStat, setCreateStat] = useState(false);
    const [createTitle, setCreateTitle ] = useState("");
    const [createDesc, setCreateDesc ] = useState("");
    const [createPrice, setCreatePrice ] = useState("");

// toggle Create form (button) 
    function togCreateFrmFnc() {
        setCreateStat(!createStat)
    };

    const nav = useNavigate();

// Auth Check
    useEffect(()=> {
        if (localStorage.getItem("token")){
            props.setLoggedIn(true);
        } else {
            props.setLoggedIn(false);
            console.log("No Token Exists");
        };
    }, []);

    const COHORT_NAME ='2301-FTB-MT-WEB-FT';
    const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;
    const tokenKey = localStorage.getItem("token");

// Create request
    const createReqFnc = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${BASE_URL}/posts`, {
                method: "POST",
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenKey}`
                },
                body: JSON.stringify({
                post: {
                    title: createTitle,
                    description: createDesc,
                    price: createPrice,
                    willDeliver: true
                }
                })
            });
            const translatedData = await response.json();
            console.log(translatedData);

            if (!translatedData.success){
                alert("Post was not created. Please try again. ");
            } else {
//spread op (clone) + new post 
                props.setPosts([...props.posts, translatedData.data]);
                // props.setPosts(translatedData);
                alert("Post was successfully created.");
// reset form
                setCreateStat(false)
                setCreateTitle("")
                setCreateDesc("")
                setCreatePrice("")
// nav to posts
                nav("/")
            }
        } catch (error){
            console.log(error);
        }
    };
    // }, [])

    return(
        <div>
            <div>My Profile</div>
            <div>
                <button onClick={ togCreateFrmFnc }>Create New Post</button>
                {
                    createStat ? (
                        <form onSubmit={ createReqFnc }>
                            <h3>Create New Post</h3>
                            <input 
                                type="text"
                                value={ createTitle }
                                onChange={(event)=>{
                                    // console.log(event.target.value);
                                    setCreateTitle(event.target.value);
                                }}
                                placeholder="Post Name"
                            />
                            <textarea 
                                type="text"
                                value={ createDesc } 
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
                                value={ createPrice } 
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
            <div>
            </div>
        </div>
    );
}

export default Profile;