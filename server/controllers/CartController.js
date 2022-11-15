const { StatusCodes } = require('http-status-codes');

const CartList = async (req,res)=>{
    const redisClient = req.app.get('redisClient');  

    const { cartId } = req.session;
    const productList = [];
    const cartList =await redisClient.hGetall(`cart:${cartId}`) // get all products in cart
    if (!cartList) return res.send(cartList);
      
    // pass all items in cart and push to productList
    for(const itemKeys in Object.keys(productList)){
        const product = redisClient.json.get(itemKeys)
        productList.push({ product: JSON.parse(product), quantity: cartList[itemKeys] })
    }
      return res.send(productList);
}  

const DeleteItemController = async (req,res)=>{

    const { cartId15 } = req.session;
    const {id:productId} = req.params;
    const redisClient = req.app.get('redisClient');  
    console.log(cartId15)
    var quantityInCart  = await redisClient.hGet("cart:"+ cartId15, "product:"+productId);
    quantityInCart = parseInt(quantityInCart)
    if(quantityInCart > 0){
        await redisClient.hDel(`cart:${cartId15}`,`product:${productId}`)
        let productInStore = redisClient.json.get(`product:${productId}`);
        productInStore = JSON.parse(productInStore)
        productInStore.stock +=quantityInCart;
        await redisClient.json.set(`product:${productId}`, '.', JSON.stringify(productInStore));
        return res.sendStatus(StatusCodes.OK);
    }
    // return res.sendStatus(StatusCodes.OK);
    res.send(req.session.cartId15)

}

const EmptyCartController = async (req,res)=>{
    const redisClient = req.app.get('redisClient');  
    const { cartId15 } = req.session;
    console.log(req.session.id)
    const cartList = await redisClient.hGetAll(`cart:${cartId15}`);
    if (!cartList) return res.sendStatus(StatusCodes.NO_CONTENT);

    for (const key of Object.keys(cartList)) {
        await redisClient.hDel(`cart:${cartId15}`, key);

        let productInStore = await redisClient.json.get(key);

        productInStore = JSON.parse(productInStore);
        productInStore.stock += parseInt(cartList[key]);

        await redisClient.json.get(key, '.', JSON.stringify(productInStore));
    }
    return res.sendStatus(StatusCodes.OK);
}


const UpdateController = async (req,res)=>{
    const redisClient = req.app.get('redisClient');  
    const {
        session: { cartId15 },
        params: { id: productId }
    } = req;
    quantity = 1; // new quantity send the current state on client
    incrementBy = 1;
    let productInStore = await redisClient.json.get(`product:${productId}`)
    if (!productInStore) return res.status(StatusCodes.NOT_FOUND).send({ 
        message: "Product with this id doesn't exist" 
    });
    let quantityInCart =  await redisClient.hget(`cart:${cartId15}`, `product:${productId}`) || 0;
    if(quantityInCart == 0 ) incrementBy = 0; // if product don't exist on cart - we update to one
    productInStore = JSON.parse(productInStore)
    const { stock } = productInStore; //  how much in store
    console.log(stock)

    if (quantity != null) {
        quantity = parseInt(quantity);
        if (quantity <= 0) {
            return res.status(StatusCodes.BAD_REQUEST).send({ 
                message: 'Quantity should be greater than 0' 
            });
        }
        const newStock = stock - (quantity - quantityInCart);
        console.log(newStock)
        if (newStock < 0) {
            return res.status(StatusCodes.BAD_REQUEST).send({
                message: 'Not enough products in stock' 
            });
        }
        // update stock both on cart hash and productInStore object
        await redisClient.hSet(`cart:${cartId15}`, `product:${productId}`, quantity);
        console.log("get here222")
        productInStore.stock = newStock;
        await redisClient.json.set(`product:${productId}`, '.', JSON.stringify(productInStore));
    }

    if (incrementBy != 0) {
        incrementBy = parseInt(incrementBy);
        if (incrementBy !== 1 && incrementBy !== -1) {
            return res.status(StatusCodes.BAD_REQUEST).send({ message: 'Value of incrementBy should be 1 or -1' });
        }

        const quantityAfterIncrement = quantityInCart + incrementBy;
        if (quantityAfterIncrement <= 0) {
            return res.status(StatusCodes.BAD_REQUEST).send({ 
                message: "Can't decrement stock to 0" 
            });
        }

        if (stock - incrementBy < 0) {
            return res.status(StatusCodes.BAD_REQUEST).send({ 
                message: 'Not enough products in stock' 
            });
        }
    //     //update stock in redisStore
        await redisClient.hIncrBy(`cart:${cartId15}`, `product:${productId}`, incrementBy);
        productInStore.stock -= incrementBy;
        await redisClient.json.set(`product:${productId}`, '.', JSON.stringify(productInStore));
        console.log("done")
    }
    res.send(req.session.cartId15)

    // return res.sendStatus(StatusCodes.OK);
}


module.exports = { CartList,EmptyCartController,DeleteItemController ,UpdateController};

