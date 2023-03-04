// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";


// const Reply = (props) =>{

//     const [replyContent, setReplyContent] = useState("");

//     // const { Reply } = useParams();
//     // console.log(useParams(Reply))

//     const nav = useNavigate();

//     const COHORT_NAME ='2301-FTB-MT-WEB-FT';
//     const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;
//     const tokenKey = localStorage.getItem("token");

// // 
//     const replyMessage = async (event) => {
//         event.preventDefault();
//         try {
//         const response = await fetch(`${BASE_URL}/posts/${_id}/messages`, {
//             method: "POST",
//             headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${tokenKey}`
//             },
//             body: JSON.stringify({
//                 message: {
//                     content: replyContent,
//                 }
//             })
//         });
//         const transData = await response.json();
//             console.log(transData);
//             if (!transData.success){ 
//                 alert("Reply was not sent. Please try again. ");
//             } else {
//                 alert("Reply was successfully sent.");
//                 // props.setPosts(newPostData);
//                 props.setPosts(transData);
//                 nav("/");
//             }    
//         } catch (error){
//             console.log(error);
//         }
//     };




//     // {filterPosts[0]._id}

//     return(
//         <div>
//             <div>Reply To Message ()</div>
//             {
//                 posts.length ? posts.map((onePost) => {
//                     return (
//                         <div key={onePost._id}>
//                             <div> POST: { onePost.title } </div>
//                             <hr/>
//                         </div>
//                     )
//                 }) : <div>No Data Available</div>
//             }
//             <form onSubmit={ replyMessage }>
//                 <h3>Message:</h3>
//                 <textarea 
//                     type="text" 
//                     rows="4" 
//                     cols="75"
//                     value={ replyContent }
//                     placeholder="Write your message here..."
//                     onChange={(event)=>{
//                         setReplyContent(event.target.value);
//                     }}
//                 />
//                 <button type="submit">Submit</button>
//             </form>
//         </div>
//     )
// }

// export default Reply;



// const { posts } = props;
// console.log(posts);
// // console.log(posts[3]._id);

// function findPost(){
//     let correctPost = "";
//     for(let i =0; i< props.length;i++){
//         let currentPosition = props[i];
//         if(currentPosition._id === "64011853c192f50016ecc997"){
//             correctPost = currentPosition._id
//         }
        


//     }
//     return correctPost;
// }
// let postID = findPost();
// console.log(postID);

// const { _id } = useParams();
// console.log(_id);

// Filter by _id
// let filterPosts;
// filterPosts = posts.filter((onePost) => {
//     return onePost._id == posts._id
// });

// console.log(filterPosts);