import React from 'react';

class GameHeader extends React.Component {
    render() {
        const win = {color:'green'};
        const lose = {color:'red'};
        const draw = {color:'yellow'};
        const defaultStyle = {flexGrow:99, alignSelf:'center'};
        console.log( this.props.standings );
        const teams = this.props.teams.split('-');
        const { [this.props.teams]: matchupStandings} = this.props.standings;
        let homeStyle, visitStyle = { ...defaultStyle, ...draw};
        if( matchupStandings > 0 ){
            homeStyle = { ...defaultStyle, ...win };
            visitStyle = { ...defaultStyle, ...lose };
        }else if( matchupStandings < 0 ){
            homeStyle = { ...defaultStyle, ...lose };
            visitStyle = { ...defaultStyle, ...win };
        }
        return <div style={{
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between',
            height:'2em',
            fontSize:'2em'
        }}>
            <span style={homeStyle}>{teams[0]}</span>
            <span style={{flexGrow:1, alignSelf:'center', }}>@</span>
            <span style={visitStyle}>{teams[1]}</span>
        </div>;
    }
}

export default GameHeader