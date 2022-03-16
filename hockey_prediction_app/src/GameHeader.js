import React from 'react';

class GameHeader extends React.Component {
    render() {
        const teams = this.props.teams.split('-');
        return <div style={{
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between',
            height:'2em',
            fontSize:'2em'
        }}>
            <span style={{flexGrow:99, alignSelf:'center'}}>{teams[0]}</span>
            <span style={{flexGrow:1, alignSelf:'center', }}>@</span>
            <span style={{flexGrow:99, alignSelf:'center'}}>{teams[1]}</span>
        </div>;
    }
}

export default GameHeader