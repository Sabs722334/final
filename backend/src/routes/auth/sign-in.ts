/** @format */

import express from "express";
import User from "../../models/user";
export function signIn(app: express.Express) {
  app.post(
    "/signin",
    async (req: { body: { username: string; password: string } }, res: any) => {
      console.log(req.body);
      try {
        const user = await User.find({ username: req.body.username });
        console.log(user[0].password);
        if (req.body.username == user[0].username) {
          if (req.body.password == user[0].password) {
            res.send(user[0]);
            return;
          } else {
            res.send({ Error: "Invalid Password!" });
            return;
          }
        } else {
          res.send({ Error: "User does not exist!" });
          return;
        }
      } catch (error: any) {
        res.send({ error: error.message });
      }
    }
  );
}
