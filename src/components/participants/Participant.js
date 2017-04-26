import React from 'react';
import Badge from 'material-ui/Badge';
import { TableRow, TableRowColumn }
  from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';

/**
 * Displays a participant item
 */
const Participant = ({ name, wins, losses, ratio, remove }) => {
    return (
        <TableRow selectable={false}>
            <TableRowColumn>{ name }</TableRowColumn>
            <TableRowColumn>
                <Badge
                    badgeContent={wins}
                    secondary={true}
                />
            </TableRowColumn>
            <TableRowColumn>
                <Badge
                    badgeContent={losses}
                    secondary={true}
                />
            </TableRowColumn>
             <TableRowColumn>
                <Badge
                    badgeContent={ratio.toFixed(1)}
                    secondary={true}
                />
            </TableRowColumn>
        </TableRow>
    )
}

export default Participant;