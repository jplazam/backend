const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const authConfig = require("../../../config/auth");

const models = require("../../../models");
const Restaurant = models.Restaurant;
const User = models.User;
const Comment = models.Comment;
const Rating_Restaurant = models.Rating_Restaurant;
const auth = require("../../../middlewares/auth");

router.get("/", (req, res) => {
  const restaurants = Restaurant.findAll().then((restaurants) => {
    res.status(200).send(restaurants);
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const restaurant = Restaurant.findByPk(id).then((restaurant) => {
    const user = User.findByPk(restaurant.user_id).then((user) => {
      const comments = Comment.findAll({ where: { restaurantId: id } }).then(
        (comments) => {
          const ratings = Rating_Restaurant.findAll({
            where: { restaurant_id: id },
          }).then((ratings) => {
            if (ratings.length == 0) {
              res.status(200).send({
                restaurant: restaurant,
                user: user,
                comments: comments,
                ratings: 0,
              });
            } else {
              // promedio ratings
              let sum = 0;
              ratings.forEach((rating) => {
                sum += rating.value;
              });
              let promedio = sum / ratings.length;

              res.status(200).send({
                restaurant: restaurant,
                user: user,
                comments: comments,
                ratings: promedio,
              });
            }
          });
        }
      );
    });
  });
});

router.post("/post", auth, async (req, res, next) => {
  const user_id = req.user_id;
  console.log(req);

  if (user_id == null) {
    res.status(401).send({ message: "No autorizado" });
  } else {
    const user = User.findOne({
      where: {
        id: user_id,
      },
    }).then((user) => {
      const { name, address, description } = req.body;
      const restaurant = Restaurant.build({
        name: name,
        address: address,
        description: description,
        user_id: user_id,
      });
      // validate
      restaurant
        .save()
        .then((restaurant) => {
          res.status(201).redirect("/restaurants");
        })
        .catch((error) => {
          res
            .status(400)
            .redirect("./create?error=" + encodeURIComponent(error.message));
        });
    });
  }
});

router.delete("/delete/:id", auth, async (req, res, next) => {
  const mail = req.mail;

  const user = User.findOne({
    where: {
      email: mail,
    },
  }).then((user) => {
    const id = req.params.id;
    Restaurant.findByPk(id).then((restaurant) => {
      if (restaurant.user_id == user.id || user.isAdmin) {
        Restaurant.destroy({
          where: {
            id: id,
          },
        }).then((restaurant) => {
          res.status(200).send({ message: "Restaurant deleted" });
        });
      } else {
        res.status(401).send({ message: "No autorizado" });
      }
    });
  });

  /* const id = req.params.id;

router.delete("/delete/:id", (req, res) => {
  //  Falta auth!!!

  const id = req.params.id;
  const restaurant = Restaurant.findByPk(id)
    .then((restaurant) => {
      restaurant.destroy();
    })
    .catch((error) => {
      res.status(400).send(error);
    }); */
});

router.delete("/:restaurant_id/comment/delete/:id", (req, res) => {
  //  Falta auth!!!

  const restaurant_id = req.params.restaurant_id;
  const id = req.params.id;
  const comment = Comment.findByPk(id)
    .then((comment) => {
      comment.destroy();
      res.status(200).send(" comentario eliminado ");
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

router.post("/:id/comment/create", (req, res) => {
  //  Falta auth!!!

  const restaurant_id = req.params.id;
  const token = req.cookies["jwtoken"];
  if (token) {
    const mail = jwt.verify(token, authConfig.secret);
    res.header("Access-Control-Allow-Credentials", true);
    res.header(
      "Access-Control-Allow-Origin",
      "https://g40-web-2022-1-fe.herokuapp.com"
    );
    const user = User.findOne({
      where: {
        id: mail.user,
      },
    }).then((user) => {
      const comment = Comment.build({
        userId: user.id,
        restaurantId: restaurant_id,
        content: req.body.content,
      });

      comment
        .save()
        .then((comment) => {
          res.status(201).redirect("/restaurants/" + restaurant_id);
        })
        .catch((error) => {
          res
            .status(400)
            .redirect("./create?error=" + encodeURIComponent(error.message));
        });
    });
  }
});

router.post("/:id/rating/create", (req, res) => {
  //  Falta auth!!!

  const restaurant_id = req.params.id;
  const token = req.cookies["jwtoken"];
  if (token) {
    const mail = jwt.verify(token, authConfig.secret);
    res.header("Access-Control-Allow-Credentials", true);
    res.header(
      "Access-Control-Allow-Origin",
      "https://g40-web-2022-1-fe.herokuapp.com"
    );
    const user = User.findOne({
      where: {
        id: mail.user,
      },
    }).then((user) => {
      const existingRating = Rating_Restaurant.findAll({
        where: {
          user_id: user.id,
          restaurant_id: restaurant_id,
        },
      }).then((existingRating) => {
        if (existingRating.length === 0) {
          const rating_restaurant = Rating_Restaurant.build({
            user_id: user.id,
            restaurant_id: restaurant_id,
            value: req.body.rating,
          });

          rating_restaurant
            .save()
            .then((comment) => {
              res.status(201).redirect("/restaurants/" + restaurant_id);
            })
            .catch((error) => {
              res
                .status(400)
                .redirect(
                  "./create?error=" + encodeURIComponent(error.message)
                );
            });
        } else {
          res
            .status(401)
            .redirect(
              "../.?error=" +
                encodeURIComponent("Este usuario ya calificó este restaurante")
            );
        }
      });
    });
  }
});

module.exports = router;
