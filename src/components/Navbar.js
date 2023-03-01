import { Link } from "react-router-dom";

// loggedIn
const Navbar = (props) => {
    const { loggedIn } = props;

    return(
        <div>
            { loggedIn ? <div></div> : <Link to="/NewUser"> Sign Up </Link> }
            <Link to="/Home"> Home </Link>
            { !loggedIn ? <div></div> : <Link to="/Profile"> Profile </Link> }
            <Link to="/"> Posts </Link>
            { !loggedIn ? <div></div> : <Link to="/Logout"> Logout </Link> }
        </div>
    )
}

export default Navbar; 