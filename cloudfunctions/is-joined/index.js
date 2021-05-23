const cloud = require("@cloudbase/node-sdk");
const app = cloud.init({
  env: cloud.SYMBOL_CURRENT_ENV,
});
const db = app.database();

exports.main = async (event, context) => {
  try {
    const res = await db.collection('joiners').where(event).get();
    const allData = await db.collection('joiners').count()
    return {
      isJoined: res.data.length > 0,
      joinedCount: allData.total,
      success: true,
      message: 'success',
    };
  } catch (err) {
    return {
      success: false
    }
  }

};