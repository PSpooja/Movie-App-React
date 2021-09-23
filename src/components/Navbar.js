import React, { Component } from 'react';
// import { movies } from "../data";
import { addMovieToList, handleSearchMovie} from "../actions";

class Navbar extends Component{
    constructor(props) {
        super(props)
    
        this.state = {
             searchText : ''
        }
    }

    handleAddToMovies = (movie) =>{
        this.props.dispatch(addMovieToList(movie));
        this.setState({
            showSearchResults : false
        });
    }

    handleSearch = () => {
        const {searchText} = this.state;
        console.log("handle Seacrh", this.props.dispatch);
        this.props.dispatch(handleSearchMovie(searchText))
    }
    
    handleChange = (event) => {
        this.setState({
            searchText : event.target.value
        })
    }

    render(){
        console.log("Search",this.props.search);
        const { result , showSearchResults} = this.props.search;
        return(
            <div className="nav">
                <div className="search-container">
                    <input onChange={this.handleChange}/>
                    <button id="search-btn" onClick={this.handleSearch}>Search</button>

                    {
                        showSearchResults &&
                        <div className="search-results">
                            <div className="search-result">
                                <img src={result.Poster} alt="search-pic"/>
                                <div className="movie-info">
                                    <span>{result.Title}</span>
                                    <button className="" onClick={() => this.handleAddToMovies(result)}>ADD TO MOVIES</button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default Navbar;