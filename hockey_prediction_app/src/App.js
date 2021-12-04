import logo from './logo.svg';
import './App.css';
import React from 'react';

class Hockey extends React.Component {
  componentDidMount(){
    fetch( 'https://hockey/tims/',{mode:'cors'} )
    .then( response => response.json() )
    .then( data => {
      this.setState( data );
    } );
  }
  render(){
    if( this.state === null ){
      return 'loading';
    }
    //return skaters in descending order based on goals
    //return this.state.skaters[0].goals ;
    var skaters_list = this.state.skaters.sort( ( skater1, skater2 ) => { 
      return skater2.goals - skater1.goals;
    } )
    .map( skater => <li>{skater.name} - {skater.goals}</li> );
    return (
      <ul>{skaters_list}</ul>
    );
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Hockey />
      </header>
    </div>
  );
}

export default App;
