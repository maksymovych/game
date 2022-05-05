/* eslint-disable react/no-unescaped-entities */
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useNavigate } from 'react-router';
import FormContainer from '../../ui/Containers/FormContainer/FormContainer';
import HeaderText from '../../ui/Text/HeaderText';

function GameInfo() {
  const navigate = useNavigate();

  const goToBack = () => {
    navigate('../');
  };

  return (
    <>
      <HeaderText>Rules:</HeaderText>

      <FormContainer>
        <Typography>
          Each ship must be placed horizontally or vertically across grid
          spaces—not diagonally—and the ships can't hang off the grid. Ships can
          touch each other, but they can't occupy the same grid space. You
          cannot change the position of the ships after the game begins.
        </Typography>
        <Typography sx={{ py: '10px', fontWeight: 'bold' }}>
          Basic Rules:
        </Typography>
        <Typography>
          Players take turns firing shots (by calling out a grid coordinate) to
          attempt to hit the opponent's enemy ships. On your turn, call out a
          letter and a number that identifies a row and column on your target
          grid. Your opponent checks that coordinate on their ocean grid and
          verbally responds "miss" if there is no ship there, or "hit" if you
          have correctly guessed a space that is occupied by a ship. Mark each
          of your shots or attempts to fire on the enemy using your target grid
          (upper part of the board) by using white pegs to document your misses
          and red pegs to register your hits. As the game proceeds, the red pegs
          will gradually identify the size and location of your opponent's
          ships. When it is your opponent's turn to fire shots at you, each time
          one of your ships receives a hit, put a red peg into the hole on the
          ship corresponding to the grid space. When one of your ships has every
          slot filled with red pegs, you must announce to your opponent when
          your ship is sunk. In classic play, the phrase is "You sunk my
          battleship!" The first player to sink all five of their opponent's
          ships wins the game.
        </Typography>

        <Button onClick={goToBack}>Go back</Button>
      </FormContainer>
    </>
  );
}

export default GameInfo;
