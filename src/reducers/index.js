
import { combineReducers } from "redux";
import { ADD_MOVIES, ADD_FAVOURITE, REMOVE_FAVOURITE, SET_SHOW_FAVOURITES, ADD_MOVIE_TO_LIST, ADD_SEARCH_RESULT } from "../actions";

const initialMovieState = {
    list : [],
    favaourites : [],
    setFavourites : false,
}

export function movies(state = initialMovieState, action){
    console.log("MOVIE REDUCERS");
    // if(action.type === ADD_MOVIES){
    //     return {
    //         ...state,
    //         list : action.movies
    //     }
    // }
    // return state

    switch(action.type){
        case ADD_MOVIES:
            return{
                ...state,
                list : action.movies
            }
        case ADD_FAVOURITE:
            return {
                ...state,
                favaourites: [action.movie, ...state.favaourites]
            }
        case REMOVE_FAVOURITE:
            const filteredArray = state.favaourites.filter(
                movie => movie.Title !== action.movie.Title
            );
            return{
                ...state,
                favaourites : filteredArray
            }
        case SET_SHOW_FAVOURITES:
            return{
                ...state,
                setFavourites : action.val
            }
        case ADD_MOVIE_TO_LIST :
            return{
                ...state,
                list:[action.movie, ...state.list]
            }
        default:
            return state;
    }
}

const initialSearchState = {
    result:{},
    showSearchResults : false
}

export function search(state = initialSearchState, action){
    switch(action.type){
        case ADD_SEARCH_RESULT :
            return{
                ...state,
                result : action.movie,
                showSearchResults : true
            }
        case ADD_MOVIE_TO_LIST :
            return{
                ...state,
                showSearchResults : false
            }
        default:
            return state;
    }

    // console.log("SEARCH REDUCERS")
    // return state;
}

const initialRootReducer = {
    movies : initialMovieState,
    search : initialSearchState,
}

// export default function rootReducer(state = initialRootReducer, action){
//     return {
//         movies : movies(state.movies, action),
//         search : search(state.search, action),
//     }
// }

export default combineReducers ({
    movies,
    search,
});



