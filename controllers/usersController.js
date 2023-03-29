const { uuid } = require("uuidv4");
const User = require('../models/Users');

const {
  generatePasswordHash,
  validatePassword,
  generateUserToken,
  verifyToken,
} = require("../auth");

// /* GET users listing. */
// router.get("/", function (req, res, next) {
//   res.send("respond with a resource");
// });

async function registration(req, res, next) {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const saltRounds = 5; // In a real application, this number would be somewhere between 5 and 10

    const passwordHash = await generatePasswordHash(password, saltRounds);

    const newUser = new User({
      email: email,
      password: passwordHash,
      id: uuid(), // uid stands for User ID. This will be a unique string that we will can to identify our user
    });
    console.log(password)
    console.log(passwordHash)
    //mongoose
    const insertResult = await newUser.save();

    // const insertResult = await db().collection("users").insertOne(user);

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.toString() });
  }
};

async function login(req, res, next){
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({
      email,
    });

    if (!user) {
      res.json({ success: false, message: "Could not find user." }).status(204);
      return;
    }
    console.log(user)
    console.log(password)


    const isPWValid =  validatePassword(password, user.password);

    if (!isPWValid) {
      res
        .json({ success: false, message: "Password was incorrect." })
        .status(204);
      return;
    }

    const userType = email.includes("admin.com") ? "admin" : "user";

    const data = {
      date: new Date(),
      userId: user.id, 
      scope: userType,
			email: email
    };

    const token =  generateUserToken(data);

    res.json({ success: true, token, email });
    return;
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.toString() });
  }
};

async function message(req, res, next){
  try {
    const tokenHeaderKey = process.env.TOKEN_HEADER_KEY;

    const token = req.header(tokenHeaderKey);

		console.log("token ", token)

		const verifiedTokenPayload = verifyToken(token)

    if (!verifiedTokenPayload) {
      return res.json({
        success: false,
        message: "ID Token could not be verified",
      });
    }

		console.log(verifiedTokenPayload)
    const userData = verifiedTokenPayload.userData;

    if (userData && userData.scope === "user") {
      return res.json({
        success: true,
        message: `I am a normal user with the email: ${userData.email}`,
      });
    }

		if (userData && userData.scope === "admin") {
      return res.json({
        success: true,
        message: `I am an admin user with the email ${userData.email}`,
      });
    }

    throw Error("Access Denied");
  } catch (error) {
    // Access Denied
    return res.status(401).json({ success: false, message: error });
  }
};

module.exports = {
  registration,
  login,
  message
  
};


