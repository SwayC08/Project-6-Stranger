import { Navbar } from "../components";

const Header = (props) => {
    const { loggedIn } = props;

    return(
        <div>
            <div>Local Listings </div>
            <Navbar loggedIn={ loggedIn }/>
        </div>
    )
}

export default Header; 