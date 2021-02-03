import {createContext} from 'react';

const LotteryContext = createContext({
    users: [],
    lucks: [],
});

export default LotteryContext;