import React from 'react';
import './App.css';
import { Footer } from './components/footer';
import { Header } from './components/header';
import { Content } from './components/content';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Read } from './components/read';
import { Create } from './components/create';
import { Edit } from './components/edit';

class App extends React.Component {
  render() {
    return (

      //wrap div with Router tag
      <Router>
        <div className="App">

          {/*create navigation bar*/}
          <Navbar bg="primary" variant="dark">
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Nav className="mr-auto">

              {/*create links for navigation bar*/}
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/read">Read</Nav.Link>
              <Nav.Link href="/create">Create</Nav.Link>
            </Nav>
          </Navbar>

          <br />

          <Switch>
            {/*display Content component when path ends with '/'*/}
            <Route path='/' component={Content} exact />

            {/*display Header component when path ends with '/creates'*/}
            <Route path='/create' component={Create} exact />

            {/*display read component when path ends with '/read'*/}
            <Route path='/read' component={Read} exact />

            {/*display Edit component when path ends with '/edit/:id'*/}
            <Route path='/edit/:id' component={Edit} exact />
          </Switch>

        </div>
      </Router>
    );
  }
}

export default App;
