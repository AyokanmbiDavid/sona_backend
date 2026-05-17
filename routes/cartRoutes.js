import express from "express";
import jwt from 'jsonwebtoken' 
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router()

const store = [
  // ACCESSORIES (7 'new' products, IDs 1-7)
  { id: 1, title: 'Leather Backpack', price: '12500', spec: 'old', category: 'accessories', img: 'https://unsplash.com' },
  { id: 2, title: 'Baseball Cap', price: '1500', spec: 'old', category: 'accessories', img: 'https://unsplash.com' },
  { id: 3, title: 'Minimalist Wallet', price: '3000', spec: 'old', category: 'accessories', img: 'https://unsplash.com' },
  { id: 4, title: 'Polarized Sunglasses', price: '4500', spec: 'old', category: 'accessories', img: 'https://unsplash.com' },
  { id: 5, title: 'Smart Watch', price: '25000', spec: 'old', category: 'accessories', img: 'https://unsplash.com' },
  { id: 6, title: 'Leather Belt', price: '2000', spec: 'old', category: 'accessories', img: 'https://unsplash.com' },
  { id: 7, title: 'Travel Duffle Bag', price: '15000', spec: 'new', category: 'accessories', img: 'https://unsplash.com' },
  { id: 8, title: 'Key Organizer', price: '1200', spec: 'old', category: 'accessories', img: 'https://unsplash.com' },
  { id: 9, title: 'Beanie Hat', price: '1800', spec: 'old', category: 'accessories', img: 'https://unsplash.com' },
  { id: 10, title: 'Socks Pack', price: '1000', spec: 'old', category: 'accessories', img: 'https://unsplash.com' },

  // UTENSILS (7 'new' products, IDs 11-17)
  { id: 11, title: 'Electric Kettle', price: '7000', spec: 'new', category: 'utensils', img: 'https://unsplash.com' },
  { id: 12, title: 'Chef Knife', price: '8500', spec: 'old', category: 'utensils', img: 'https://unsplash.com' },
  { id: 13, title: 'Non-Stick Frypan', price: '9000', spec: 'old', category: 'utensils', img: 'https://unsplash.com' },
  { id: 14, title: 'Ceramic Dinner Set', price: '35000', spec: 'old', category: 'utensils', img: 'https://unsplash.com' },
  { id: 15, title: 'Stainless Steel Flask', price: '5000', spec: 'old', category: 'utensils', img: 'https://unsplash.com' },
  { id: 16, title: 'Coffee Maker', price: '45000', spec: 'old', category: 'utensils', img: 'https://unsplash.com' },
  { id: 17, title: 'Wooden Spatula Set', price: '2500', spec: 'new', category: 'utensils', img: 'https://unsplash.com' },
  { id: 18, title: 'Blender Jar', price: '12000', spec: 'old', category: 'utensils', img: 'https://unsplash.com' },
  { id: 19, title: 'Toaster', price: '8000', spec: 'old', category: 'utensils', img: 'https://unsplash.com' },
  { id: 20, title: 'Spice Rack', price: '4000', spec: 'old', category: 'utensils', img: 'https://unsplash.com' },

  // GAMING (7 'new' products, IDs 21-27)
  { id: 21, title: 'Mechanical Keyboard', price: '18000', spec: 'old', category: 'gaming', img: 'https://unsplash.com' },
  { id: 22, title: 'Gaming Mouse', price: '9500', spec: 'old', category: 'gaming', img: 'https://unsplash.com' },
  { id: 23, title: 'RGB Headphones', price: '22000', spec: 'old', category: 'gaming', img: 'https://unsplash.com' },
  { id: 24, title: 'Gaming Controller', price: '15000', spec: 'old', category: 'gaming', img: 'https://unsplash.com' },
  { id: 25, title: 'Mouse Pad XL', price: '4000', spec: 'old', category: 'gaming', img: 'https://unsplash.com' },
  { id: 26, title: 'Gaming Chair', price: '85000', spec: 'old', category: 'gaming', img: 'https://unsplash.com' },
  { id: 27, title: 'VR Headset', price: '150000', spec: 'new', category: 'gaming', img: 'https://unsplash.com' },
  { id: 28, title: 'Console Stand', price: '6000', spec: 'old', category: 'gaming', img: 'https://unsplash.com' },
  { id: 29, title: 'HDMI Cable', price: '2500', spec: 'old', category: 'gaming', img: 'https://unsplash.com' },
  { id: 30, title: 'Controller Charger', price: '5500', spec: 'old', category: 'gaming', img: 'https://unsplash.com' },

  // FASHION (7 'new' products, IDs 31-37)
  { id: 31, title: 'Denim Jacket', price: '14000', spec: 'old', category: 'fashion', img: 'https://unsplash.com' },
  { id: 32, title: 'White Sneakers', price: '18500', spec: 'old', category: 'fashion', img: 'https://unsplash.com' },
  { id: 33, title: 'Cotton Hoodie', price: '8000', spec: 'old', category: 'fashion', img: 'https://unsplash.com' },
  { id: 34, title: 'Cargo Pants', price: '9500', spec: 'old', category: 'fashion', img: 'https://unsplash.com' },
  { id: 35, title: 'Graphic T-Shirt', price: '4000', spec: 'old', category: 'fashion', img: 'https://unsplash.com' },
  { id: 36, title: 'Chelsea Boots', price: '28000', spec: 'new', category: 'fashion', img: 'https://unsplash.com' },
  { id: 37, title: 'Summer Dress', price: '11000', spec: 'new', category: 'fashion', img: 'https://unsplash.com' },
  { id: 38, title: 'Vintage Scarf', price: '2500', spec: 'old', category: 'fashion', img: 'https://unsplash.com' },
  { id: 39, title: 'Baseball Jersey', price: '7000', spec: 'old', category: 'fashion', img: 'https://unsplash.com' },
  { id: 40, title: 'Leather Gloves', price: '3500', spec: 'old', category: 'fashion', img: 'https://unsplash.com' },

  // OTHERS (7 'new' products, IDs 41-47)
  { id: 41, title: 'Desk Lamp', price: '6500', spec: 'new', category: 'others', img: 'https://unsplash.com' },
  { id: 42, title: 'Notebook Journal', price: '1500', spec: 'new', category: 'others', img: 'https://unsplash.com' },
  { id: 43, title: 'Water Bottle', price: '3500', spec: 'new', category: 'others', img: 'https://unsplash.com' },
  { id: 44, title: 'Indoor Plant', price: '4500', spec: 'new', category: 'others', img: 'https://unsplash.com' },
  { id: 45, title: 'Bluetooth Speaker', price: '16000', spec: 'new', category: 'others', img: 'https://unsplash.com' },
  { id: 46, title: 'Aromatherapy Diffuser', price: '8500', spec: 'new', category: 'others', img: 'https://unsplash.com' },
  { id: 47, title: 'Wall Clock', price: '5000', spec: 'new', category: 'others', img: 'https://unsplash.com' },
  { id: 48, title: 'Storage Box', price: '3000', spec: 'old', category: 'others', img: 'https://unsplash.com' },
  { id: 49, title: 'Travel Pillow', price: '2500', spec: 'old', category: 'others', img: 'https://unsplash.com' },
  { id: 50, title: 'Bookends', price: '4000', spec: 'old', category: 'others', img: 'https://unsplash.com' }
];

