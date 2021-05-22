import React, { useState, useCallback, useEffect } from "react";
import Context from "./context";
import NameInput from "./components/NameInput";
import Lottery from "./components/Lottery/Lottery";
import Lucky from "./components/Lucky";
import { getLucks } from "../../utils/getLucky";
import { css } from '@emotion/css/macro';
import { getApp } from '../../tcb';

const app = getApp();

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
  const [lucks, addLucks] = useState([]);
  const [luckyCount, setLuckyCount] = useState(1);
  const [lotteryShown, setLotteryShown] = useState(false);

  const addNames = useCallback(
    (v) => {
      const names = v.split(/,|，|\s/).filter(name => !/^\s*$/.test(name));
      addUsers([...new Set([...users, ...names])]);
    },
    [addUsers, users]
  );

  const clearNames = useCallback(() => {
    addUsers([]);
  }, [])

  const showLucky = useCallback(() => {
    addLucks(getLucks(users, luckyCount));
  }, [users, luckyCount]);

  return (
    <Context.Provider
      value={{ users, lucks, luckyCount, addLucks, addNames, setLuckyCount, clearNames }}
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