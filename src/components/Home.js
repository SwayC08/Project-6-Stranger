import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

const Home = (props) => {

    const[data, setData] = useState([]);
    const[myPosts, setMyPosts] = useState([]);
    const[myMess, setMyMess] = useState([]);

    const COHORT_NAME ='2301-FTB-MT-WEB-FT';
    const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;
    const tokenKey = localStorage.getItem("token");

    // Auth Check
    useEffect(()=> {
        if (localStorage.getItem("token")){
            props.setLoggedIn(true);
            fetchData();
            
        } else {
            props.setLoggedIn(false);
            console.log("No Token Exists");
        };
    }, [])

    async function fetchData(){
        try {
            const response = await fetch(`${BASE_URL}/users/me`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${tokenKey}`,
                }
            });    
            const transData = await response.json();
            console.log(transData);
            console.log(transData.data);
            setData(transData.data);
            setMyPosts(transData.data.posts);
            setMyMess(transData.data.messages);
        } catch(error){
            console.log(error);
        }
    }


    return(
        <div>
            <div>
                {
                    props.loggedIn ? (
                <div>
                    <h2>Welcome to Local Listings, { data.username }</h2>
                    <hr/>
                    <h4 >My Posts:</h4>
                    {
                        myPosts.length ? 
                        myPosts.map((onePost)=>{
                            return(
                                <div key={onePost._id} className='myPosts'>
                                    <div >
                                        Name: <Link to={`/${onePost._id}`}> { onePost.title }</Link>
                                        
                                    </div>
                                    <div>
                                        Created: { onePost.createdAt }
                                    </div>
                                    
                                </div>
                            )
                        })
                        : <div>No Data Available</div>
                    }
                    <div className="messageSection">
                        <h4>My Messages:</h4>
                        {
                            myMess.length ? myMess.map((oneMessage)=>{
                                return(
                                    <section key={oneMessage._id} className='myMess'>
                                        <div>From: { oneMessage.fromUser.username }</div>
                                        <div>Message: { oneMessage.content }</div>
                                        <div>
                                            Regarding this Post: 
                                            <Link to={`/${oneMessage.post._id}`}>{ oneMessage.post.title } </Link>
                                        </div>
                                    </section>
                                )
                            }): <div>No Data Available</div>
                        } 
                    </div>
                </div>
                ): 
                <div>
                    <h2>Please create an account or sign in, if you would like to post a new item.</h2>
                    <p>This site is dedicated to serving the local community.</p>
                    <p>You do not need an account to browse postings. </p>
                </div>
                }
            </div>
            <div>
            
            </div>
        </div>
    )
}

export default Home; 