let cart =[
  {
    id:1,
    email:'johndoe@gmail.com',
    cartitems:[
      {id:1,
        quantity: 2,
        price: "12500",
        category: "accessories",
        title: 'Leather Backpack',
        price: '12500',
        spec: 'old', 
        category: 'accessories',
        img: '',
      }
    ]
  }
]
router.get('/',(req,res) => {
  res.status(201).json('cart is working')
})

router.post('/',authMiddleware,(req,res) => {
  const {email} = req.body;

  if (!email) return res.status(401).json({error: 'no user id provided'});  

  const getusercart = cart.find(item => item.email == email);  

  res.status(201).json(getusercart)
})

router.delete('/delete',authMiddleware,(req,res) => {
  const {email,itemId} = req.body 

  if (!email || !itemId) return res.status(401).json({error: 'no user id provided'});  

  const getusercart = cart.find(item => item.email == email);  

  if (!getusercart) return res.status(401).json({error: 'user has no cart'});  

  let findCartItem = getusercart.cartitems.find(item => item.id == itemId)

  if (!findCartItem) return res.status(401).json({error: 'cart item not in user cart'});

  let filteremoveitem = getusercart.cartitems.filter(item => item.id != itemId)

  cart = cart.map((item) => item.email == email ? 
    {id: item.id,
    email:item.email,
  cartitems:filteremoveitem}
 : item)

  return res.status(201).json({message:'item deleted'})
})

export default router