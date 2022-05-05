/* eslint-disable react/react-in-jsx-scope */
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

export const letters = [' ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
export const steps = {
  ship: <CloseOutlinedIcon sx={{ fontSize: 25 }} />,
  dot: <Brightness1Icon sx={{ mb: '3px', fontSize: 10 }} />,
  bomb: <LocalFireDepartmentIcon color="error" sx={{ fontSize: 25 }} />,
};
 export const FIELD_SIZE = 10;

//4 => new point
//3 => ship
//2 => hit
//1 => miss
//0 => not available
//-1 => empty
export const MARK = {
  new: 4, ship: 3, hit: 2, miss: 1, notAvailable: 0, empty: -1
};

export const SHIP_TYPE = {
  FOUR: 4,
  THREE: 3,
  TWO: 2,
  ONE: 1,
};

export const SHIPS = {
  [SHIP_TYPE.ONE]: { size: 1, amount: 4 },
  [SHIP_TYPE.TWO]: { size: 2, amount: 3 },
  [SHIP_TYPE.THREE]: { size: 3, amount: 2 },
  [SHIP_TYPE.FOUR]: { size: 4, amount: 1 },
};