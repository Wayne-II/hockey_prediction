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

  getTeamSkaters( team ){
    var ret = this.state.skaters.filter( skater => {
      return skater.team === team;
    } );
    return ret;
  }

  getScheduledTeams(){
    let scheduled_teams = [];
    scheduled_teams = scheduled_teams.concat( ...this.state.schedule.map( scheduled_match => scheduled_match.split( '-' ) ) );
    return scheduled_teams;
  }

  getSkatersList(){
    //return skaters in descending order based on goals
    //return this.state.skaters[0].goals ;

    let scheduled_teams = this.getScheduledTeams();
    let skaters_by_team = {};

    Object.keys( this.state.teams ).map( team => skaters_by_team[ team ] = this.getTeamSkaters( team ) );
    Object.keys( skaters_by_team ).map( team => skaters_by_team[ team ].sort( ( skater1, skater2 ) => skater2.goals - skater1.goals ) );

    let skaters_lists = [];
    for( let team_idx = 0; team_idx < scheduled_teams.length; team_idx += 2 ){
      let first_wins = this.state.standings[ scheduled_teams[ team_idx ] + '-' + scheduled_teams[ team_idx ] ] > 0;

      skaters_lists.push(
        <div>
          {scheduled_teams[ team_idx ] } @ {scheduled_teams[ team_idx + 1 ] }
          <br />
          <span style={ first_wins ? {color:"green"} : {color:"red"}}>{scheduled_teams[ team_idx ] }</span>
          <ul>
            { 
              skaters_by_team[ scheduled_teams[ team_idx ] ].map( skater => <li>{skater.goals} - {skater.name}</li> )
            }
          </ul>
          <span style={ first_wins ? {color:"red"} : {color:"green"}}>{scheduled_teams[ team_idx + 1 ] }</span>
          <ul>
            { 
              skaters_by_team[ scheduled_teams[ team_idx + 1 ] ].map( skater => <li>{skater.goals} - {skater.name}</li> )
            }
          </ul>
        </div>
      );
    }

    return skaters_lists;
  }

  render(){
    if( this.state === null ){
      return 'loading';
    }
    console.log( this.state );
    let skaters_list = this.getSkatersList();
    return skaters_list;
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
