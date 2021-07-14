import * as React from 'react';
import Routes from "./router"
import Navbar from './components/navbar'
import { Card, Container } from 'react-bootstrap';
import ErrorHandler from './ErrorHandler'

const App = () => {
  return <ErrorHandler>
    <Navbar />
    <Card>
      <Card.Body>
        <Container>
          <Routes />
        </Container>
      </Card.Body>
    </Card>
  </ErrorHandler>
}

export default App;
