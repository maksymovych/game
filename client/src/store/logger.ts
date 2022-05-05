import { createLogger } from 'redux-logger';

export const logger = createLogger({
  duration: true,
  collapsed: true,
  colors: {
    title: (action: { error: any }) => (action.error ? '#ed1539' : '#15e2ed'),
    prevState: () => '#1c28d4',
    action: () => '#69b851',
    nextState: () => '#e6bf40',
    error: () => '#b5181b',
  },
});
