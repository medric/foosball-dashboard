import React from 'react';
import { inject, observer } from 'mobx-react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow }
  from 'material-ui/Table';
import Participant from './Participant';

/**
 * Displays the participants 
 */
const ParticipantsList = (props) => {
    const store = props.foosballStore;

    return (
        <div className="matches-list fs-list container column">
            <h2>Participants</h2>
            
            <Table
                selectable={false}>
                <TableHeader displaySelectAll={false}>
                    <TableRow selectable={false}>
                        <TableHeaderColumn>Name</TableHeaderColumn>
                        <TableHeaderColumn>Wins</TableHeaderColumn>
                        <TableHeaderColumn>Losses</TableHeaderColumn>
                        <TableHeaderColumn>Win/Loss ratio</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    { 
                        store.participants.map(
                            (participant, index) => 
                                <Participant 
                                    key={index}
                                    {...participant}
                                    {...store.getWinsLosses(participant._id)} 
                                />
                        )
                    }
                </TableBody>
            </Table>
        </div>
    )   
}

export default inject('foosballStore')(observer(ParticipantsList));