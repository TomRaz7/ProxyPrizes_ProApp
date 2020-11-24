const url = "http://192.168.1.135:3000";

export default {
  createAccount: url + "/createAccount",
  addPost: url + "/addPost",
  getS3: url + "/getS3",
  retrieveShopPosts: url + "/retrieveShopPosts",
  retrieveUsedDiscounts: url + "/retrieveUsedDiscounts",
  retrievePendingDiscounts: url + "/retrievePendingDiscounts",
};
