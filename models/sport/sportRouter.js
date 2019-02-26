const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const passport = require('passport');

const { Sports } = require("./model");
const { User } = require("./../user/model");
const { router: authRouter, localStrategy, jwtStrategy } = require('./../../auth');

passport.use(localStrategy);
passport.use(jwtStrategy);

const jwtAuth = passport.authenticate('jwt', { session: false });

router.get("/", jwtAuth, (req, res) => {
  
  Sports
   .find().populate('User', 'username') 
   //.limit(5)
 .then(sports =>{
   res.json(sports)
   
 })
 .catch(err => {
   console.error(err)
   res.status(500).json({error: `something went wrong`});
 });

});

  // can also request by ID
router.get("/:id", (req, res) => {

       Sports.
         find({person:req.params.id})
          .then(sports => {
           res.json(sports);
             })
        .catch(err => {
          console.error(err)
         res.status(500).json({error: `something went wrong`});       
      });
  });
  
  //adding to find item by value:
  
router.get("/", (req, res) => {
      
      const filters = {};
      const queryableFields = ['person'];
      queryableFields.forEach(field => {
          if (req.query[field]){
              filters[filed] = req.query[field];
          }
      });
      User.find({username:filters.person})
      .then(user => {
        filters.person = user._id;
        Sports
        .find(filters)
        console.log(filter)
        .then(Sports => res.json (
           Sports.map(sport => sport.serialize())
        ))
        .catch(err => {
            console.error(err);
            res.status(500).json({message:`Internal server error`})
        });
      })   
  });



  //This is to post a new activity for registered user
  // if not a registered user, error message should be shown
router.post("/create", jwtAuth, (req, res, next) => {

  let username = req.user.username;
  
  User.findOne({"username":username})
      .then( user => {
        console.log(req.body);
           Sports.create({
              person : user._id,
              activity: req.body.activity,
              distanceCovered: req.body.distanceCovered,
              timeElapsed: req.body.timeElapsed,
              location: req.body.location,
              comment: req.body.comment
            })
          .then(sport => {
            
            res.status(201).json(sport.serialize())   
          })         
      })    
});


router.put("/:id", jwtAuth, (req, res) => {
	console.log(req.user);

    //let username = req.user.username;

   let id = req.body.id;
   
     console.log(id)
	 console.log(req.params.id);
    

    if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
  // if (!(req.params.username && req.body.username && req.params.username === req.body.username)) {
      const message =

        `Request path id (${req.params.id}) and request body id ` +
        `(${req.body.id}) must match`;
      console.error(message);
      return res.status(400).json({ message: message });
    }

    const toUpdate = {};
    const updateableFields = ['person', 'location','activity', 'timeElapsed', 'distanceCovered', 'comment'];
  
    updateableFields.forEach(field => {
      if (field in req.body) {
        toUpdate[field] = req.body[field];
      }
    });
    console.log('is this working');
  let username = req.user.username;
  User.findOne({"username":username})
    .then( user => {
       console.log(user);
       
      toUpdate.person = user._id;
      //toUpdate.person = username;
      Sports
        .findByIdAndUpdate(req.params.id, { $set: toUpdate })
        //findOneAndUpdate(req.params.id, {$set: toUpdate})
        .then(() => res.status(201).json({message:"success"}))
        .catch(err => res.status(500).json({ message: "Internal server error" }));
        
    });
});
  
router.delete("/:id", (req, res) => {
	console.log(req.params.id)
	Sports.findByIdAndDelete(req.params.id)
	
      .then(sport => res.status(204).end())
      .catch(err => res.status(500).json({ message: "Internal server error" }));
  });
  
  // Show 'not found' message if client makes request to non-existent endpoint
router.use("*", function(req, res) {
    res.status(404).json({ message: "Not Found" });
  });
  
 
  //module.exports = {router};
  module.exports = router;