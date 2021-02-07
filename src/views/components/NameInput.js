import { useContext, useState, useCallback } from "react";
import { css } from "@emotion/css";

import Context from "../context";

const styles = {
  userList: css`
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
    font-size: 16px;
    max-height: 400px;
    overflow: auto;
    li {
      list-style: none;
    }
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
      <p>请输入候选人姓名 </p>
      <div>
        <input
          type="text"
          value={val}
          onInput={(e) => setVal(e.target.value)}
          onKeyDown={(e) => {
            console.log(e);
            e.code === "Enter" && handleAdd();
          }}
        />
        <button onClick={handleAdd}>添加</button>
      </div>
      <div>
        <p>中奖人数</p>
        <input
          type="number"
          value={luckyCount}
          min={1}
          max={users.length}
          onChange={(e) => setLuckyCount(+e.target.value)}/>
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
          return <li key={name}>{name}</li>;
        })}
      </ul>
    </div>
  );
}
