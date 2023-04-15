/** @format */

import express from "express";
import User from "../../models/user";
export function signUp(app: express.Express) {
  app.post(
    "/signup",
    async (
      req: {
        body: {
          username: string;
          password: string;
          confirmPassword: string;
        };
      },
      res: any
    ) => {
      try {
        if (!req.body.username) {
          res.send({ Message: "Please enter your username" });
          return;
        } else if (!req.body.password) {
          res.send({ Message: "Please enter your password!" });
          return;
        } else if (!req.body.confirmPassword) {
          res.send({ Message: "Please confirm your password!" });
          return;
        } else {
          if (req.body.confirmPassword != req.body.password) {
            res.send({ Message: "Please make sure your passwords match." });
            return;
          }
          const user = new User({
            username: req.body.username,
            password: req.body.password,
          });
          user
            .save()
            .then(() => {
              res.send({ Message: "Registration Completed" });
              return;
            })
            .catch((err: any) => {
              console.log(err.message);
              res.send({ Error: err.message });
              return;
            });
        }
      } catch (error: any) {
        res.send({ error: error.message });
        return;
      }
    }
  );
}
