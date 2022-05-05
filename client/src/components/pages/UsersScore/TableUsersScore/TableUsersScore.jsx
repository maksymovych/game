/* eslint-disable react/prop-types */
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import Text from '../../../ui/Text/Text';
import { amber, grey, lime, orange, red, yellow } from '@mui/material/colors';

function createData(nickname, rate, id) {
  return { nickname, rate, id };
}

function TableUsersScore({ userData, userId }) {
  const getColor = (index) => {
    const firstPlace = red[900];
    const secondPlace = orange[900];
    const thirdPlace = yellow[900];

    if (!index) {
      return firstPlace;
    } else if (index === 1) {
      return secondPlace;
    } else if (index === 2) {
      return thirdPlace;
    }
    return '';
  };

  const rows = userData.map(({ nickname, rate, id }) =>
    createData(nickname, rate, id)
  );

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 250 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <Text>№</Text>
            </TableCell>
            <TableCell align="center">
              <Text>Nickname</Text>
            </TableCell>
            <TableCell align="center">
              <Text>Score</Text>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(({ rate, nickname, id }, i) => (
            <TableRow
              key={i}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                backgroundColor: userId === id ? yellow[300] : '',
              }}
            >
              <TableCell component="th" scope="row" align="center">
                <Typography color={getColor(i)}> {++i}</Typography>
              </TableCell>
              <TableCell>
                <Typography align="center" color={getColor(--i)}>
                  {nickname}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography color={getColor(i)}>{rate}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableUsersScore;
