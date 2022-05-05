/* eslint-disable react/prop-types */
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';

function createData(gameId, player1, player2, steps, winner) {
  return { gameId, player1, player2, steps, winner };
}

export default function GameTable({ gameData, joinGame, startGame, myName }) {
  const isStarted = localStorage.getItem('isStart') === '1';

  const rows = gameData.map(({ gameId, player1, player2, steps, winner }) =>
    createData(gameId, player1, player2, steps, winner)
  );

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 250 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Game Id</TableCell>
            <TableCell>Player 1</TableCell>
            <TableCell>Player 2</TableCell>
            {rows[0].steps && <TableCell>Steps</TableCell>}
            {rows[0].winner && <TableCell>Winner</TableCell>}
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                {row.gameId}
              </TableCell>
              <TableCell>{row.player1}</TableCell>
              <TableCell>{row.player2}</TableCell>
              {row.steps && <TableCell>{row.steps}</TableCell>}
              {row.winner && <TableCell>{row.winner}</TableCell>}
              <TableCell>
                {myName &&
                  (isStarted ? (
                    <Button color="success" onClick={startGame}>
                      start
                    </Button>
                  ) : (
                    myName !== row.player1 && (
                      <Button onClick={() => joinGame(row.gameId)}>join</Button>
                    )
                  ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
