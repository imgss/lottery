import tcb from "@cloudbase/js-sdk";

window._tcbEnv = window._tcbEnv || {};
export const envId = window._tcbEnv.TCB_ENV_ID;
export const region = window._tcbEnv.TCB_REGION;

export const getApp = () => {
  const app = tcb.init({
    env: envId || 'hello-cloudbase-0gnnbdsub035ae76',
  });
  return app;
};

export const app = getApp();

const auth = app.auth();

export async function login(){
  await auth.anonymousAuthProvider().signIn();
  // 匿名登录成功检测登录状态isAnonymous字段为true
  const loginState = await auth.getLoginState();
  return loginState.user;
}
