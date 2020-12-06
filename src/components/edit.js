import React from 'react';
import axios from 'axios';

export class Edit extends React.Component {


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

    //when component becomes active in the view
    componentDidMount(){
        console.log(this.props.match.params.id);

        axios.get('http://localhost:4000/api/movies/'+this.props.match.params.id)
        .then(response =>{
            this.setState({
                _id:response.data._id,
                Title:response.data.title,
                Year:response.data.year,
                Poster:response.data.poster
            })
        })
        .catch((error)=>{
            console.log(error);
        });
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
        alert("Movie Edited " + this.state.Title + " " + this.state.Year + " " + this.state.Poster)

        const newMovie = {
            title: this.state.Title,
            year: this.state.Year,
            poster: this.state.Poster,
            _id: this.state._id
        }

    //edit record 
    axios.put('http://localhost:4000/api/movies/'+this.state._id, newMovie)
    .then(res =>{
        console.log(res.data)
    })
    .catch((error)=>{
        console.log(error);
    });

        //send "newMovie" to server
        //axios.post('http://localhost:4000/api/movies', newMovie)
        //.then((res)=>{
        //    console.log(res);
        //})
        //.catch((err)=>{
        //    console.log(err);
        //});
    }

    render() {
        return (
            <div>
                <h3>Hello from Edit Component</h3>

                <form onSubmit={this.handleSubmit}>

                    {/*create text box for Movie Title entry*/}
                    <div className="form-group">
                        <label>Movie Title: </label>
                        <input type="text" className="form-control" value={this.state.Title} onChange={this.onChangeMovieTitle}>
                        </input>
                    </div>

                    {/*create text box for Movie Year entry*/}
                    <div className="form-group">
                        <label>Movie Year: </label>
                        <input type="text" className="form-control" value={this.state.Year} onChange={this.onChangeMovieYear}>
                        </input>
                    </div>

                    {/*create text box for Poster URL entry*/}
                    <div className="form-group">
                        <label>Movie Poster URL: </label>
                        <input type="text" className="form-control" value={this.state.Poster} onChange={this.onChangeMoviePoster}>
                        </input>
                    </div>

                    <div>
                        {/*add "Submit" button*/}
                        <input type="submit" value = "Edit Movie">
                        </input>
                    </div>

                </form>
            </div>
        );
    }
}