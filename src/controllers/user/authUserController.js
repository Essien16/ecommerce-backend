const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const Joi = require('joi');
const jwt = require("jsonwebtoken");

const signUpUser = async (req, res) => {
    const { name, email, password, confirm } = req.body;
    const schema = Joi.object({
      name: Joi.string().min(3).required(),
      email: Joi.string().email().required(),
      password: Joi.string(),
      confirm: Joi.ref('password'),
    });
    const { error } = schema.validate(req.body)
    if (error) {
      return res.status(400).send(error.details[0].message);
    } else {
      //Validation
      await User.findOne({ email: email }).then((user) => {
        if (user) {
          console.log("User with this email exists");
          res.status(409).send("User with this email exists")
        } else {
          const newUser = new User({
            name,
            email,
            password,
          });
          
          bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(res.redirect("/api/products"))
                .catch((err) => console.log(err));
             })
           );
        }
      });
    }
  };

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        return res.status(400).send("Please fill in all the fields");
      };
      const user = await User.findOne({email:email})
      // console.log(user)
      if (user){
        const validatePassword = await bcrypt.compare(req.body.password, user.password);
      if (validatePassword) {
        const tokenObject = jwtToken(user);
        return res.status(200).send({tokenObject})
      } else return res.status(400).send("Invalid email or password")
      }
  } catch (error) {
    console.log(error.message);
  }
};


function jwtToken(user) {
  const _id = user._id;
  const expiresIn = '7d';
  
  const jwt_payload = {
    sub: _id,
    name: user.name,
    email: user.email,
    iat: Date.now()
  };

  const jwt_token = jwt.sign(jwt_payload, process.env.JWT_SECRET_KEY, { expiresIn: expiresIn, algorithm: 'HS256'});
  return {
    token: jwt_token,
    expiresIn: expiresIn
  }
}

module.exports =  {
    signUpUser,
    loginUser
};