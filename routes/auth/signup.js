const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const StudentUser = require("../../modals/StudentUser");
const TeacherUser = require("../../modals/TeacherUser");
const keys = require("../../config/keys");

module.exports = (app) => {
  app.post("/api/signup/student", async (req, res) => {
    let { name, email, password, standard, school } = req.body;
    console.log(name, email, password, standard, school);
    try {
      let user = await StudentUser.findOne({ email });
      // See if user exits
      if (user) {
        return res
          .status(404)
          .json({ errors: [{ msg: "You Already Have An Account" }] });
      }

      user = new StudentUser({
        name,
        email,
        password,
        standard,
        school,
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      // Save data to atlas
      await user.save(); // In atlas data will be saved

      // create jsonwebtoken
      let payload = {
        user: {
          id: user._id,
          name,
          email,
        },
      };

      jwt.sign(payload, keys.jwtSecret, { expiresIn: "40d" }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      res.status(500).send("Server Error");
      console.error("login error server: ", err.message);
    }
  });

  app.post("/api/signup/teacher", async (req, res) => {
    let { name, email, password, qualification, specialization } = req.body;

    try {
      let user = await TeacherUser.findOne({ email });
      // See if user exits
      if (user) {
        return res
          .status(404)
          .json({ errors: [{ msg: "You Already Have An Account" }] });
      }

      user = new TeacherUser({
        name,
        email,
        password,
        qualification,
        specialization,
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      // Save data to atlas
      await user.save(); // In atlas data will be saved

      // create jsonwebtoken
      let payload = {
        user: {
          id: user._id,
          name,
          email,
        },
      };

      jwt.sign(payload, keys.jwtSecret, { expiresIn: "40d" }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      res.status(500).send("Server Error");
      console.error("login error server: ", err.message);
    }
  });

  // app.post("/api/signup/student", async (req, res) => {
  //   let { name, email, password, standard, school } = req.body;

  //   try {
  //     let user = await StudentUser.findOne({ email });
  //     // See if user exits
  //     if (user) {
  //       return res
  //         .status(404)
  //         .json({ errors: [{ msg: "You Already Have An Account" }] });
  //     }

  //     user = new StudentUser({
  //       name,
  //       email,
  //       password,
  //       standard,
  //       school,
  //     });

  //     // Encrypt password
  //     const salt = await bcrypt.genSalt(10);
  //     user.password = await bcrypt.hash(password, salt);
  //     // Save data to atlas
  //     await user.save(); // In atlas data will be saved

  //     // create jsonwebtoken
  //     let payload = {
  //       user: {
  //         id: user._id,
  //         name,
  //         email,
  //       },
  //     };

  //     jwt.sign(payload, keys.jwtSecret, { expiresIn: "40d" }, (err, token) => {
  //       if (err) throw err;
  //       res.json({ token });
  //     });
  //   } catch (err) {
  //     res.status(500).send("Server Error");
  //     console.error("login error server: ", err.message);
  //   }
  // });
};
