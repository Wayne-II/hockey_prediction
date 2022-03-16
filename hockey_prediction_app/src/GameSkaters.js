import React from 'react';
import GameHeader from './GameHeader.js';
import TeamSkaters from './TeamSkaters.js';

class GameSkaters extends React.Component {
    render() {

        const teams = this.props.teams.split('-');

        return <div style={{
            display: 'flex',
            flexDirection: 'column',

            flex: '1 0 auto'
        }}>
            <GameHeader teams={this.props.teams} standings={this.props.standings} />
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                flex: '1 0 auto'
            }}>
                <TeamSkaters
                    skaters={this.props.skaters[teams[0]]}
                    selectedSkaters={this.props.selectedSkaters}
                    click={this.props.click}
                    team={teams[0]}
                />
                <TeamSkaters
                    skaters={this.props.skaters[teams[1]]}
                    selectedSkaters={this.props.selectedSkaters}
                    click={this.props.click}
                    team={teams[1]}
                />
            </div>
        </div>
    }
}

export default GameSkaters;