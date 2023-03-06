import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";

const ViewPost = (props) => {
    const { posts, setPosts, loggedIn, setUpdateState, updateState, fetchPosts} = props;

    const { _id } = useParams();

// Toggle Edit button state 
    const [editState, setEditState] = useState(false);
// Toggle Reply button state 
    const [replyState, setReplyState] = useState(false);

// Update Post state 
// const [updateState, setUpdateState] = useState(false);    

// Delete Post state 
    const [deleteState, setDeleteState] = useState([]);

// Reply Post state 
    const [replyContent, setReplyContent] = useState("");

// Filter by _id
    let filterPosts = props.posts.filter((onePost) => {
        return onePost._id == _id
    });
    // console.log(filterPosts);
    // setPosts(filterPosts);



// Update Post state (set to pre-existing if empty) 
    const [newPostNam , setNewPostNam] = useState(
        filterPosts.length ? filterPosts[0].title : ""
    );
    const [newPostDesc, setNewPostDesc] = useState(
        filterPosts.length ? filterPosts[0].description : ""
    );

    const nav = useNavigate();

    const COHORT_NAME ='2301-FTB-MT-WEB-FT';
    const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;
    const tokenKey = localStorage.getItem("token");

// Toggle Edit form (button) 
    function toggleEdit() {
        setEditState(!editState)
    };

// Toggle Edit form (button) 
    function toggleReply() {
        setReplyState(!replyState)
    };

// Toggle Edit form (button) 
    function newRequest() {
        setUpdateState(!updateState);
    };
// Testing
    useEffect(() => {
        console.log(" ViewPost  Update");
    },[updateState])

// Update changes made
    useEffect(()=>{
        console.log("I was activated in ViewPost")
        fetchPosts();
    }, [])

// Edit(PATCH) request 
    const patchReq = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${BASE_URL}/posts/${_id}`, {
                method: "PATCH",
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenKey}`
                },
                body: JSON.stringify({
                post: {
                    title: newPostNam,
                    description: newPostDesc,
                    // price: "$480.00",
                    // location: "New York, NY",
                    // willDeliver: true
                }
                })
            });
            const transData = await response.json();
            // console.log(transData);

            if (!transData.success){
                alert("Post was not edited. Please try again. ");
            } else {

                function updatePostData(){
                    let updateArr =[];
                    for (let i=0; 0>props.posts.length; i++){
                        let currentPost = props.posts[i];
                        if (currentPost._id != _id){
                            updateArr.push(currentPost);
                        } else{
                            updateArr.push(transData.data.post);
                        }
                    }
                    return updateArr;
                };
                const newPostData = updatePostData();
                props.setPosts(newPostData);
                alert("Post was successfully edited.");
                nav("/");
            }
        } catch (error){
            console.log(error);
        }
    };

//Delete request
    const deletePost = async (event) => {
        event.preventDefault();
        try {
        const response = await fetch(`${BASE_URL}/posts/${_id}`, {
            method: "DELETE",
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenKey}`
            }
        });
            const transData = await response.json();
            console.log(transData);
            if (!transData.success){
                alert("Post was not deleted. Please try again.");
            } else {
                alert("Post was successfully deleted.");
                nav("/")
            }
        } catch(error){
            console.log(error)
        }
    };

// Reply request
    const replyMessage = async (event) => {
        event.preventDefault();
        try {
        const response = await fetch(`${BASE_URL}/posts/${_id}/messages`, {
            method: "POST",
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenKey}`
            },
            body: JSON.stringify({
                message: {
                    content: replyContent,
                }
            })
        });
        const transData = await response.json();
            console.log(transData);
            if (!transData.success){ 
                alert("Reply was not sent. Please try again. ");
            } else {
                alert("Reply was successfully sent.");
                nav("/Home");
            }    
        } catch (error){
            console.log(error);
        }
    };

    return(
        <div className="viewPost">
            <h3>Post Details ({filterPosts[0]._id}) </h3>
            {
                filterPosts.length ? (
                    <div>
                        <h4>Title: {filterPosts[0].title} </h4>
                        <div>Description: {filterPosts[0].description}</div>
                        <div>Price: {filterPosts[0].price}</div>
                        <div>Created On: {filterPosts[0].createdAt}</div>
                        <Link to={"/"}><button>Back to Posts</button></Link>
                        { !loggedIn ? <div></div> : 
                            (
                                <div>
                                    <button onClick={ toggleEdit }>Edit </button>
                                    <button onClick={ deletePost }>Delete </button>
                                    <button onClick={ toggleReply }>Reply</button>
                                </div>
                            )
                        }
{/* Edit Post */}                        
                        {
                            editState ? (
                                <form onSubmit={ patchReq } className="editForm">
                                    {/* <h3>Update Post</h3> */}
                                    <input 
                                        type="text" 
                                        value={ newPostNam }
                                        placeholder={filterPosts[0].title} 
                                        onChange={(event)=>{
                                        setNewPostNam(event.target.value);
                                        }}
                                        
                                    />
                                    <textarea 
                                        type="text" 
                                        rows="4" 
                                        cols="75"
                                        value={ newPostDesc }
                                        placeholder={filterPosts[0].description}
                                        onChange={(event)=>{
                                            setNewPostDesc(event.target.value);
                                        }}
                                    />
                                    <button type="submit" onClick={ newRequest }>Submit</button>
                                </form>
                            ): ""
                        }
{/* MSG Reply */}
                        {
                            replyState ? (
                            <div>
                                <div>Reply To Message</div>
                                <form onSubmit={ replyMessage } className="replyForm">
                                    {/* <h3>Message:</h3> */}
                                    <textarea 
                                        type="text" 
                                        rows="4" 
                                        cols="75"
                                        value={ replyContent }
                                        placeholder="Write your message here..."
                                        onChange={(event)=>{
                                            setReplyContent(event.target.value);
                                        }}
                                    />
                                    <button type="submit">Submit</button>
                                </form>
                            </div>
                            ) : ""
                        }
                    </div>    
                ): ""
            }
        </div>
    )
}

export default ViewPost;

// () => setUpdateState(!updateState)

// API temp editing workaround
            // function updatePostData(){
            //     let upArr =[];
            //     for (let i=0; 0>props.posts.length; i++){
            //         let currentPost = props.posts[i];
            //         if (currentPost._id != _id){
            //             upArr.push(currentPost);
            //         } else{
            //             upArr.push(transData);
            //         }
            //     }
            //     return upArr;
            // };
            // const newPostData = updatePostData();
            // props.setPosts(newPostData);