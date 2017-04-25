import React from 'react';
import { TableRow, TableRowColumn }
  from 'material-ui/Table';
import Team from '../participants/Team';

/**
 * Displays a match item
 */
const Match = ({ date, team0, team1, winner }) => {
    return (
        <TableRow selectable={false}>
            <TableRowColumn>{ new Date(date).toDateString() }</TableRowColumn>
            <TableRowColumn>
                <Team team={team0} />
            </TableRowColumn>
            <TableRowColumn>
                <Team team={team1} /> 
            </TableRowColumn>
            <TableRowColumn>
                { winner.label }
            </TableRowColumn>
        </TableRow>
    )
}

export default Match;