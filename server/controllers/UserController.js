const pool = require("../db");
const bcrypt = require('bcryptjs');
const jwtGenerator = require('../utils/jwtGenerator');
const { RegisterValidation, LoginValidation } = require("../middleware/validation");
const Register = async(req,res)=>{
  try{
    console.log("err")
    const {error} = RegisterValidation(req.body.User);
    console.log(error)

    if(error) return res.status(400).send(error.details[0].message)
    console.log("err")


    const {phone,isGluten,isVegan,isVegetarian,isNutAllergy,isSeafood,isLowsugar,isKosher} = req.body.User;
    // check if you already have a user with this phone
    const user = await pool.query("SELECT * FROM users WHERE phone = $1",
    [req.body.User.phone])
    if(user.rows.length !== 0){
        return res.status(401).send("User is already exist");
    }
    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    const hashedPassword  = await bcrypt.hash(req.body.User.passwordUser, salt);


    const registerUser = await pool.query(
        "INSERT INTO users (phone,passwordUser,isGluten,isVegan,isVegetarian,isNutAllergy,isSeafood,isLowsugar,isKosher) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *",
        [phone,hashedPassword,isGluten,isVegan,isVegetarian,isNutAllergy,isSeafood,isLowsugar,isKosher]
    );

    // generating our jwt token 
    const tokenMessage = jwtGenerator(registerUser.rows[0].iduser)
    res.json({tokenMessage})

  } catch(err){
    console.error(err.message)
    res.status(500).send("Server Error")
  }
}

const Login = async (req,res) =>{
  const {error} = LoginValidation(req.body.User);
  if(error) return res.status(400).send(error.details[0].message)

   // doesn't match an exist user
   const User = await pool.query("SELECT * FROM users WHERE phone = $1",
   [req.body.User.phone])

   if(User.rows.length === 0){
       return res.status(401).send("User isn't exist");
   }
     
 // check if password is correct
    const validPass = await bcrypt.compare(req.body.User.passwordUser,User.rows[0].passworduser)
   if (!validPass) return res.status(400).send("Invalid password")
    try{
      // create and assign a token
      const tokenMessage = jwtGenerator(User.rows[0].iduser)
      res.json({tokenMessage})

    }catch(err){
    return res.send("failed token");
  }
}
 const verify = (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
}

      
  module.exports={
    Register,
    Login,
    verify
  }
