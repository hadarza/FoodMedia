let {products} = require('../../products.json')

const ProductList = async (req,res)=>{
  const redisClient = req.app.get('redisClient');  
  await redisClient.connect()
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
          const { id } = product;
          console.log(product)
          await redisClient.json.set(`product:${id}`, '.', JSON.stringify(product));
          productList.push(product);
        }
        catch(err){
          console.log(err)
        }
      }
  
      return res.send("xx");
    }  

module.exports = { ProductList };

