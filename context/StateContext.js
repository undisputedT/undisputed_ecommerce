import product from '@/sanity-ecommerce/schemas/product';

import React, {createContext, useContext, useState, useEffect} from 'react'

import { toast } from 'react-hot-toast'


const Context = createContext()

export const StateContext = ({children}) => {

    const [showCart, setShowCart] = useState(false);

    const [cartItems, setCartItems] = useState([]);

    const [totalPrice, setTotalPrice] = useState(0);

    const [totalQuantities, setTotalQuantities] = useState(0)

    const [qty, setQty] = useState(1)

    let foundProduct; //product we want to update

    let index; // index of the product we want to update

    const onAdd = (product, quantity) => {

        const checkProductInCart = cartItems.find((item) => item._id === product._id)
        // this checks if the product is existing in the cart if it is existing it will add to the existing one
        // and not add another product
            setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity)

            setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity)

        if(checkProductInCart){
            const updateCartItems = cartItems.map((cartProduct) => {

                if(cartProduct._id === product._id) return{
                    ...cartProduct ,
                    quantity: cartProduct.quantity + quantity
                    // it spreads the cardProduct but this time it updates the quantity to be added by the new one
                } 
            })

            setCartItems(updateCartItems)

           
        }else{
            product.quantity = quantity
            // incase there isn't the same product it give back the same quantity
            setCartItems([...cartItems, { ...product}])
        }            
        toast.success(`${qty} ${product.name} added to the cart`)
    } // the message that pops us after adding a new product

    const onRemove = (product) => {
        foundProduct = cartItems.find((item) => item._id === product._id )

        const newCartItems = cartItems.filter((item) => item._id !== product._id)

        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity)

        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity )

        setCartItems(newCartItems)

    }


    const toggleCartItemQuantity = (id, value) => {

        foundProduct = cartItems.find((item) => item._id === id )

        index = cartItems.findIndex((product) => product._id === id)

        const newCartItems = cartItems.filter((item) => item._id !== id)
        // .filter created a new array without modifying the old cart
            // wanting to know if we are incrementing or decrementing
            if(value === 'inc'){
                setCartItems([...newCartItems, {...foundProduct, quantity: foundProduct.quantity + 1} ])
                // updating the cartItems with the current cartItems then adding a new element to it and spreading the
                // properties of the product and increasing the property by 1

                setTotalPrice((prev) => prev + foundProduct.price )
                setTotalQuantities((prev) => prev + 1)
            }else if(value === 'dec'){
                if (foundProduct.quantity > 1) {
                    setCartItems( [...newCartItems, {...foundProduct, quantity: foundProduct.quantity - 1} ])
                    // updating the cartItems with the current cartItems then adding a new element to it and spreading the
                    // properties of the product and increasing the property by 1

                    setTotalPrice((prev) => prev - foundProduct.price )
                    setTotalQuantities((prev) => prev - 1)
                }
                
            }
    }
            

    const incQty = () => {

        setQty((prevState) => prevState + 1 )
    }
    const decQty = () => {
        setQty((prevQty) => {

            if (prevQty - 1 < 1 ) return 1;

           return prevQty - 1;
        });
        // this states if we are decrementing once it is less than 1 it should return 1 i.e it doesn't decrement from 1
    }

   return(
    <Context.Provider
    value={{
            showCart,
            cartItems,
            totalPrice,
            totalQuantities,
            qty,
            incQty,
            decQty,
            onAdd,
            setShowCart,
            toggleCartItemQuantity,
            onRemove,
            setCartItems,
            setTotalPrice,
            setTotalQuantities
        }}
    >
        {children}
    </Context.Provider>
   )
}
export const useStateContext = () => useContext(Context)