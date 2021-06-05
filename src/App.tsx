import * as React from 'react';
import Routes from "./router"
import Navbar from './components/navbar'
import { Card, Container } from 'react-bootstrap';

const App = () => {
  return <>
    <Navbar />
    <Card>
      <Card.Body>
        <Container>
          <Routes />
        </Container>
      </Card.Body>
    </Card>
  </>
}

export default App;
