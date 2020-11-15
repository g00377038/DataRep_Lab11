import React from 'react';
import { MovieItem } from './movieItem';

export class Movies extends React.Component{

    render(){
        return this.props.myMovies.map(
            //arrow function, for every movie return movie item
            (movie)=>{
                return <MovieItem key={movie.imbdID} myMovie = {movie}></MovieItem>
            }
        );
    }
    
}

