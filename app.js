const express = require("express");
const app = express();
const db = require("./models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Products = require("./demodata/products");
const dotenv = require("dotenv");


const PORT = 8080 || process.env.PORT;

dotenv.config();

app.use(express.json());

// ************** Home Page API ********************

app.get("/", (req, res) => {
  res.send("I am Working...");
});

// ************** Signup API ********************

app.post("/api/signup", (req, res) => {
  const data = {
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 12),
  };

  db.Users.create(data)
    .then((user) => {
      res.status(200).json({
        username: user.username,
        email: user.email,
        _id: user._id,
        token: jwt.sign(
          {
            username: user.username,
            email: user.email,
            _id: user._id,
          },
          process.env.JWT_SECRET
        ),
        message: "UserID created successfully!",
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json({ Err: "User already exists!" });
    });
});

// ************** Login API ********************

app.post("/api/login", (req, res) => {
  db.Users.findOne({ email: req.body.email }).then((userInfo) => {
    if (userInfo) {
      if (bcrypt.compareSync(req.body.password, userInfo.password)) {
        res.status(200).json({
          username: userInfo.username,
          email: userInfo.email,
          _id: userInfo._id,
          token: jwt.sign(
            {
              username: userInfo.username,
              email: userInfo.email,
              _id: userInfo._id,
            },
            "stupidprogrammer"
          ),
          message: "User logged in successfully!",
        });
      } else {
        res.status(404).json({
          errMsg: "Email or Password is incorrect!",
        });
      }
    } else {
      res.status(404).json({
        errMsg: "User does not exists!",
      });
    }
  });
});

// ************** Add Products API ********************

// app.get("/api/addproducts",(req,res)=>{

//   db.Products.create(Products)
//     .then((products) => {
//       console.log(products);
//       res.status(200).json({products_array: products})
//     })
//     .catch((error) => {
//       console.log(error);
//       res.status(404).json({ Err: "Data not inserted!" });
//     });

// })


// ************** Running the server ********************

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
