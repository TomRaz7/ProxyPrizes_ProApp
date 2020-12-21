const url = "http://192.168.1.45:3000";
//const url = "http:/127.0.0.1:3306"

export default {
  createAccount: url + "/createAccount",
  fetchLogin: url + "/login",
  addPost: url + "/addPost",
  getS3: url + "/getS3",
  retrieveShopPosts: url + "/retrieveShopPosts",
  retrieveUsedDiscounts: url + "/retrieveUsedDiscounts",
  retrievePendingDiscounts: url + "/retrievePendingDiscounts",
  addExpoToken: url + "/addExpoToken",
  retrieveExpoToken: url + "/retrieveExpoToken",
  getAvaliabilityRequest: url + "/getAvaliabilityRequest",
  answerAvaliabilityRequest: url + "/answerAvaliabilityRequest",
  sendNotification: url + "/sendNotification",
  persistNewDiscount: url + "/persistNewDiscount"
};
