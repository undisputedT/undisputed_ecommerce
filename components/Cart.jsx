import React, {useRef} from 'react'
import Link from 'next/link'
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai'
import {TiDeleteOutline} from 'react-icons/ti'
import toast, { Toast } from 'react-hot-toast'
import { useStateContext } from '@/context/StateContext'
import { urlFor } from '@/lib/client'
import getStripe from '@/lib/getStripe'

const Cart = () => {
  const cartRef = useRef()
  const {totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuantity, onRemove} = useStateContext()

  // chatGpt code refactoring
  const handleCheckout = async () => {
    const stripe = await getStripe();
  
    try {
      const response = await fetch('/api/stripe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartItems: cartItems }), // Make sure cartItems is defined
      });
  
      if (!response.ok) {
        // Handle the error gracefully, e.g., by displaying an error message to the user.
        const errorData = await response.json();
        console.error('Error:', errorData.message);
        return;
      }
  
      const data = await response.json();
      toast.loading('Redirecting...');
  
      stripe.redirectToCheckout({ sessionId: data.id }).then((result) => {
        if (result.error) {
          // Handle any errors that occur during the redirect.
          console.error('Stripe Redirect Error:', result.error.message);
          // You can also display an error message to the user here.
        }
      });
    } catch (err) {
      console.error('Error:', err.message);
    }
  };
  
  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className='cart-container'>
        <button 
        className="cart-heading"
        onClick={ () => setShowCart(false)}
        type='button'
        >
          <AiOutlineLeft />
          <span className='heading'>Your Cart</span>
          <span className='cart-num-items'>({totalQuantities} items)</span>
        </button>
        { cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your Shopping bag is empty</h3>
            <link href="/">
              <button 
              type='button' 
              onClick={() => setShowCart(false)}
              className='btn'
              >
                CONTINUE SHOPPING
              </button>
            </link>
          </div>
        )}
        <div className="product-container">
          {/* we are rendering all the cart items if the length is less than or equal to one  */}
          {cartItems.length >= 1 && cartItems.map((item) => (
            <div className="product" key={item._id}>
              <img src={urlFor(item?.image[0])} alt="product-image"
              className='cart-product-image' />
              <div className="item-desc">
                <div className="flex top">
                  <h5>{item.name}</h5>
                  <h4>${item.price}</h4>
                </div>
                <div className='flex bottom'>
                  <div>
                    <p className="quantity-desc">
                      <span className='minus' onClick={() => toggleCartItemQuantity(item._id, 'dec')}>
                        <AiOutlineMinus/>
                      </span>
                      <span className='num'>
                        {item.quantity}
                      </span>
                      <span className='plus' onClick={() => toggleCartItemQuantity(item._id, 'inc')}>
                        <AiOutlinePlus/>
                      </span>
                    </p>
                  </div>
                  <button
                  type=''
                  className='remove-item'
                  onClick={() => onRemove(item)}
                  >
                    <TiDeleteOutline/>
                  </button>
                </div>
              </div>
            </div>
        ))}

        </div>
        {cartItems.length >=1 && (
          <div className='cart-bottom'>
            <div className='total'>
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className='btn-container'>
              <button
                type='button'
                className='btn'
                onClick={handleCheckout}
              >Pay With Stripe</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart