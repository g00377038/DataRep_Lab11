import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Axios from 'axios';

export class MovieItem extends React.Component {
    
    //neccessary for button click to work
    constructor(){
        super();
        this.deleteMovie = this.deleteMovie.bind(this);
    }

    //method to remove a movie item from database
    deleteMovie(e){
        e.preventDefault();
        console.log("Delete button pressed."+this.props.myMovie._id);

        Axios.delete('http://localhost:4000/api/movies/'+this.props.myMovie._id)
        //invoke function to refresh page
        .then(()=>{
            this.props.reloadData();
        })
        .catch((err)=>{
            console.log(err);
        });
    }
   
    render() {
        return (
            <div>
                {/*display movie details in card format*/}
                <Card>
                    <Card.Header>
                        {this.props.myMovie.title}
                    </Card.Header>

                    <Card.Body>
                        <blockquote className="blockquote mb-0">
                            <img src={this.props.myMovie.poster} width="200" length="200"></img>
                            <footer className="blockquote-footer">
                                <p>{this.props.myMovie.year}</p>
                            </footer>
                        </blockquote>

                        {/*add delete button, when button is clicked call "DeleteMovie"*/}
                        <Button variant = "danger" onClick = {this.deleteMovie}>Delete</Button>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}