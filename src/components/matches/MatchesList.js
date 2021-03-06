import React from 'react';
import { inject, observer } from 'mobx-react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow }
  from 'material-ui/Table';
import Match from './Match';

/**
 * Displays the results 
 */
const MatchesList = (props) => {
    const store = props.foosballStore;

    return (
        <div className="matches-list fs-list container column">
            <h2>Matches</h2>
            <Table
                selectable={false}>
                <TableHeader displaySelectAll={false}>
                    <TableRow selectable={false}>
                        <TableHeaderColumn>Date</TableHeaderColumn>
                        <TableHeaderColumn>Team 1</TableHeaderColumn>
                        <TableHeaderColumn>Team 2</TableHeaderColumn>
                        <TableHeaderColumn>Winner</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    { 
                        store.matchesByDate().map(
                            (match, index) => <Match key={index} {...match} />
                        ) 
                    }
                </TableBody>
            </Table>
        </div>
    )   
}

export default inject('foosballStore')(observer(MatchesList));