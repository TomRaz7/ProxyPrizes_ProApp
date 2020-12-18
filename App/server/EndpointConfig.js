const url = "http://192.168.1.127:4849";
//const url = "http:/127.0.0.1:3306"
export default {
  createAccount: url + "/createAccount",
  addPost: url + "/addPost",
  getS3: url + "/getS3",
  retrieveShopPosts: url + "/retrieveShopPosts",
  retrieveUsedDiscounts: url + "/retrieveUsedDiscounts",
  retrievePendingDiscounts: url + "/retrievePendingDiscounts",
};
