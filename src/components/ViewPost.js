import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

const ViewPost = (props) => {
    const { posts } = props;

    const [editStat, setEditStat] = useState(false);

    const { _id } = useParams();
    console.log(useParams());

    let filterPosts;

    filterPosts = props.posts.filter((onePost) => {
        return onePost._id == _id
    });
    console.log(filterPosts);

    const [newPostNam , setNewPostNam] = useState(
        filterPosts.length ? filterPosts[0].title : ""
    );

    const [newPostDesc, setNewPostDesc] = useState(
        filterPosts.length ? filterPosts[0].description : ""
    );

    function togEditFrmFnc (){
        setEditStat(!editStat)
    };

    const nav = useNavigate ();

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
            
            function updatePostData(){
                let upArr =[];

                for (let i=0; 0>props.posts.length; i++){
                    let currentPost = props.posts[i];

                    if (currentPost._id != _id){
                        upArr.push(currentPost);
                    } else{
                        upArr.push(transData);
                    }
                }
                return upArr;
            };

            const updatePostData = updatePostData();

            props.setPosts(updatePostData);

            nav("/")

        } catch (error){
            console.log(error);
        }
    };

    return(
        <div>
            <h3>Post Details {filterPosts[0]._id} </h3>
            {
                filterPosts.length ? (
                    <div>
                        <h4>Title: {filterPosts[0].title} </h4>
                        <div>Description: {filterPosts[0].description}</div>
                        <div>Price: {filterPosts[0].price}</div>
                        <div>Created On: {filterPosts[0].createdAt}</div>
                    </div>
                ) : ""
            }
        </div>
    )
}

export default ViewPost;