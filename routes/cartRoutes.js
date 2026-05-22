import express from "express";
import jwt from 'jsonwebtoken' 
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router()

const store = [
  // ACCESSORIES (7 'new' products, IDs 1-7)
  { id: 1, title: 'Leather Backpack', price: '12500', spec: 'old', category: 'accessories', img: 'https://plus.unsplash.com/premium_photo-1664353833832-b03ab1a002b0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGVhdGhlciUyMGJhZ3xlbnwwfHwwfHx8MA%3D%3D' },
  { id: 2, title: 'Basball Cap', price: '1500', spec: 'old', category: 'accessories', img: 'https://images.unsplash.com/photo-1560774358-d727658f457c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmFzZWJhbGwlMjBjYXB8ZW58MHx8MHx8fDA%3D' },
  { id: 3, title: 'Minimalist Wallet', price: '3000', spec: 'old', category: 'accessories', img: 'https://images.unsplash.com/photo-1620109433606-a7dfa6107d28?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWluaW1hbGlzdCUyMHdhbGxldHxlbnwwfHwwfHx8MA%3D%3D' },
  { id: 4, title: 'Polarized Sunglasses', price: '4500', spec: 'old', category: 'accessories', img: 'https://images.unsplash.com/photo-1610136649349-0f646f318053?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c3VuZ2xhc3Nlc3xlbnwwfHwwfHx8MA%3D%3D' },
  { id: 5, title: 'Smart Watch', price: '25000', spec: 'old', category: 'accessories', img: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c21hcnR3YXRjaCUyMGRpc3BsYXl8ZW58MHx8MHx8fDA%3D' },
  { id: 6, title: 'Leather Belt', price: '2000', spec: 'old', category: 'fashion', img: 'https://images.unsplash.com/photo-1666723043169-22e29545675c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGVhdGhlciUyMGJlbHR8ZW58MHx8MHx8fDA%3D' },
  { id: 7, title: 'Travel Duffle Bag', price: '15000', spec: 'new', category: 'accessories', img: 'https://plus.unsplash.com/premium_photo-1678739395192-bfdd13322d34?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dHJhdmVsJTIwZHVmZmxlJTIwYmFnfGVufDB8fDB8fHww' },
  { id: 8, title: 'Key Organizer', price: '1200', spec: 'old', category: 'accessories', img: 'https://plus.unsplash.com/premium_photo-1665520346783-07a1dbcc6e19?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8a2V5JTIwb3JnYW5pemVyfGVufDB8fDB8fHww' },
  { id: 9, title: 'Beanie Hat', price: '1800', spec: 'old', category: 'fashion', img: 'https://plus.unsplash.com/premium_photo-1695603437311-fec2f916a0f5?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 10, title: 'Socks Pack', price: '1000', spec: 'old', category: 'accessories', img: 'https://media.istockphoto.com/id/916661810/photo/three-sets-of-new-socks-with-packaging.webp?a=1&b=1&s=612x612&w=0&k=20&c=kmLE6AREM1WDMTopic0-sIqmpV8fzg8JgY_1uTQkGnw=' },

  // UTENSILS (7 'new' products, IDs 11-17)
  { id: 11, title: 'Electric Kettle', price: '7000', spec: 'new', category: 'utensils', img: 'https://images.unsplash.com/photo-1643114786355-ff9e52736eab?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWxlY3RyaWMlMjBrZXR0bGV8ZW58MHx8MHx8fDA%3D' },
  { id: 12, title: 'Chef Knife', price: '8500', spec: 'old', category: 'utensils', img: 'https://images.unsplash.com/photo-1596633609591-e4e1e9e06b7f?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2hlZiUyMGtuaWZlfGVufDB8fDB8fHww' },
  { id: 13, title: 'Non-Stick Frypan', price: '9000', spec: 'old', category: 'utensils', img: 'https://media.istockphoto.com/id/175450792/photo/frying-pan.webp?a=1&b=1&s=612x612&w=0&k=20&c=ooZbcHEQeufGUdVgnfP3k70TipQaCbUQF1ddmmtPFP8=' },
  { id: 14, title: 'Ceramic Dinner Set', price: '35000', spec: 'old', category: 'utensils', img: 'https://media.istockphoto.com/id/1419011866/photo/modern-tableware-set-with-cutlery-and-a-vibrant-blue-plate-with-glasses.webp?a=1&b=1&s=612x612&w=0&k=20&c=EReMeik0ao6RePjKqLLofZJKrKGbIN53Nu716amh4Mg=' },
  { id: 15, title: 'Stainless Steel Flask', price: '5000', spec: 'old', category: 'utensils', img: 'https://images.unsplash.com/photo-1664714628878-9d2aa898b9e3?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 16, title: 'Coffee Maker', price: '45000', spec: 'old', category: 'utensils', img: 'https://images.unsplash.com/photo-1707241358597-bafcc8a8e73d?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29mZmVlJTIwbWFrZXJ8ZW58MHx8MHx8fDA%3D' },
  { id: 17, title: 'Wooden Spatula Set', price: '2500', spec: 'new', category: 'utensils', img: 'https://images.unsplash.com/photo-1579892876770-461a88bd87df?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29vZGVuJTIwc3BhdHVsYXxlbnwwfHwwfHx8MA%3D%3D' },
  { id: 18, title: 'Blender Jar', price: '12000', spec: 'old', category: 'utensils', img: 'https://plus.unsplash.com/premium_photo-1718043036199-d98bef36af46?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QmxlbmRlciUyMGphcnxlbnwwfHwwfHx8MA%3D%3D' },
  { id: 19, title: 'Toaster', price: '8000', spec: 'old', category: 'utensils', img: 'https://plus.unsplash.com/premium_photo-1667238579781-cb4bd6126ffd?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8VG9hc3RlcnxlbnwwfHwwfHx8MA%3D%3D' },
  { id: 20, title: 'Spice Rack', price: '4000', spec: 'old', category: 'utensils', img: 'https://unsplash.com' },

  // GAMING (7 'new' products, IDs 21-27)
  { id: 21, title: 'Mechanical Keyboard', price: '18000', spec: 'old', category: 'gaming', img: 'https://images.unsplash.com/photo-1635987391914-cb84b567e68f?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8TWVjaGFuaWNhbCUyMEtleWJvYXJkfGVufDB8fDB8fHww' },
  { id: 22, title: 'Gaming Mouse', price: '9500', spec: 'old', category: 'gaming', img: 'https://images.unsplash.com/photo-1605773527852-c546a8584ea3?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8R2FtaW5nJTIwTW91c2V8ZW58MHx8MHx8fDA%3D' },
  { id: 23, title: 'RGB Headphones', price: '22000', spec: 'new', category: 'gaming', img: 'https://plus.unsplash.com/premium_photo-1679513691474-73102089c117?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UkdCJTIwaGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D' },
  { id: 24, title: 'Gaming Controller', price: '15000', spec: 'old', category: 'gaming', img: 'https://plus.unsplash.com/premium_photo-1731951687007-2910df0a8f73?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8R2FtaW5nJTIwY29udHJvbGxlcnxlbnwwfHwwfHx8MA%3D%3D' },
  { id: 25, title: 'Mouse Pad XL', price: '4000', spec: 'old', category: 'gaming', img: 'https://images.unsplash.com/photo-1629429408209-1f912961dbd8?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8TW91c2UlMjBQYWR8ZW58MHx8MHx8fDA%3D' },
  { id: 26, title: 'Gaming Chair', price: '85000', spec: 'old', category: 'gaming', img: 'https://plus.unsplash.com/premium_photo-1704686580555-6f31384f756a?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8R2FtaW4lMjBjaGFpcnxlbnwwfHwwfHx8MA%3D%3D' },
  { id: 27, title: 'VR Headset', price: '150000', spec: 'new', category: 'gaming', img: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8VlIlMjBoZWFkc2V0fGVufDB8fDB8fHww' },
  { id: 28, title: 'Console Stand', price: '6000', spec: 'old', category: 'gaming', img: 'https://plus.unsplash.com/premium_photo-1675942079328-cac5e6817b3e?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Q29udHJvbCUyMHN0YW5kfGVufDB8fDB8fHww' },
  { id: 29, title: 'HDMI Cable', price: '2500', spec: 'old', category: 'gaming', img: 'https://images.unsplash.com/photo-1583259034006-5ea8361109e7?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8SERNSSUyMGNhYmxlfGVufDB8fDB8fHww' },
  { id: 30, title: 'Controller Charger', price: '5500', spec: 'old', category: 'gaming', img: 'https://images.unsplash.com/photo-1611696830380-c2b5cb3fe675?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29udHJvbGxlciUyMGNoYXJnZXJ8ZW58MHx8MHx8fDA%3D' },

  // FASHION (7 'new' products, IDs 31-37)
  { id: 31, title: 'Denim Jacket', price: '14000', spec: 'old', category: 'fashion', img: 'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?q=80&w=969&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 32, title: 'White Sneakers', price: '18500', spec: 'old', category: 'fashion', img: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2hpdGUlMjBzbmVha2Vyc3xlbnwwfHwwfHx8MA%3D%3D' },
  { id: 33, title: 'Cotton Hoodie', price: '8000', spec: 'new', category: 'fashion', img: 'https://images.unsplash.com/photo-1688111421205-a0a85415b224?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Q290dG9uJTIwSG9vZGllfGVufDB8fDB8fHww' },
  { id: 34, title: 'Cargo Pants', price: '9500', spec: 'old', category: 'fashion', img: 'https://images.unsplash.com/37/lynDyjGSR9eR57ouPIEE_IMG_woods.jpg?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Q2FyZ28lMjBwYW50c3xlbnwwfHwwfHx8MA%3D%3D' },
  { id: 35, title: 'Graphic T-Shirt', price: '4000', spec: 'old', category: 'fashion', img: 'https://images.unsplash.com/photo-1766079234360-cb31e05da1c5?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8R3JhcGhpY3MlMjBULXNoaXJ0fGVufDB8fDB8fHww' },
  { id: 36, title: 'Boots', price: '28000', spec: 'new', category: 'fashion', img: 'https://plus.unsplash.com/premium_photo-1729788891863-0d9b6f2b453b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2hlbHNlYSUyMGJvb3R8ZW58MHx8MHx8fDA%3D' },
  { id: 37, title: 'Summer Dress', price: '11000', spec: 'new', category: 'fashion', img: 'https://images.unsplash.com/photo-1532675432006-329c6fed7045?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8U3VtbWVyJTIwRHJlc3N8ZW58MHx8MHx8fDA%3D' },
  { id: 38, title: 'Vintage Scarf', price: '2500', spec: 'old', category: 'fashion', img: 'https://plus.unsplash.com/premium_photo-1676389763024-fc022262558d?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8VmludGFnZSUyMHNjYXJmfGVufDB8fDB8fHww' },
  { id: 39, title: 'Jersey', price: '7000', spec: 'old', category: 'fashion', img: 'https://images.unsplash.com/photo-1589178941221-136be7711c99?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 40, title: 'Leather Gloves', price: '3500', spec: 'old', category: 'fashion', img: 'https://images.unsplash.com/photo-1634852836003-c0aa5b67d243?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8TGVhdGhlciUyMGdsb3Zlc3xlbnwwfHwwfHx8MA%3D%3D' },

  // OTHERS (7 'new' products, IDs 41-47)
  { id: 41, title: 'Desk Lamp', price: '6500', spec: 'new', category: 'others', img: 'https://images.unsplash.com/photo-1621447980929-6638614633c8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGVzayUyMGxhbXB8ZW58MHx8MHx8fDA%3D' },
  { id: 42, title: 'Notebook Journal', price: '1500', spec: 'new', category: 'others', img: 'https://images.unsplash.com/photo-1531615018523-12556603349f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bm90ZWJvb2slMjBqb3JuYWx8ZW58MHx8MHx8fDA%3D' },
  { id: 43, title: 'Water Bottle', price: '3500', spec: 'new', category: 'others', img: 'https://images.unsplash.com/photo-1625708458528-802ec79b1ed8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2F0ZXIlMjBib3R0bGV8ZW58MHx8MHx8fDA%3D' },
  { id: 44, title: 'Indoor Plant', price: '4500', spec: 'old', category: 'others', img: 'https://images.unsplash.com/photo-1768064722888-2136781a4150?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8SW5kb29yJTIwcGFudHN8ZW58MHx8MHx8fDA%3D' },
  { id: 45, title: 'Bluetooth Speaker', price: '16000', spec: 'new', category: 'others', img: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 46, title: 'Aromatherapy Diffuser', price: '8500', spec: 'old', category: 'others', img: 'https://unsplash.com' },
  { id: 47, title: 'Wall Clock', price: '5000', spec: 'old', category: 'others', img: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 48, title: 'Storage Box', price: '3000', spec: 'old', category: 'others', img: 'https://unsplash.com' },
  { id: 49, title: 'Travel Pillow', price: '2500', spec: 'old', category: 'others', img: 'https://images.unsplash.com/photo-1747107237201-7047ccfbeac7?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8VHJhdmVsJTIwcGlsbG93fGVufDB8fDB8fHww' },
  { id: 50, title: 'Bookends', price: '4000', spec: 'new', category: 'others', img: 'https://plus.unsplash.com/premium_photo-1721762724239-e5fbfc8ef3c1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Qm9va2VuZHxlbnwwfHwwfHx8MA%3D%3D' }
];

let cart =[
    { id:1,
      cartId: 1,
      quantity: 2,
      email:"johndoe@gmail.com",
      price: 12500,
      category: "accessories",
      title: 'Leather Backpack',
      spec: 'old', 
      category: 'accessories',
      img: '',
    }
]
router.get('/',(req,res) => {
  res.status(201).json('cart is working')
})

router.post('/',authMiddleware,(req,res) => {
  const {email} = req.body;

  if (!email) return res.status(401).json({error: 'no user id provided'});  

  const getusercart = cart.filter(item => item.email == email);  

  res.status(201).json(getusercart)
})

router.post('/:id',authMiddleware,(req,res) => {
  const {email,quantity} = req.body;
  const id = req.params.id

  if (!email) res.status(401).json({error: 'no user info provided'});

  const findItem = store.find(item => item.id == id);

  if (!findItem) res.status(401).json({error: 'cart item does not exist'});

  const findincart = cart.find(item => item.id == id && item.email == email);

  const newCart = {
      id:cart.length + 1,
      cartId : findItem.id,
      quantity: quantity,
      email:email,
      price: findItem.price,
      category: findItem.category,
      title: findItem.title,
      spec: findItem.spec, 
      category: findItem.category,
      img: findItem.img,
    };

  if (findincart ){
    cart.indexOf(findincart) = newCart;
  } else {
  cart.push(newCart);
  }

  res.status(201).json('product added to cart')

})

router.delete('/delete/:id',authMiddleware,(req,res) => {
  const id = req.params.id

  if (!id) return res.status(401).json({error: 'no user id provided'});  

  const getusercart = cart.find(item => item.id == id);  

  if (!getusercart) return res.status(401).json({error: 'item not found'});  

  cart = cart.filter(item => item.id != id);

  return res.status(201).json({message:'item deleted'})
})

export default router