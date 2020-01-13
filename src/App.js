import React from 'react';
import { renderRoutes } from 'react-router-config';
import NavBar from './components/Navbar/Navbar';

class App extends React.Component {
  render() {
    const {
      route,
    } = this.props;
  
    return (
      <>
        <div>
          <NavBar />
          {renderRoutes(route.routes)}
        </div>
      </>
    )
  }
}
export default App;
