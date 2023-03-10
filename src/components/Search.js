import { Link } from "react-router-dom";

const Search = (props) => {

    const { setSearch, searchState, setSearchState} = props


    return (
        <div>
            <div>Search</div>
            <input 
                type="text" 
                placeholder="Search for Post"
                onChange={(event) => {
                    setSearch(event.target.value)
                }}
                onClick={() => setSearchState(!searchState)}
            >
            </input>
        </div>

    )
}

export default Search; 