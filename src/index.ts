import express from 'express';
import session from 'express-session';
import passport from 'passport';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';
import cartRoutes from './routes/cartRoutes';
import offerRoutes from './routes/offerRoutes';
import categoryRoutes from './routes/categoryRoutes';
import wishlistRoutes from './routes/wishlistRoutes';
import orderItemRoutes from './routes/orderItemRoutes';
import shippingAddressRoutes from './routes/shippingAddressRoutes';
import orderShippingAddressRoutes from './routes/orderShippingAddressRoutes';
import './config/passport-setup'; // Import passport setup

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-session-secret',
  resave: false,
  saveUninitialized: false
}));

// Initialize Passport and restore authentication state from the session
app.use(passport.initialize());
app.use(passport.session());

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/orderItem', orderItemRoutes);
app.use('/api/shipping-addresses', shippingAddressRoutes);
app.use('/api/order-shipping-addresses', orderShippingAddressRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/category', categoryRoutes);


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
