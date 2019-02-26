"use strict";

const mongoose = require('mongoose')

mongoose.Promise = global.Promise;



// sport schema:

const sportSchema = mongoose.Schema({
  
  person : {type: mongoose.Schema.ObjectId, ref: 'User'},
  activity: { type: String, required: true },
  distanceCovered: {type: Number, required: false},
  timeElapsed: { type: Number, required: true},
  location: { type: String, required: true },
  comment: {type: String, required: false},
  created: {type: Date, default: Date.now}
}); 



sportSchema.virtual('personName').get(function(){
	return `${this.person.firstName} ${this.person.lastName}`.trim();
	
}); 


sportSchema.methods.serialize = function() {
  return {
    id: this._id,
    person: this.person,
    activity: this.activity,
    distanceCovered: this.distanceCovered,
    timeElapsed: this.timeElapsed,
    location: this.location,
    comment: this.comment,
    created: this.created
  };
};


const Sports = mongoose.model("Sports", sportSchema);

module.exports = { Sports };
