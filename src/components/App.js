import React, { Component } from "react";
import { movies } from "../data";
import MovieCard from "./MovieCard";
import Navbar from "./Navbar";
import { addMovies, setShowFavourites } from "../actions";

class App extends Component {

  componentDidMount(){
    const { store } = this.props;
     
    store.subscribe(() => {
      console.log("UPDATED");
      this.forceUpdate();
    })

    // make api call
    // dispatch action
    store.dispatch(addMovies(movies))

    console.log("STATE", this.props.store.getState());
  }


  isMovieFavourite = (movie) => {
    console.log("inside favourite",this.props.store.getState());
    
    const { movies }  = this.props.store.getState();
    const index = movies.favaourites.indexOf(movie);

    if(index !== -1){
      // found movie
      return true
    }
    return false
    
  }

  onChangeTab = (val) => {
    this.props.store.dispatch(setShowFavourites(val));
  }

  
  render(){
    const { movies, search } = this.props.store.getState(); // { movies: {}, search: {}}
    const { list, favaourites, setFavourites } = movies;  
    console.log("RENDERED",this.props.store.getState() )

    const displayMovies = setFavourites ? favaourites : list
  
    return (
      <div className="App">
        <Navbar dispatch={this.props.store.dispatch} search={search}/>
        <div className="main">
          <div className="tabs">
            <div className={`tab ${setFavourites ? '': 'active-tabs'}`} onClick={() => this.onChangeTab(false)}>Movies</div>
            <div className={`tab ${setFavourites ? 'active-tabs' : ''}`} onClick={() => this.onChangeTab(true)}>Favourites</div>
          </div>
            <div className="list">
              
              { displayMovies ? 
              displayMovies.map((movie, index) => (
                <MovieCard 
                movie = {movie} 
                key={`movies- ${index}`} 
                dispatch={this.props.store.dispatch}
                isFavourite={this.isMovieFavourite(movie)}
                />))
                :  "Loading..."}

            </div>
            {displayMovies.length === 0 ? <div className="no-movies">No movies to display!</div> : null}
          </div>
        </div>
    );
  }
  

}

export default App;
