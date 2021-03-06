import React, { useState, useEffect } from "react";
import { Button, List, InputItem, WingBlank, WhiteSpace, Result, Toast } from 'antd-mobile';
import { app, login } from '../../tcb';
import HappyIcon from './img/happy.svg';

export default function Join() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [ID, setID] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const [total, setTotal] = useState(0);

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
        setTotal(result.joinedCount);
      }).catch(console.error)
    })
  }, []);

  const handleJoin = () => {
    const { uid } = user;
    if (!name || /\s+/.test(name)) {
      Toast.info('请输入姓名');
      return;
    }
    if (!ID || /\s+/.test(ID)) {
      Toast.info('请输入工号');
      return;
    }

    app.callFunction({
      name: 'join',
      data: {
        uid,
        name,
        id: ID,
      }
    }).then(({ result }) => {
      if (result.success) {
        setIsJoined(true);
      }
    }).catch((err) => {
      Toast.info('加入失败');
    });
  }

  if (isJoined) {
    return <Result 
      style={{ background: 'rgba(255,255,255,0.8)', height: '100vh' }}
      imgUrl={HappyIcon}
      title="加入成功!"
      message={<div>已经有{total}名小伙伴参与抽奖<br />相信你就是那个锦鲤～</div>}
    />
  }

  return (
    <WingBlank>
      <h2>加入抽奖</h2>
      <List>
        <InputItem
          placeholder="请输入您的姓名"
          onChange={setName}
          required
          value={name}
        >
          您的姓名：
        </InputItem>
        <InputItem
          placeholder="请输入您的工号"
          value={ID}
          onChange={setID}
          required
        >
          您的工号：
        </InputItem>
      </List>
      <WhiteSpace size="lg" />
      <Button type="primary" onClick={handleJoin}>提交</Button>
    </WingBlank>
  )
}