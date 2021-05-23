import { useContext, useState, useCallback, useEffect } from "react";
import Qrcode from 'qrcode.react';
import { css } from "@emotion/css";

import Context from "../context";

const styles = {
  userList: css`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    font-size: 16px;
    max-height: 400px;
    overflow: auto;
    li {
      list-style: none;
    }
  `,
  flex: css`
    display: flex;
    justify-content: space-around;
    textarea{
      height: 100px;
      width: 280px;
      padding: 5px;
    }
  `,
  name: css`
    max-width: 9em;
    overflow: hidden;
    text-overflow: ellipsis;
    background: raba(0,0,0,0.3);
    padding: 2px 5px;
    border-radius: 3px;
  `,
};

export default function NameInput(props = {}) {
  const { users = [], addNames, luckyCount, setLuckyCount, clearNames } = useContext(Context);
  const [val, setVal] = useState("");
  const handleAdd = useCallback(() => {
    addNames(val);
    setVal("");
  }, [addNames, val]);

  return (
    <div>
      <p>请输入候选人姓名 or 邀请候选人扫描下方二维码：</p>
      <div className={styles.flex}>
        <div>
          <textarea
            value={val}
            placeholder="请输入候选人姓名，可以用','分隔"
            onInput={(e) => setVal(e.target.value)}
            onKeyDown={(e) => {
              e.code === "Enter" && handleAdd();
            }}
          />
          <br/>
          <button onClick={handleAdd} style={{ width: '100%' }}>添加</button>
        </div>
        <div style={{ border: '10px solid #fff' }}>
          <Qrcode
            value={window.location.href + 'join'}
          />
        </div>
      </div>
      <div>
        <p>请填写中奖人数：
        <input
          type="number"
          value={luckyCount}
          min={1}
          max={users.length}
          onChange={(e) => setLuckyCount(+e.target.value)}/>
        </p>
      </div>

      {
        users.length ?
        <h5>
          已添加{users.length}个候选人
          <button onClick={() => clearNames()}>清空</button>
        </h5>
        : null
      }
      <ul className={styles.userList}>
        {users.map((name) => {
          return <li key={name} className={styles.name}>{name}</li>;
        })}
      </ul>
    </div>
  );
}
