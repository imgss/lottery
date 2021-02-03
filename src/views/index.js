import React, {useState, useCallback} from 'react';
import Context from './context';
import NameInput from './NameInput';
import Lottery from './Lottery';

export default function LotteryApp() {
    const [users, addUsers] = useState([]);
    const [lucks, addLucks] = useState([]);
    const [lotteryShown, setLotteryShown] = useState(false);
    const addNames = useCallback((v) => {
        addUsers([...new Set([...users, ...v.split(/,|，|\s/)])])
    }, [addUsers, users]);
    return (
        <Context.Provider
            value={{users, lucks, addLucks, addNames}}
        >
            {
              !lotteryShown
                ? <NameInput />
                : <Lottery />
            }
          <div>
            <button
              onClick={() => setLotteryShown(true)}
            >
              抽 奖
            </button>
            <button
            >
              开 奖
            </button>
            <button
              onClick={() => setLotteryShown(false)}
            >
              返 回
            </button>
          </div>
        </Context.Provider>
    )
}