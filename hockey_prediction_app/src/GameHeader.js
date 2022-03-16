import React from 'react';

class GameHeader extends React.Component{
    render(){
        const teams = this.props.teams.split( '-' );
        return <span>{ teams[ 0 ] } @ { teams[ 1 ] }</span>;
    }
}

export default GameHeader