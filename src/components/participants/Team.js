import React from 'react';
import { inject, observer } from 'mobx-react';
import Chip from 'material-ui/Chip';

/**
 * Displays a team members
 */
const Team = ({foosballStore, team}) => {
    return (
        <div className="team">
            {
                team.map((_id, index) => 
                   <Chip key={index}>{ foosballStore.getParticipant(_id).name }</Chip>
                )
            }
        </div>
    )   
}

export default inject('foosballStore')(observer(Team));