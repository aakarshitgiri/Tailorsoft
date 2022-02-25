const express = require("express");
const router = express.Router();

// User controllers
const {
  createProfile,
  getAllProfile,
  profileById,
  updateProfile,
  deleteProfile,
  profileByFname,
  profileByLname,
  profileByCity,
  numberOfProfilesByCity,
} = require("../controllers/profileController");

//--------------------- All the common admin and employee routes -----------------------//

//Get all profile.
router.get("/", getAllProfile);

//Create Profile.
router.post("/create", createProfile);

//Get profile details by id.
router.get("/id/:profileId", profileById);

//Update profile.
router.patch("/update/:profileId", updateProfile);

//Delete profile.
router.delete("/delete/:profileId", deleteProfile);

//Get profiles by firstname.
router.get("/fname/:profileFname", profileByFname);

//Get profiles by lastname.
router.get("/lname/:profileLname", profileByLname);

//Get profiles by city.
router.get("/city/:profileCity", profileByCity);

//Get number of profiles by city.
router.get("/profilesByCity", numberOfProfilesByCity);


module.exports = router;
