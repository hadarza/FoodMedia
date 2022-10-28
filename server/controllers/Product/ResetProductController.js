const { StatusCodes } = require('http-status-codes');
const { products } = require('../../products.json');


    const ResetProductController = async (req, res) =>{
        const redisClient = req.app.get('redisClient');  
        const cartKeys = await redisClient.scanIterator('cart:*');

        for (const key of cartKeys) {
            await redisClient.del(key);
        }

        for (const product of products) {
            const { id } = product;

            await redisClient.json.set(`product:${id}`, '.', JSON.stringify(product));
        }

        return res.sendStatus(StatusCodes.OK);
    }

module.exports =
{ ResetProductController};