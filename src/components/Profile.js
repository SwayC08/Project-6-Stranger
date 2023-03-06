import { useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";

const Profile = (props) => {
    // console.log(props);
    const { posts, setPosts, fetchPosts} = props;
    const [createStat, setCreateStat] = useState(false);
    const [createTitle, setCreateTitle ] = useState("");
    const [createDesc, setCreateDesc ] = useState("");
    const [createPrice, setCreatePrice ] = useState("");

// toggle Create form (button) 
    function toggleCreate() {
        setCreateStat(!createStat)
    };

    const nav = useNavigate();

// Auth Check
    useEffect(()=> {
        if (localStorage.getItem("token")){
            props.setLoggedIn(true);
            fetchPosts();
            // console.log("I was ran in profile");
        } else {
            props.setLoggedIn(false);
            console.log("No Token Exists");
        };
    }, []);

// Create request
    const createReq = async (event) => {
        event.preventDefault();

    const COHORT_NAME ='2301-FTB-MT-WEB-FT';
    const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;
    const tokenKey = localStorage.getItem("token");

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
            const transData = await response.json();
            // console.log(transData);

            if (!transData.success){
                alert("Post was not created. Please try again. ");
            } else {
//spread op (clone) + new post 
                props.setPosts([...props.posts, transData.data]);
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

    return(
        <div className='Profile'>
            
            <div>My Profile</div>
            <div>
                <button onClick={ toggleCreate }>Create New Post</button>
                {
                    createStat ? (
                        <form onSubmit={ createReq } className='createForm'>
                            {/* <h5 className='createTitle'>Create New Post</h5> */}
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
        </div>
    );
}

export default Profile;