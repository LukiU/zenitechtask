import React, { Component } from 'react';
import Header from './Components/header';
import Content from './Components/content';


class App extends Component {
  componentDidMount (){

  }
  render() {
    return (
      <div className="App">
        <Header />
        <Content/>
      </div>
    );
  }
}

export default App;
