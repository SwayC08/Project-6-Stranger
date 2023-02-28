import { Link } from 'react-router-dom';

const Post = (props) => {
    const { posts } = props;
    

    return(
        <div>
            <h3></h3>
            <div>
                {
                    props.posts.length ? props.posts.map((onePost) => {
                        return (
                            <div key={onePost._id}>
                                <Link to={`/${onePost._id}`}> POST: { onePost.title }</Link>
                            </div>
                        )
                    }) : <div>No Data Available</div>
                }
            </div>
        </div>
    )
}

export default Post;