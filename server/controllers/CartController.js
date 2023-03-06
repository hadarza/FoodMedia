const { StatusCodes } = require('http-status-codes');

const CartList = async (req,res)=>{
    const redisClient = req.app.get('redisClient');  

    const { cartId } = req.session;
    const productList = [];

    // get all products in cart
    const cartList = await redisClient.hGetAll(`cart:${cartId}`,
     function (err, results) {
        if (err) {
          console.log("error is "+ err)
        } else {
        console.log("results are "+results)
        }
      })

    if (cartList != undefined){
        // pass all items in cart and push to productList
        for(const itemKeys in Object.keys(cartList)){  
            const product = await redisClient.json.get(itemKeys)
            // add items + quantity in cart into productList 
            productList.push({ product: JSON.parse(product), quantity: cartList[itemKeys] })
            console.log("product out product list from cartList "+productList)
        }
    }
    console.log("list "+productList)
      return res.send(productList);
}  

const DeleteItemController = async (req,res)=>{

    const { cartId } = req.session;
    const {id:productId} = req.params;
    const redisClient = req.app.get('redisClient');  

    var quantityInCart  = await redisClient.hGet("cart:"+ cartId, "product:"+productId);
    quantityInCart = parseInt(quantityInCart)

    if(quantityInCart > 0){
        //  delete item from cart and update this specific quantity for product in store
        await redisClient.hDel(`cart:${cartId}`,`product:${productId}`)

        let productInStore = redisClient.json.get(`product:${productId}`);
        productInStore = JSON.parse(productInStore)
        // return all items to stock
        productInStore.stock +=quantityInCart;

        await redisClient.json.set(`product:${productId}`, '.', JSON.stringify(productInStore));
        return res.sendStatus(StatusCodes.OK);
    }
    res.sendStatus(StatusCodes.OK);

}

const EmptyCartController = async (req,res)=>{
    const redisClient = req.app.get('redisClient');  
    const { cartId } = req.session;

    console.log("cart id is "+cartId);

    let cartList = await redisClient.hGetAll(`cart:${cartId}`,
    function (err, currencyData) {
        // if cartId not found - return false.
        if (err) 
            console.log("there is an error "+err);
        console.dir(currencyData);
    })

    if (!cartList) return res.sendStatus(StatusCodes.NO_CONTENT);

    // delete all objects from cartList. update product stock according the quantity that deleted from stock.
    for (const key of Object.keys(cartList)) {
        await redisClient.hdel(`cart:${cartId}`, key);

        let productInStore = await redisClient.json.get(key);
        console.log(productInStore)
        productInStore = JSON.parse(productInStore);
        productInStore.stock += parseInt(cartList[key]);

        await redisClient.json.get(key, '.', JSON.stringify(productInStore));
    }
    return res.sendStatus(StatusCodes.OK);
}

const UpdateController = async (req,res)=>{
     //const redisClient = req.app.get('redisClient');
    // const {
    //     session: { cartId },
    //     params: { name: productId },
    // } = req;

    // let { quantity, incrementBy } = req.body;
    //  console.log(req.app.get('redisClient'))
    // console.log("quantity "+req.body.quantity)
    // console.log("increment "+req.body.incrementBy)
    // console.log("req "+req.app)
    // if(quantity == 0) incrementBy = 1;

    // console.log("quantity is "+quantity + " , and increment by"+ incrementBy);

    // let productInStore = await redisClient.json.get(`product:${productId}`);

    // if (!productInStore){
    //     return res.status(StatusCodes.NOT_FOUND).send({ 
    //         message: "Product with this id doesn't exist" 
    //     });
    // }

    // quantityInCart = (await redisClient.hGet(`cart:${cartId}`,`product:${productId}`,function (err, currenctData) {
    //     if (err) 
    //         console.log(err);
    //     console.dir(currenctData);
    // })) || 0;
    // quantityInCart = parseInt(quantityInCart)
    // console.log("quantity in cart"+quantityInCart);

    // productInStore = JSON.parse(productInStore)
    // const { stock } = productInStore; //  how much items available in stock  in store

    // if (quantity) {
    //     quantity = parseInt(quantity);
    //     if (quantity < 0) {
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
    //     console.log("our new stock "+ newStock)

    //     // update stock both on cart hash and productInStore object
    //     await redisClient.hSet(`cart:${cartId}`, `product:${productId}`, quantity);
    //     productInStore.stock = newStock;
    //     console.log("now product in store after update after hSet "+productInStore.stock)
    //     await redisClient.json.set(`product:${productId}`, '.', JSON.stringify(productInStore));
    // }
    // if(incrementBy){
    // // if product is exist - change quantity - add by 1 or -1
    //     incrementBy = parseInt(incrementBy);
    //     if (incrementBy !== 1 && incrementBy !== -1) {
    //         return res.status(StatusCodes.BAD_REQUEST).send({ message: 'Value of incrementBy should be 1 or -1' });
    //     }

    //     const quantityAfterIncrement = quantityInCart + incrementBy;
    //     console.log("after increment " + quantityAfterIncrement)

    //     // error messages
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

    //     //update stock in cart at redisStore
    //     await redisClient.hIncrBy(`cart:${cartId}`, `product:${productId}`, incrementBy);
    //     console.log(incrementBy)
    //     productInStore.stock -= incrementBy;
    //     // update product in store at redisStore
    //     await redisClient.json.set(`product:${productId}`, '.', JSON.stringify(productInStore));
    //     console.log("done")
    // }
    //res.send(req.session.cartId)
    console.log("xxx")
    res.sendStatus(StatusCodes.OK);
}


module.exports = { CartList,EmptyCartController,DeleteItemController ,UpdateController};

