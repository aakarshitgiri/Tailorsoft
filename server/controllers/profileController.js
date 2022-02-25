const Profile = require("../models/profileModel.js");
const AppError = require("../utilities/appError.js");
const _ = require("lodash");

// Create new profile.
exports.createProfile = async (req, res, next) => {
  const { firstname, lastname, city, age, about} = req.body;
  try {
    const profile = await new Profile({ firstname, lastname, city, age, about });
    profile.save();
    res.status(201).send(profile);
  } catch (err) {
    next(new AppError(400, err.message));
  }
};

//Get all profile
exports.getAllProfile = async (req, res, next) => {
  try {
    const profile = await Profile.find();
    res.status(200).send(profile);
  } catch (err) {
    next(new AppError(404, "something went wrong"));
  }
};

//Get a prticular profile by id.
exports.profileById = async (req, res, next) => {
  try {
    const id = req.params.profileId;
    const profile = await Profile.findById(id);
    res.status(200).send(profile);
  } catch (err) {
    next(new AppError(404, err.message));
  }
};

//Update profile
exports.updateProfile = async (req, res, next) => {
  try{
    const id = req.params.profileId;
    let profile = await Profile.findById(id);
    profile = _.extend(profile, req.body);
    profile.save((err) => {
      if (err) {
        return next(new AppError(500, "Something went wrong"));
      }
      res.status(200).send(profile);
    });
  } catch (err){
      next(new AppError(404, err.message));
  }
};

//Delete profile
exports.deleteProfile = async (req, res, next) => {
  try{
    const id = req.params.profileId;
    await Profile.deleteOne({ _id: id });
    res.status(200).json({ message: "success"});
  } catch (err){
    next(new AppError(404, err.message));
  }
};

//Get profiles by firstname.
exports.profileByFname = async (req, res, next) => {
  try {
    const fName = req.params.profileFname;
    const profile = await Profile.aggregate( [ { $match: { firstname: fName } } ] );
    res.status(200).send(profile);
  } catch (err) {
    next(new AppError(404, err.message));
  }
};

//Get profiles by lastname.
exports.profileByLname = async (req, res, next) => {
  try {
    const lName = req.params.profileLname;
    const profile = await Profile.aggregate( [ { $match: { lastname: lName } } ] );
    res.status(200).send(profile);
  } catch (err) {
    next(new AppError(404, err.message));
  }
};

//Get profiles by city.
exports.profileByCity = async (req, res, next) => {
  try {
    const city = req.params.profileCity;
    const profile = await Profile.aggregate( [ { $match: { city: city } } ] );
    res.status(200).send(profile);
  } catch (err) {
    next(new AppError(404, err.message));
  }
};

//Get numbers of customer by city.
exports.numberOfProfilesByCity = async (req, res, next) => {
  try {
    const profile = await Profile.aggregate([
        {
            "$group" : {
                "_id" : {
                    "city" : "$city"
                },
                "users" : {
                    "$sum" : 1
                }
            }
        },
        {
            "$project" : {
                "city" : "$_id.city",
                "users" : "$users",
                "_id" : 0
            }
        }
    ]);
    res.status(200).send(profile);
  } catch (err) {
    next(new AppError(404, err.message));
  }
};
