import { Link } from "react-router-dom";

const Navbar = () => {
    return(
        <div>
            <Link to="/NewUser"> Sign Up </Link>
            <Link to="/Home"> Home </Link>
            <Link to="/Profile"> Profile </Link>
            <Link to="/"> Posts </Link>
            <Link to="/Logout"> Logout </Link>
        </div>
    )
}

export default Navbar; 