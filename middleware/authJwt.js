const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "connection require please :) !"
    });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};
isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "super_admin") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Super_admin  Role!"
      });
      return;
    });
  });
};
//cemeca role
isCemeca = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "cemeca") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require cemeca Role!"
      });
    });
  });
};
//sofitech role
isSofitech = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "sofitech") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require sofitech Role!"
      });
    });
  });
};
//sofitech admin role
isAdminSofitech = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin_sofitech") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require sofitech admin Role!"
      });
    });
  });
};
//cemeca admin role
isAdminCemeca = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin_cemeca") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require cemeca admin Role!"
      });
    });
  });
};
//sofitech super_admin role
isSuperSofitech = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "super_sofitech") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require sofitech super Role!"
      });
    });
  });
};
//cemeca super_admin role
isSuperCemeca = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "super_cemeca") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require cemeca super Role!"
      });
    });
  });
};
isModeratorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "sofitech") {
          next();
          return;
        }
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Moderator or Admin Role!"
      });
    });
  });
};
const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isCemeca:isCemeca,
  isSofitech:isSofitech,
  isSuperCemeca: isSuperCemeca,
  isSuperSofitech: isSuperSofitech,
  isAdminSofitech: isAdminSofitech,
  isAdminCemeca: isAdminCemeca,
  isModeratorOrAdmin: isModeratorOrAdmin
};
module.exports = authJwt;
