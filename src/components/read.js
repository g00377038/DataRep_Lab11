import React from 'react';
import { MovieItem } from './movieItem';
import { Movies } from './movies';
import axios from 'axios';

export class Read extends React.Component {

    state = {
        //array of movie details
        movies: [

        ]

    };

    componentDidMount() {
        //retrieve information from URL
        axios.get('https://jsonblob.com/api/jsonblob/520c3b5e-0312-11eb-a6af-cbf00d776032')

            //callback function for acceptence
            .then(response => {
                this.setState(
                    {
                        //assign "Search" data to "movies" array
                        movies: response.data.Search
                    }
                )
            })

            //callback function for rejection
            .catch((error) => {
                console.log(error);
            })
    }

    //display movie details to screen
    render() {
        return (
            <div>
                <h3>Hello from Read Component</h3>
                <Movies myMovies={this.state.movies}></Movies>
            </div>
        );
    }
}