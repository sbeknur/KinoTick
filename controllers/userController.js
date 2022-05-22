const UserModel = require('../models/UserModel')

exports.create = async (req, res) => {
   if (!req.body.username && !req.body.email && !req.body.password) {
      res.status(400).render('index', {
         mydata: "Content can not be empty!"
      })
   }

   const user = new UserModel({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
   });

   await user.save().then(data => {
      res.status(200).render('index', {
         mydata: "user " + data.username + " created succesfully!"
      })
   }).catch(err => {
      res.render('index', {
         mydata: err.message || "Some error occurred while creating user"
      })
   });
};

exports.findAll = async (req, res) => {
   try {
      const user = await UserModel.find();
      //res.status(200).json(user);
      res.status(200).render('index', {
         mydata: user
      })
   } catch (error) {
      res.status(404).render('index', {
         mydata: error.message
      })
      //res.status(404).json({message: error.message});
   }
};
// Find a single User with an id
exports.findOne = async (req, res) => {
   try {
      const user = await UserModel.findOne({
         email: req.query.email
      }).exec(); //change params to query
      //const user = await UserModel.findById(req.query.id); //change params to query
      //res.status(200).json(user);
      if (user === null) {
         res.status(404).render('index', {
            mydata: "user not found"
         })
      } else {
         res.status(200).render('index', {
            mydata: "user :" + user.firstName + " " +
               user.lastName + " " + user.email + " " + user.phone
         })
      }

   } catch (error) {
      //res.status(404).json({ message: error.message});
      res.status(404).render('index', {
         mydata: error.message
      })
   }
};
// Update a user by the id in the request
exports.update = async (req, res) => {

   if (!req.body.newEmail || !req.body.newFirstName || !req.body.newLastName || !req.body.newPhone) {
      //res.status(400).send({ message: "Content can not be empty!" });
      res.status(400).render('index', {
         mydata: "Data to update can not be empty!"
      })
      return
   }

   //const email = req.params.email;
   const query = req.body.oldEmail;

   //await UserModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
   await UserModel.findOneAndUpdate({
      email: query
   }, {
      email: req.body.newEmail,
      firstName: req.body.newFirstName,
      lastName: req.body.newLastName,
      phone: req.body.newPhone
   }).then(data => {
      console.log(data)
      if (!data) {
         //res.status(404).send({message: `User not found.`});
         res.status(404).render('index', {
            mydata: `User not found.`
         })
      } else {
         //res.send({ message: "User updated successfully." })
         res.status(200).render('index', {
            mydata: "User updated successfully."
         })
      }
   }).catch(err => {
      //res.status(500).send({message: err.message});
      res.status(500).render('index', {
         mydata: err.message
      })
   });
};
// Delete a user with the specified id in the request
exports.destroy = async (req, res) => {

   //await UserModel.findByIdAndRemove(req.params.id).then(data => {
   let useremail = req.body.email
   await UserModel.deleteOne({
      email: useremail
   }).then(data => {
      //await UserModel.findByIdAndRemove(req.query.id).then(data => {
      //console.log(data)
      if (data.deletedCount === 0) {
         //res.status(404).send({ message: `User not found.`});
         res.status(404).render('index', {
            mydata: "User not found"
         })

      } else {
         //res.send({message: "User deleted successfully!"});

         res.status(200).render('index', {
            mydata: "user " + useremail + " deleted succesfully!"
         })
      }
   }).catch(err => {
      //res.status(500).send({ message: err.message });
      res.status(500).render('index', {
         mydata: err.message
      })
   });
};