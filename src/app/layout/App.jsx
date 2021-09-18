import React from 'react';
import EventDashboard from '../../features/events/eventDashboard/EventDashboard';
import NavBar from '../../features/nav/NavBar';
import {Container} from 'semantic-ui-react';

function App() {
  return (<div>
  <NavBar />
  <Container classNAme="main">
  <EventDashboard />
  </Container>
  
</div>);
}

export default App;
