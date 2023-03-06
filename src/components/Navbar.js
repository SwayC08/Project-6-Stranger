import { Link } from "react-router-dom";

const Navbar = (props) => {
    const { loggedIn } = props;

    return(
        <div className="NavLinks">
            { loggedIn ? <div></div> : <Link to="/NewUser"> Sign Up </Link> }
            { loggedIn ? <div></div> : <Link to="/Login"> Sign In </Link> }
            <Link to="/Home"> Home </Link>
            { !loggedIn ? <div></div> : <Link to="/Profile"> Profile </Link> }
            <Link to="/"> Posts </Link>
            { !loggedIn ? <div></div> : <Link to="/Logout"> Logout </Link> }
        </div>
    )
}

export default Navbar; 