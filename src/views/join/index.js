import React, { useState, useCallback, useEffect } from "react";
import { Button, List, InputItem, WingBlank, WhiteSpace, Result } from 'antd-mobile';
import { app, login } from '../../tcb';
import HappyIcon from './img/happy.svg';

export default function Join() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [ID, setID] = useState('');
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    login().then((user) => {
      setUser(user);
      app.callFunction({
        name: 'is-joined',
        data: {
          uid: user.uid
        }
      }).then(({ result = {} }) => {
        setIsJoined(result.isJoined);
      }).catch(console.error)
    })
  }, []);

  const handleJoin = function() {
    console.log(user);
    const { uid } = user;

    app.callFunction({
      name: 'join',
      data: {
        uid,
        name,
        id: ID,
      }
    }).then(console.log).catch(console.error);
  }

  if (isJoined) {
    return <Result 
      style={{ background: 'rgba(255,255,255,0.8)', height: '100vh' }}
      imgUrl={HappyIcon}
      title="加入成功"
      message="相信你就是那个锦鲤～"
    />
  }

  return (
    <WingBlank>
      <h2>加入抽奖</h2>
      <List>
        <InputItem
          placeholder="请输入您的姓名"
          onChange={setName}
          value={name}
        >
          您的姓名：
        </InputItem>
        <InputItem
          placeholder="请输入您的工号"
          value={ID}
          onChange={setID}
        >
          您的工号：
        </InputItem>
      </List>
      <WhiteSpace size="lg" />
      <Button type="primary" onClick={handleJoin}>提交</Button>
    </WingBlank>
  )
}