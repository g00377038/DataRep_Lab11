import React from 'react';
import '../App.css';

export class Content extends React.Component
{
    render()
    {
        return(
            // Content for "Content" component
            <div className="App">
                <h1>My Content in another component.</h1>
                <h2>Hello World!</h2>

                {/*display current time*/}
                <h2>It is {new Date().toLocaleTimeString()}</h2>
            </div>
        );
    }
}