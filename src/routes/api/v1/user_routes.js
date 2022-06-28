const express = require("express");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const models = require("../../../models");
const authConfig = require("../../../config/auth");
const User = models.User;
const cookieParser = require("cookie-parser");
const { urlencoded } = require("express");

router.use(cookieParser());

router.post("/signup/", (req, res) => {
  // password = confirmPassword
  if (req.body.password === req.body.confirmpassword) {
    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((existingUser) => {
      // check if email exists
      if (existingUser) {
        res.status(400).json({ msg: "Email already registrated" });
      } else {
        // password not empty
        if (req.body.password) {
          let password = bcrypt.hashSync(
            req.body.password,
            Number.parseInt(authConfig.rounds)
          );

          const user = User.build({
            name: req.body.name,
            email: req.body.email,
            password: password,
          });

          user
            .save({})
            .then((user) => {
              let token = jwt.sign({ user: user.id }, authConfig.secret, {
                expiresIn: authConfig.expires,
              });
              res.cookie("jwtoken", token, { maxAge: 3600000 });
              res.redirect("/");
            })
            .catch((err) => {
              res
                .status(500)
                .redirect(".?error=" + encodeURIComponent(err.message));
            });
        } else {
          res
            .status(400)
            .redirect(".?error=" + encodeURIComponent("Password is empty"));
        }
      }
    });
  } else {
    res
      .status(400)
      .redirect("./?error=" + encodeURIComponent("Passwords do not match"));
  }
});

router.post("/login/", (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (!user) {
      res
        .status(400)
        .redirect(
          "./?error=" + encodeURIComponent("Email and password do not match")
        );
    } else {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        let token = jwt.sign({ user: user.id }, authConfig.secret, {
          expiresIn: authConfig.expires,
        });
        res.cookie("jwtoken", token, { maxAge: 3600000 });
        res.redirect("/");
      } else {
        res
          .status(400)
          .redirect("./?error=" + encodeURIComponent("Incorrect Password"));
      }
    }
  });
});

router.post("/signout/", (req, res) => {
  res.clearCookie("jwtoken");
  res.redirect("/");
});

router.post("/deleteuser/", (req, res) => {
  const token = req.cookies["jwtoken"];
  const tokenvalue = jwt.verify(token, authConfig.secret);
  const user = User.findOne({
    where: {
      id: tokenvalue.user,
    },
  })
    .then((user) => {
      user.destroy();
    })
    .catch((error) => {
      res.status(400).send(error);
    });
  res.clearCookie("jwtoken");
  res.redirect("/");
});

router.get("/", (req, res) => {
  const token = req.cookies["jwtoken"];
  if (token) {
    const mail = jwt.verify(token, authConfig.secret);
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", "https://g40-web-2022-1-fe.herokuapp.com");
    const user = User.findOne({
      where: {
        id: mail.user,
      },
    }).then((user) => {
      res.status(200).send(user);
    });
  } else {
    res.status(200).send("empty");
  }
});

router.post("/edituser/", (req, res) => {
  if (req.body) {
    const token = req.cookies["jwtoken"];
    const tokenvalue = jwt.verify(token, authConfig.secret);
    const user = User.findOne({
      where: {
        id: tokenvalue.user,
      },
    }).then((user) => {
      if (bcrypt.compareSync(req.body.oldpassword, user.password)) {
        if (req.body.name && req.body.email && req.body.password) {
          let password = bcrypt.hashSync(
            req.body.password,
            Number.parseInt(authConfig.rounds)
          );
          user.update({
            name: req.body.name,
            email: req.body.email,
            password: password,
          });
          res.redirect("/profile");
        } else if (req.body.name && req.body.email) {
          user.update({
            name: req.body.name,
            email: req.body.email,
          });
          res.redirect("/profile");
        } else if (req.body.name && req.body.password) {
          let password = bcrypt.hashSync(
            req.body.password,
            Number.parseInt(authConfig.rounds)
          );
          user.update({
            name: req.body.name,
            password: password,
          });
          res.redirect("/profile");
        } else if (req.body.email && req.body.password) {
          let password = bcrypt.hashSync(
            req.body.password,
            Number.parseInt(authConfig.rounds)
          );
          user.update({
            email: req.body.email,
            password: password,
          });
          res.redirect("/profile");
        } else if (req.body.name) {
          user.update({
            name: req.body.name,
          });
          res.redirect("/profile");
        } else if (req.body.email) {
          user.update({
            email: req.body.email,
          });
          res.redirect("/profile");
        } else if (req.body.password) {
          let password = bcrypt.hashSync(
            req.body.password,
            Number.parseInt(authConfig.rounds)
          );
          user.update({
            password: password,
          });
          res.redirect("/profile");
        } else {
          res.status(400)
             .redirect(".?error=" + encodeURIComponent("Input can not be empty"));
        }
      } else {
        res.status(400)
          .redirect(".?error=" + encodeURIComponent("Old password does not match your old password"));
      }
    });
  } else {
    res.status(400)
       .redirect(".?error=" + encodeURIComponent("Input can not be empty"));
  }
});

module.exports = router;
