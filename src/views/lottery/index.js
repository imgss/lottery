import React, { useState, useCallback, useEffect, useMemo } from "react";
import Context from "./context";
import NameInput from "./components/NameInput";
import Lottery from "./components/Lottery/Lottery";
import Lucky from "./components/Lucky";
import { getLucks } from "../../utils/getLucky";
import { css } from '@emotion/css/macro';

import { login, app } from "../../tcb";


const styles = {
  btns: css`
    position: fixed;
    z-index: 2;
    bottom: 20px;
    right: 20px;
  `
};

export default function LotteryApp() {
  const [users, addUsers] = useState([]);
  const [remoteUsers, setRemoteUsers] = useState([]);
  const [lucks, addLucks] = useState([]);
  const [luckyCount, setLuckyCount] = useState(1);
  const [lotteryShown, setLotteryShown] = useState(false);

  const addNames = useCallback(
    (v) => {
      let names = [];
      if (typeof v === 'string') {
        names = v.split(/,|，|\s/).filter(name => !/^\s*$/.test(name));
      } else {
        names = v;
      }

      addUsers([...new Set([...users, ...names])]);
    },
    [users]
  );

  const clearNames = useCallback(() => {
    addUsers([]);
  }, [])

  const showLucky = useCallback(() => {
    addLucks(getLucks(users, luckyCount));
  }, [users, luckyCount]);

  useEffect(() => {
    let intervalId = null;
    login().then(() => {
      intervalId = setInterval(() => {
        app.callFunction({
          name: 'get-all-joiners',
        }).then(({ result }) => {
          const names = result.joiners.map(({ name, id }) => `${name}-${id}`);
          setRemoteUsers(names);
        });
      }, 2000);
      console.log(intervalId);
    });
    return () => clearInterval(intervalId);
  }, []);

  const allUsers = useMemo(() => {
    return [...new Set([...users, ...remoteUsers])]
  }, [users, remoteUsers])

  return (
    <Context.Provider
      value={{ users: allUsers, lucks, luckyCount, addLucks, addNames, setLuckyCount, clearNames }}
    >
      {!lotteryShown ? <NameInput /> : <Lottery />}
      {lucks.length ? <Lucky lucks={lucks} /> : null}
      <div className={styles.btns}>
        <button
          onClick={() => setLotteryShown(true)}
          disabled={users.length === 0}
        >抽 奖</button>
        <button onClick={showLucky}>开 奖</button>
        <button onClick={() => {
          addLucks([]);
          setLotteryShown(false);
        }}>返 回</button>
      </div>
    </Context.Provider>
  );
}
