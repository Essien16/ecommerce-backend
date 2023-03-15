const Admin = require("../../models/Admin");
const bcrypt = require("bcryptjs");
const Joi = require('joi');
const jwt = require("jsonwebtoken");
// const { isAdmin } = require("../../middleware/protect");

const signUpAdmin = async (req, res) => {
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
      await Admin.findOne({ email: email }).then((admin) => {
        if (admin) {
          console.log("User with this email exists");
          res.status(409).send("User with this email exists")
        } else {
          const newAdmin = new Admin({
            name,
            email,
            password,
          });
          
          bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash(newAdmin.password, salt, (err, hash) => {
              if (err) throw err;
              newAdmin.password = hash;
              newAdmin
                .save()
                .then(res.redirect("/api/products"))
                .catch((err) => console.log(err));
             })
           );
        }
      });
    }
  };

const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        return res.status(400).send("Please fill in all the fields");
      };
      const admin = await Admin.findOne({email:email})
      if (admin){
        const validatePassword = await bcrypt.compare(req.body.password, admin.password);
      if (validatePassword) {
        const tokenObject = jwtToken(admin);
        return res.status(200).send({tokenObject})
      } else return res.status(400).send("Invalid email or password")
      }
  } catch (error) {
    console.log(error.message);
  }
};


function jwtToken(admin) {
  const _id = admin._id;
  const isAdmin = admin.isAdmin;
  const expiresIn = '7d';
  
  const jwt_payload = {
    sub: _id,
    name: admin.name,
    email: admin.email,
    isAdmin: isAdmin,
    iat: Date.now()
  };

  const jwt_token = jwt.sign(jwt_payload, process.env.JWT_SECRET_KEY, { expiresIn: expiresIn, algorithm: 'HS256'});
  return {
    token: jwt_token,
    expiresIn: expiresIn
  }
}

module.exports =  {
    signUpAdmin,
    loginAdmin
};