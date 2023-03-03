import { useEffect, useState } from 'react';

const Home = (props) => {

    const[data, setData] = useState([]);

    const COHORT_NAME ='2301-FTB-MT-WEB-FT';
    const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;
    const tokenKey = localStorage.getItem("token");

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
        } catch(error){
            console.log(error);
        }
    }
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


    console.log(typeof data);
    // let userPosts = data.posts;
    console.log(data.posts);
    // let userMessage = data.messages;
    // console.log(data.messages);

    return(
        <div>
            <div>
                {
                    props.loggedIn ? (
                <div>
                    <h2>Welcome to Local Listings, { data.username }</h2>
                    {
                        // data.post.length ? 
                        // userPosts.map((onePost)=>{
                        //     return(
                        //         <div>
                        //             <div>Post: { onePost.title }</div>
                        //         </div>
                        //     )
                        // })
                        // : <div>No Data Available</div>
                    }
                    {/* {
                        userMessage.length ? userMessage.map((oneMessage)=>{
                            return(
                                <div>
                                    
                                    <div>MSG: { oneMessage.fromUser.username }</div>
                                </div>
                            )
                        }): <div>No Data Available</div>
                    }  */}
                </div>
                ): 
                // <p>This site is dedicated to serving the local community.</p>
                // <p>You do not need an account to browse postings. </p>
                <h2>Please create an account or sign in, if you would like to post a new item.</h2>
                }
            </div>
            <div>
            
            </div>
        </div>
    )
}

export default Home; 


// <div>
// <h4>My Posts:</h4>


// </div>
//     <div>
//     <h4>My Messages:</h4>
//     {/* {
//         userMessage.length ? userMessage.map((oneMessage)=>{
//             return(
//                 <div>
                    
//                     <div>MSG: { oneMessage.fromUser.username }</div>
//                 </div>
//             )
//         }): <div>No Data Available</div>
//     } */}
// </div>




// {
//     userMessage.length ? userMessage.map((oneMessage)=>{
//         return(
//             <div>
                
//                 {/* <div>MSG: { oneMessage.fromUser }</div> */}
//             </div>
//         )
//     }): <div>No Data Available</div>
// }