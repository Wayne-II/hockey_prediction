import React from 'react';

class GameHeader extends React.Component{
    render(){
        const teams = this.props.teams.split( '-' );
        return <span style={ {  } }>{ teams[ 0 ] } @ { teams[ 1 ] }</span>;
    }
}

export default GameHeader