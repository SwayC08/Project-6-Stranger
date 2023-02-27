import { Link } from "react-router-dom";

const Navbar = () => {
    return(
        <div>
            <Link to="/"> Home </Link>
            <Link to="/Profile"> Profile </Link>
            <Link to="/Posts"> Posts </Link>
            <Link to="/Logout"> Logout </Link>
        </div>
    )
}

export default Navbar; 