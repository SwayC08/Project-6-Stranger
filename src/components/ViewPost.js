import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

const ViewPost = (props) => {
    const { posts, setPosts, loggedIn } = props;
    // console.log(props);

    const [editStat, setEditStat] = useState(false);

    const { _id } = useParams();
    // console.log(useParams());

    let filterPosts;

    filterPosts = props.posts.filter((onePost) => {
        return onePost._id == _id
    });
    // console.log(filterPosts);
// state set to pre-existing title if empty 
    const [newPostNam , setNewPostNam] = useState(
        filterPosts.length ? filterPosts[0].title : ""
    );
// state set to pre-existing description if empty
    const [newPostDesc, setNewPostDesc] = useState(
        filterPosts.length ? filterPosts[0].description : ""
    );
// toggle Edit form from button 
    function togEditFrmFnc() {
        setEditStat(!editStat)
    };

    const nav = useNavigate();

    const COHORT_NAME ='2301-FTB-MT-WEB-FT';
    const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

// Update request 
    async function putReqUpdateFnc (event){
        event.preventDefault();
        try {
            const response = await fetch(`${BASE_URL}/posts/${_id}`,
                {
                    method: "PUT",
                    header: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({
                        title: newPostNam,
                        description: newPostDesc,
                    })
                }
            ); 
            const transData = await response.json();
            // console.log(transData);

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

            props.setPosts(transData);

            nav("/");

        } catch (error){
            console.log(error);
        }
    };

    return(
        <div>
            <h3>Post Details ({filterPosts[0]._id}) </h3>
            {
                filterPosts.length ? (
                    <div>
                        <h4>Title: {filterPosts[0].title} </h4>
                        <div>Description: {filterPosts[0].description}</div>
                        <div>Price: {filterPosts[0].price}</div>
                        <div>Created On: {filterPosts[0].createdAt}</div>
                        { !loggedIn ? <div></div> : 
                        <button onClick={ togEditFrmFnc }>Edit </button>
                        }
                        {
                            editStat ? (
                                <form onSubmit={ putReqUpdateFnc }>
                                    <h3>Update Post</h3>
                                    <input type="text" value={ newPostNam } onChange={(event)=>{
                                        console.log(event.target.value);
                                        setNewPostNam(event.target.value);
                                    }}
                                    placeholder={filterPosts[0].title}
                                    />
                                    <textarea 
                                        type="text" 
                                        rows="4" 
                                        cols="75"
                                        value={ newPostDesc }
                                        placeholder={filterPosts[0].description}
                                        onChange={(event)=>{
                                            console.log(event.target.value);
                                            setNewPostDesc(event.target.value);
                                        }}
                                    />
                                    <button type="submit">Submit</button>
                                </form>
                            ): ""
                        }
                    </div>
                ) : <div>No Data Available</div>
            }
        </div>
    )
}

export default ViewPost;