var express = require("express");
var mysql = require("mysql");
require("dotenv").config(); //to read env variables defined in the .env
var http = require("http");
var bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");

//Finished:
// register/create account and shop (they are clustered in the same form)
// create post with fully functional uploading image and inserting into the database
// retrieve shop's posts
// retrieve used discounts
// retrieve pending discounts

//Config
const port = process.env.SERVER_PORT;

const server = express();

server.use(bodyParser.json({ type: "application/json" }));
server.use(bodyParser.urlencoded({ extended: true }));

server.listen(port, () => {
  console.log(`Server listening on port : ${port}`);
});

//Configure the Database connection
var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect(function (error) {
  if (error) {
    console.log(error);
  } else {
    console.log(`Connected to database : ${process.env.DB_NAME}`);
  }
});

server.post("/createAccount", function (req, res) {
  //affect the request parameters values to local variables
  var userPassword = req.body.password;
  var userMail = req.body.email;
  var userName = req.body.name;
  var userForname = req.body.forname;
  var userPicture = req.body.picture;
  var userPhone = req.body.phone;
  var userSiret = req.body.siret;
  var shopName = req.body.shopname;
  var shopAdress = req.body.shopaddress;
  var shopCity = req.body.shopcity;
  var shopLatitude = req.body.shoplatitude;
  var shopLongitude = req.body.shoplongitude;
  var shopWebsite = req.body.shopwebsite;
  var shopID = 0;

  var result = null;

  var responseObject = {
    code: null,
    mail: req.body.email,
  };

  connection.query(
    `INSERT INTO owner(name, forname, picture, email, password, phone, siret) VALUES ('${userName}','${userForname}','${userPicture}','${userMail}','${userPassword}','${userPhone}','${userSiret}');`,
    function (error, rows, fields) {
      if (error) {
        console.log("Error");
      } else {
        result = rows;
        if (result !== null) {
          responseObject.code = 200;
          res.send(responseObject);
          console.log("Inserted in table owner!");
          //console.log(result);
          shopID = result.insertId;

          connection.query(
            `INSERT INTO shop(name, adress, city, latitude, longitude, email, phone, website, owner) VALUES('${shopName}','${shopAdress}','${shopCity}','${shopLatitude}','${shopLongitude}','${userMail}','${userPhone}','${shopWebsite}','${shopID}');`,
            function (error, rows, fields) {
              if (error) {
                throw error;
              } else {
                console.log("Inserted in table shop!");
              }
            }
          );
        }
      }
    }
  );
});

server.post("/addPost", function (req, res) {
  console.log(req.body);
  var data = {
    title: req.body.title,
    description: req.body.description,
    picture: req.body.picture,
    price: req.body.price,
    likeCounter: 0,
    publishedAt: req.body.publishedAt,
    shop: req.body.shop,
    owner: req.body.owner,
    customer: req.body.customer,
    categorytag: req.body.categorytag,
  };
  var sql = "INSERT INTO post SET ?";
  connection.query(sql, data, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send({
      status: "Data inserted!",
    });
  });
});

//get s3 credentials
server.get("/getS3", (req, res) => {
  const answer = {
    accessKey: process.env.AKID,
    secretKey: process.env.SAK,
  };
  res.send(answer);
});

// retrieve posts related to this shop
server.post("/retrieveShopPosts", function (req, res) {
  var shop = req.body.shop;
  var owner = req.body.owner;
  console.log(shop);
  connection.query(
    `SELECT * FROM post WHERE shop = ${shop} AND owner = ${owner};`,
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        console.log(`Posts from the shop:`);
        console.log(rows);
        res.send(rows);
      }
    }
  );
});

// Retrieve used discounts
server.post("/retrieveUsedDiscounts", function (req, res) {
  console.log("/retrieveUsedDiscounts hitted");
  var shop = req.body.shop;
  connection.query(
    `SELECT * FROM discount WHERE shop = ${shop} AND status = 'used';`,
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        console.log("Used discounts:");
        console.log(rows);
        res.send(rows);
      }
    }
  );
});

// Retrieve pending discounts
server.post("/retrievePendingDiscounts", function (req, res) {
  console.log("/retrievePendingDiscounts hitted");
  var shop = req.body.shop;
  connection.query(
    `SELECT * FROM discount WHERE shop = ${shop} AND status = 'pending';`,
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        console.log("Pending discounts:");
        console.log(rows);
        res.send(rows);
      }
    }
  );
});
