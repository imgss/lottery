const cloud = require("@cloudbase/node-sdk");
const app = cloud.init({
  env: cloud.SYMBOL_CURRENT_ENV,
});
const db = app.database();

exports.main = async (event, context) => {
  try {
    const res = await db.collection('joiners').where(event).get();
    return {
      isJoined: res.data.length > 0,
      success: true,
      message: 'success',
    };
  } catch (err) {
    return {
      success: false
    }
  }

};