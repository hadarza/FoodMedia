const pool = require("../db");
const path = require('path');

const getUser = async (req, res) => {
    try {
     //req.user has the payload
      // res.json(req.user);
      const user = await pool.query(
        "SELECT phone FROM users WHERE IdUser = $1",
       [req.user])
        res.json(user.rows[0]);
      }
      catch (err){
     console.error(err.message);
     res.status(50).json("Server Error");
      }
}


const postImageCarosuel = async (req,res)=>{
  const { filename, mimetype, size } = req.file;
  const filepath = req.file.path;
  try{
    const user = await pool.query("INSERT INTO imagefiles (fileNameImage,filepath,mimetype,size) VALUES($1,$2,$3,$4) RETURNING *",
    [filename,filepath,mimetype,size]);
    console.log(req.file);
    res.json({ success: true, filename })
  }catch(err){
    res.json({ success: false, message: 'upload failed', stack: err.stack })
  }
}

const getImageCarosuel = async(req,res)=>{
  const { filename } = req.params;
  try{
  const image = await pool.query("SELECT * FROM imagefiles WHERE fileNameImage=$1",[filename])
  console.log(image.rows[0])
    if (image.rows.length !== 0) {
    const dirname = path.resolve();
    const fullfilepath = path.join(dirname, image.rows[0].filepath);
    return res.type(image.rows[0].mimetype)
    .sendFile(fullfilepath);
    }
    return Promise.reject(

        new Error('Image does not exist')      

    );
    }catch(err){
    res.status(404).json({
      success: false, 
      message: 'not found', 
      stack: err.stack,
    })
  }
}

const getAllImageCarosuel = async(req,res)=>{
  try{
  const image = await pool.query("SELECT * FROM imagefiles")
    if (image.rows.length !== 0) {
        console.log(image.rows)
        res.status(200).send(image.rows)
    }
    }catch(err){
    res.status(404).json({
      success: false, 
      message: 'not found', 
      stack: err.stack,
    })
  }
}



const getAllRestaurantsByTag = async(req,res)=>{
  const tag = req.body.tag;

  try{
    const RestaruantsTag = await pool.query("SELECT * FROM Restaruants WHERE tag = $1",[tag])
      if (RestaruantsTag.rows.length !== 0) {
          res.status(200).send(RestaruantsTag.rows)
      }
      }catch(err){
      res.status(404).json({
        success: false, 
        message: 'not found', 
        stack: err.stack,
      })
    }
}

const getImageRestarunt = async(req,res)=>{
  const Restarunt_img = req.body.RestaruantImage;
  console.log(Restarunt_img)
  try{
    const imageRestarunt = await pool.query("SELECT * FROM imagefiles WHERE id = $1",[Restarunt_img])
    if (imageRestarunt.rows.length !== 0) {
        console.log(imageRestarunt.rows)
        res.status(200).send(imageRestarunt.rows)
    }
    }catch(err){
    res.status(404).json({
      success: false, 
      message: err.message, 
      stack: err.stack,
    })
  }
}
module.exports = {
    getUser,
    getImageCarosuel,
    postImageCarosuel,
    getAllImageCarosuel,
    getAllRestaurantsByTag,
    getImageRestarunt
}
 