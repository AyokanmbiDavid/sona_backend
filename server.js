import express from "express";
import 'dotenv/config';
import useRoutes from './routes/userRoutes.js'
import storeRoutes from './routes/storeRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import cors from 'cors'
const app = express();
const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(cors({
    origin: 'http://localhost:5173',
    methods:['GET','POST','PUT','DELETE','OPTIONS'],
    allowedHeaders:['Content-Type','Authorization'],
    credentials: true
}));

app.use('/api/user',useRoutes)
app.use('/api/store',storeRoutes)
app.use('/api/cart',cartRoutes)

app.get('/',(req,res) => {
    res.json({message:'Sona backend running'})
})

app.listen(PORT,() => {
    console.log('Sona backend running successful');
    console.log(`Server running on localhost:${PORT}`);    
})