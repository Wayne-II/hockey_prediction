import React from 'react';
import GameSkaters from './GameSkaters.js';

class ScheduleSkaters extends React.Component {
    getTeamSkaters(team) {//utility function
        var ret = this.props.skaters.filter(skater => {
            return skater.team === team;
        });
        return ret;
    }

    getScheduleSkaters() {//component(s) generating function
        let scheduledTeams = this.getScheduledTeams();
        let skatersByTeam = {};

        Object.keys(this.props.teams).map(team => skatersByTeam[team] = this.getTeamSkaters(team));
        Object.keys(skatersByTeam).map(team => skatersByTeam[team].sort((skater1, skater2) => skater2.goals - skater1.goals));

        let scheduleSkaters = [];
        for (let teamIdx = 0; teamIdx < scheduledTeams.length; teamIdx += 2) {            
            let homeTeam = scheduledTeams[ teamIdx ];
            let awayTeam = scheduledTeams[ teamIdx + 1 ];
            const gameSkatersByTeam = { 
                [homeTeam]:skatersByTeam[ homeTeam ],
                [awayTeam]:skatersByTeam[ awayTeam ]
            };
            scheduleSkaters.push(
                <GameSkaters 
                    skaters={ gameSkatersByTeam } 
                    teams={ homeTeam + '-' + awayTeam } 
                    selectedSkaters={ this.props.selectedSkaters } 
                    click={ this.props.changeSelectedSkater } 
                />    
            );
        }
        return scheduleSkaters;
    }

    getScheduledTeams() {//utility function
        let scheduledTeams = [];
        scheduledTeams = scheduledTeams.concat(...this.props.schedule.map(scheduled_match => scheduled_match.split('-')));
        return scheduledTeams;
    }

    render() {
        if (this.props.isLoading) {
            return 'loading';
        }
        let scheduleSkaters = this.getScheduleSkaters();
        return <div>
            { scheduleSkaters }
        </div>;
    }
}

export default ScheduleSkaters;