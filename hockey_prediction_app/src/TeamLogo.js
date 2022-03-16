import React from 'react';
import Text from 'react-svg-text';

class TeamLogo extends React.Component{
    getLogoFromTeam( team ){
        return <svg style={{width:'1em', height:'1em'}}>
            <Text scaleToFit="true" verticalAnchor="start">{ team }</Text>
        </svg>
    }

    render(){
        return this.getLogoFromTeam( this.props.team );
    }
}

export default TeamLogo;