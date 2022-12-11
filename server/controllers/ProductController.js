let {products} = require('../products.json')
const { StatusCodes } = require('http-status-codes');

const ProductList = async (req,res)=>{
  const redisClient = req.app.get('redisClient');  
  const productKeys = await redisClient.scanIterator("product:*")
  const productList = [];
  if (productKeys.length) {
    for (const key of productKeys) {
      const product = await redisClient.json.get(key);
      productList.push(JSON.parse(product));
    }
    return res.send(productList);
  }

  for (const product of products) {
    try{
      const { name ,restarunt} = product;
      await redisClient.json.set(`product:${name}`, '.', JSON.stringify(product));
      productList.push(product);
    }
    catch(err){
      console.log(err)
    }
  }
  return res.send(productList);
  }  

const ResetProductController = async (req, res) =>{
  const redisClient = req.app.get('redisClient');  
  const cartKeys = await redisClient.scanIterator('cart:*');

  for (const key of cartKeys) {
    await redisClient.del(key);
  }

  for (const product of products) {
    const { id } = product;
    await redisClient.json.set(`product:${id}:${restarunt}`, '.', JSON.stringify(product));
  }

      return res.sendStatus(StatusCodes.OK);
  }

module.exports = { ProductList,ResetProductController };

