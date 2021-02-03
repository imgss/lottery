import { useContext, useState, useCallback } from 'react';
import { css } from '@emotion/css';

import  Context from "./context";
import logo from '../logo.svg';

const styles = {
    userList: css`
        display: flex;
        flex-wrap: wrap;
        gap: 40px;
        font-size: 16px;
        li {
            list-style: none;
        }
    `
}

export default function NameInput(props = {}) {
    const {
        users = [],
        addNames,
    } = useContext(Context);
    const[val, setVal] = useState('');
    const handleAdd = useCallback(() => {
        console.log(val);
        addNames(val);
        setVal('');
    }, [addNames, val]);
    return (
        <div>
          <img src={logo} className="App-logo" alt="logo" />
        <p>
          请输入候选人姓名
        </p>
            <input
                type="text"
                value={val}
                onInput={e => setVal(e.target.value)}
                onKeyDown={e => {
                    console.log(e);
                    e.code === 'Enter' && handleAdd()
                }}
            />
            <button
                onClick={handleAdd}
            >
                添加
            </button>
            <h5>已添加{users.length}个候选人</h5>
            <ul className={styles.userList}>
                {users.map((name) => {
                    return <li key={name}>
                        {name}
                        </li>
                })}
            </ul>
        </div>
    )
}