const cloud = require("@cloudbase/node-sdk");
const app = cloud.init({
  env: cloud.SYMBOL_CURRENT_ENV,
});
const db = app.database();

exports.main = async (event, context) => {
   console.log(JSON.stringify({event, context}));

  await db.collection('joiners').add(event);
  return {
    result: event,
    success: true,
    message: '参加成功',
  };
};