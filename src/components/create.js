import React from 'react';
import axios from 'axios';

export class Create extends React.Component {


    constructor() {
        //invoke parent constuctor
        super();

        this.onChangeMovieTitle = this.onChangeMovieTitle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeMovieYear = this.onChangeMovieYear.bind(this);
        this.onChangeMoviePoster = this.onChangeMoviePoster.bind(this);

        this.state = {
            Title: '',
            Year: '',
            Poster: '',
        }
    }

    onChangeMovieTitle(event) {
        {/*update movie title*/ }
        this.setState({
            Title: event.target.value
        })
    }

    onChangeMovieYear(event) {
        {/*update movie year*/ }
        this.setState({
            Year: event.target.value
        })
    }

    onChangeMoviePoster(event) {
        {/*update movie poster*/ }
        this.setState({
            Poster: event.target.value
        })
    }

    handleSubmit(event) {
        {/*display alert to screen*/ }
        alert("Movie Added " + this.state.Title + " " + this.state.Year + " " + this.state.Poster)

        const newMovie = {
            title: this.state.Title,
            year: this.state.Year,
            poster: this.state.Poster
        }

        //send "newMovie" to server
        axios.post('http://localhost:4000/api/movies', newMovie)
        .then((res)=>{
            console.log(res);
        })
        .catch((err)=>{
            console.log(err);
        });
    }

    render() {
        return (
            <div>
                <h3>Hello from Create Component</h3>

                <form onSubmit={this.handleSubmit}>

                    {/*create text box for Movie Title entry*/}
                    <div className="form-group">
                        <label>Add Movie Title: </label>
                        <input type="text" className="form-control" value={this.state.Title} onChange={this.onChangeMovieTitle}>
                        </input>
                    </div>

                    {/*create text box for Movie Year entry*/}
                    <div className="form-group">
                        <label>Add Movie Year: </label>
                        <input type="text" className="form-control" value={this.state.Year} onChange={this.onChangeMovieYear}>
                        </input>
                    </div>

                    {/*create text box for Poster URL entry*/}
                    <div className="form-group">
                        <label>Add Movie Poster URL: </label>
                        <input type="text" className="form-control" value={this.state.Poster} onChange={this.onChangeMoviePoster}>
                        </input>
                    </div>

                    <div>
                        {/*add "Submit" button*/}
                        <input type="submit">
                        </input>
                    </div>

                </form>
            </div>
        );
    }
}