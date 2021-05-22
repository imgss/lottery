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