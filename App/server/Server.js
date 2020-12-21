var express = require("express");
var mysql = require("mysql");
require("dotenv").config(); //to read env variables defined in the .env
var http = require("http");
var bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");

const fetch = require("node-fetch");

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

//Login function
server.post("/login", function (req, res) {
  console.log("login endpoint hitted");
  var tableToQUery = req.body.table;
  var userMail = req.body.email;
  var userPassword = req.body.password;

  if (tableToQUery === "owner") {
    connection.query(
      `SELECT * FROM owner WHERE email = '${userMail}' AND password = '${userPassword}';`,
      function (error, rows, fields) {
        if (error) {
          console.log(error);
        } else {
          if (rows[0] !== undefined) {
            var user = rows[0];
            console.log(user);
            jwt.sign({ user: user }, "secretKey", (err, token) => {
              res.json({
                code: 200,
                user: user,
                token: token,
              });
            });
          } else {
            res.json({
              code: 404,
            });
          }
        }
      }
    );
  }
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

// delete post function
server.post("/deletePost", function (req, res) {
  console.log("/deletePost hitted");
  var postId = req.body.postId;

  var dbQuery = `DELETE FROM post WHERE id =${postId};`;

  connection.query(dbQuery, function (error, rows, fields) {
    if (error) {
      console.log(error);
    } else {
      console.log("Post deleted.");
      //console.log(rows);
      res.send(rows);
    }
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
    `SELECT * FROM post WHERE shop = ${shop};`,
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        //console.log(`Posts from the shop:`);
        //console.log(rows);
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
        //console.log("Used discounts:");
        console.log("Used discounts retrieved.");
        //console.log(rows);
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
        //console.log("Pending discounts:");
        console.log("Pending discounts retrieved.");
        //console.log(rows);
        res.send(rows);
      }
    }
  );
});

server.post("/getAvaliabilityRequest", function (req, res) {
  console.log("/getAvaliabilityRequest hitted");
  var shop = req.body.shop;
  connection.query(
    `SELECT * FROM request WHERE shop = ${shop} AND status = 'pending';`,
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        console.log("getAvaliabilityRequest OK.");
        res.send(rows);
      }
    }
  );
});

server.post("/answerAvaliabilityRequest", function (req, res) {
  console.log("/answerAvaliabilityRequest hitted");
  var id = req.body.id;
  var avaliable = req.body.avaliable;

  if (avaliable === "avaliable") {
    var dbQuery = `UPDATE request SET status = 'answered', answer = 'avaliable' WHERE id = ${id};`;
  } else if (avaliable === "not avaliable") {
    var dbQuery = `UPDATE request SET status = 'answered', answer = 'not avaliable' WHERE id = ${id};`;
  }
  connection.query(dbQuery, function (error, rows, fields) {
    if (error) {
      console.log(error);
    } else {
      console.log("answerAvaliabilityRequest OK.");
      res.send(rows);
    }
  });
});

server.post("/retrieveExpoToken", function (req, res) {
  console.log("/retrieveExpoToken hitted");
  var userId = req.body.userId;
  var action = req.body.toWho;

  if (action === "single") {
    var dbQuery = `SELECT expoToken FROM customer WHERE id = ${userId};`;
  } else if (action === "all") {
    var dbQuery = `SELECT expoToken FROM customer;`;
  }

  connection.query(dbQuery, function (error, rows, fields) {
    if (error) {
      console.log(error);
    } else {
      //console.log("Table updated!");
      console.log("retrieveExpoToken OK");
      //console.log(rows[0].expoToken);
      res.send(rows);
    }
  });
});

server.post("/addExpoToken", function (req, res) {
  console.log("/addExpoToken hitted");
  var user = req.body.userId;
  var expoToken = req.body.expoToken;
  connection.query(
    `UPDATE owner SET expoToken='${expoToken}' WHERE id =${user};`,
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        console.log("Table updated! (expoToken)");
        //console.log(rows);
        res.send(rows);
      }
    }
  );
});

server.post("/sendNotification", function (req, res) {
  console.log("/sendNotification hitted");
  // create the content of the notifications
  const message = {
    to: req.body.expoToken, // token of device that will receive notifications
    sound: "default",
    title: req.body.notificationTitle, // title
    body: req.body.notificationBody, // body
  };
  console.log(message);
  // Sends notification to the expo server, then he will deliver it within 30min
  fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    body: JSON.stringify(message),
    headers: {
      host: "exp.host",
      accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      // sends the response, with status and receipt id (for checking wheter or not the device received the notification)
      res.send(responseJson);
    });
});

server.post("/persistNewDiscount", function(req,res){
  console.log("/persistNewDiscount hitted");
  console.log(req.body);
  var validity = new Date().toJSON().slice(0, 10);
  var status = 'pending';
  var percent = req.body.discountValue;
  var shop = req.body.shop;
  var beneficiary = req.body.beneficiary;
  connection.query(`INSERT INTO discount( percent, validity, status, beneficiary, shop) VALUES (${percent},${validity},'${status}',${beneficiary},${shop});`, function(error, rows, fields){
    if(error){
      console.log(error);
    }
    else{
      console.log("Discount inserted");
      res.send(rows);
    }
  });
});
