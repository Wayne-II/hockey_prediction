import React from 'react';
import SkaterSelector from './SkaterSelector.js';

class SelectionOptions extends React.Component {
    getTeamSkaters( team ){//utility function
      var ret = this.props.skaters.filter( skater => {
        return skater.team === team;
      } );
      return ret;
    }
  
    getScheduledTeams(){//utility function
      let scheduled_teams = [];
      scheduled_teams = scheduled_teams.concat( ...this.props.schedule.map( scheduled_match => scheduled_match.split( '-' ) ) );
      return scheduled_teams;
    }
  
    
    getSkaterListItems( team_skaters ){//component(s) generating function
      return team_skaters.map( skater => {
        return <li style={{ listStyleType:'none', display:'flex', alignItems:'flex-start', textAlign:'start'}}>
          <SkaterSelector skater={ skater } selectedSkaters={ this.props.selectedSkaters } click={ this.props.changeSelectedSkater } />
        </li>;
      } );
    }
  
    getSkatersList(){//component(s) generating function
      let scheduled_teams = this.getScheduledTeams();
      let skaters_by_team = {};
  
      Object.keys( this.props.teams ).map( team => skaters_by_team[ team ] = this.getTeamSkaters( team ) );
      Object.keys( skaters_by_team ).map( team => skaters_by_team[ team ].sort( ( skater1, skater2 ) => skater2.goals - skater1.goals ) );
  
      let skaters_lists = [];
      for( let team_idx = 0; team_idx < scheduled_teams.length; team_idx += 2 ){
        let first_wins = this.props.standings[ scheduled_teams[ team_idx ] + '-' + scheduled_teams[ team_idx ] ] > 0;
        let match_tie = this.props.standings[ scheduled_teams[ team_idx ] + '-' + scheduled_teams[ team_idx ] ] === 0;
        let win_colour = match_tie ? "yellow" : "green";
        let lose_colour = match_tie ? "yellow" : "red";
        let backgroundColor = team_idx % 4 === 0 ? '#282c34' : '#232a36';
        skaters_lists.push(
          <div style={{width:"33%",display:'flex', flexDirection:'column', backgroundColor } }>
            <span>{scheduled_teams[ team_idx ] } @ {scheduled_teams[ team_idx + 1 ] }</span>
            
            <div style={{display:'flex', flexDirection:'row', flexWrap:'wrap'}}>
              <span style={ first_wins ? {color:win_colour, width:'50%'} : {color:lose_colour, width:'50%'}}>{scheduled_teams[ team_idx ] }</span>
              <span style={ first_wins ? {color:lose_colour, width:'50%'} : {color:win_colour, width:'50%'}}>{scheduled_teams[ team_idx + 1 ] }</span>
              <ul onClick={ event => {
  
              } } style={{display:"flex", flexDirection:"column",width:'50%', padding:0, margin:0, alignItems:"flex-start", justifyContent:"flex-start", flexWrap:'nowrap'}}>
                { 
                  this.getSkaterListItems( skaters_by_team[ scheduled_teams[ team_idx ] ] )
                }
              </ul>
              <ul style={{display:"flex", flexDirection:"column",width:'50%', padding:0, margin:0, alignItems:"flex-start", justifyContent:"flex-start"}}>
                { 
                  this.getSkaterListItems( skaters_by_team[ scheduled_teams[ team_idx + 1 ] ] )
                }
              </ul>
            </div>
          </div>
        );
      }
  
      return <div style={{display:'flex', flexDirection:'row', flexWrap:'wrap'}}>{skaters_lists}</div>;
    }
  
    render(){
      if( this.props.isLoading ){
        return 'loading';
      }
      let skaters_list = this.getSkatersList();
      return <div>
        {skaters_list}
        </div>;
    }
  }

  export default SelectionOptions;