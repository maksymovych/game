import * as React from 'react';
import { useNavigate } from 'react-router';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { ButtonGroup } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { blue } from '@mui/material/colors';
import { fetchLogout } from '../../../store/reducers/login';

export default function ButtonAppBar() {
  const { loginForm, id } = useSelector((state) => state.login);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const styleColor = { color: blue[50] };

  const goToUsersScore = () => {
    navigate('/users_score');
  };
  const handleLogOut = () => {
    dispatch(fetchLogout(loginForm.id));
    localStorage.clear();
    navigate('../');
  };
  const goToInfo = () => {
    navigate('../info');
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            onClick={goToInfo}
          >
            Battleship
          </Typography>
          <ButtonGroup
            color="secondary"
            variant="text"
            aria-label="text button group"
          >
            {!!id && (
              <Button variant="text" sx={styleColor} onClick={goToUsersScore}>
                Users Score
              </Button>
            )}
            {!!id ? (
              <Button variant="text" sx={styleColor} onClick={handleLogOut}>
                LogOut
              </Button>
            ) : (
              <Link to="/">
                <Button sx={styleColor}>Log In </Button>
              </Link>
            )}
          </ButtonGroup>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
