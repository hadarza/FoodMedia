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
    

    const { cartId } = req.session;
    const {id:productId} = req.params;
    const redisClient = req.app.get('redisClient');  

    var quantityInCart  = await redisClient.HGET("cart:3FiGAHDYncxEmyup1I5UmklIgWZAWrVG8rf-XCCYpOflRN9YR8uWfztEbD2W5dGZ", "product:12345678");
    console.log(quantityInCart)
    // quantityInCart = parseInt(quantityInCart)
    // console.log(`cart:${cartId}`)
    // console.log(`product:${productId}`)
    // if(quantityInCart > 0){
    //     await redisClient.hDel(`cart:${cartId}`, `product:${productId}`)
    //     let productInStore = redisClient.json.get(`product:${productId}`);
    //     productInStore = JSON.parse(productInStore)
    //     productInStore.stock +=quantityInCart;

    //     await redisClient.json.set(`product:${productId}`, '.', JSON.stringify(productInStore));
    //     return res.sendStatus(StatusCodes.OK);

    // }
    return res.sendStatus(StatusCodes.OK);
}

const EmptyCartController = async (req,res)=>{
    const redisClient = req.app.get('redisClient');  
    const { cartId } = req.session;
    console.log(req.session.cartId)

    const cartList = await redisClient.hGetAll(`cart:${cartId}`);
    if (!cartList) return res.sendStatus(StatusCodes.NO_CONTENT);

    for (const key of Object.keys(cartList)) {
        await redisClient.hDel(`cart:${cartId}`, key);

        let productInStore = await redisClient.json.get(key);

        productInStore = JSON.parse(productInStore);
        productInStore.stock += parseInt(cartList[key]);

        await redisClient.json.get(key, '.', JSON.stringify(productInStore));
    }
    return res.sendStatus(StatusCodes.OK);
}


const UpdateController = async (req,res)=>{
    console.log(req.session.cartId)

    const redisClient = req.app.get('redisClient');  
    const {
        session: { cartId },
        params: { id: productId }
    } = req;

    // req.session.save()
    // let { quantity, incrementBy } = req.body.params;
    quantity = 1;
    incrementBy = 1;
    console.log(req.params.id)
    let productInStore = await redisClient.json.get(`product:${productId}`)
    console.log(productInStore)
    if (!productInStore) return res.status(StatusCodes.NOT_FOUND).send({ 
        message: "Product with this id doesn't exist" 
    });
    let quantityInCart =  await redisClient.hget(`cart:${cartId}`, `product:${productId}`,function (err, reply) {
        console.log("reply2 : "+productId + " "+ cartId)
        quantityInCart =  parseInt(reply)
        return quantityInCart;
     });
    // 
    // productInStore = JSON.parse(productInStore)
    // const { stock } = productInStore;

    // if (quantity != null) {
    //     quantity = parseInt(quantity);
    //     if (quantity <= 0) {
    //         return res.status(StatusCodes.BAD_REQUEST).send({ 
    //             message: 'Quantity should be greater than 0' 
    //         });
    //     }

    //     const newStock = stock - (quantity - quantityInCart);
    //     if (newStock < 0) {
    //         return res.status(StatusCodes.BAD_REQUEST).send({
    //             message: 'Not enough products in stock' 
    //         });
    //     }
    //     // update stock both on cart hash and productInStore object
    //     console.log(quantity)
    //     await redisClient.hSet(`cart:${cartId}`, `product:${productId}`, 1);
    //     productInStore.stock = newStock;
    //     await redisClient.json.set(`product:${productId}`, '.', JSON.stringify(productInStore));
    // }

    // if (incrementBy != null) {
    //     incrementBy = parseInt(incrementBy);
    //     if (incrementBy !== 1 && incrementBy !== -1) {
    //         return res.status(StatusCodes.BAD_REQUEST).send({ message: 'Value of incrementBy should be 1 or -1' });
    //     }

    //     const quantityAfterIncrement = quantityInCart + incrementBy;
    //     if (quantityAfterIncrement <= 0) {
    //         return res.status(StatusCodes.BAD_REQUEST).send({ 
    //             message: "Can't decrement stock to 0" 
    //         });
    //     }

    //     if (stock - incrementBy < 0) {
    //         return res.status(StatusCodes.BAD_REQUEST).send({ 
    //             message: 'Not enough products in stock' 
    //         });
    //     }
    //     //update stock in redisStore
    //     await redisClient.hIncrBy(`cart:${cartId}`, `product:${productId}`, incrementBy);
    //     productInStore.stock -= incrementBy;
    //     await redisClient.json.set(`product:${productId}`, '.', JSON.stringify(productInStore));
    //     console.log("done")
    // }

    return res.sendStatus(StatusCodes.OK);
}

module.exports = { CartList,EmptyCartController,DeleteItemController ,UpdateController};

