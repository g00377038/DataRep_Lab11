import React from 'react';
import { MovieItem } from './movieItem';
import { Movies } from './movies';
import axios from 'axios';

export class Read extends React.Component {

    //neccessary for event to work
    constructor(){
        super();
        this.reloadData = this.reloadData.bind(this);
    }

    state = {
        //array of movie details
        movies: [

        ]

    };

    //refresh page
    reloadData(){
        //retrieve information from URL
        axios.get('http://localhost:4000/api/movies')

            //callback function for acceptence
            .then(response => {
                this.setState(
                    {
                        //assign "Search" data to "movies" array
                        movies: response.data
                    }
                )
            })

            //callback function for rejection
            .catch((error) => {
                console.log(error);
            })
    }

    componentDidMount() {
        //retrieve information from URL
        axios.get('http://localhost:4000/api/movies')

            //callback function for acceptence
            .then(response => {
                this.setState(
                    {
                        //assign "Search" data to "movies" array
                        movies: response.data
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
                {/*pass data and reloadData method*/}
                <Movies myMovies={this.state.movies} reloadData = {this.reloadData}></Movies>
            </div>
        );
    }
}