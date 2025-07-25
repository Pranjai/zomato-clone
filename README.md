# Food Ordering Portal - DASS Assignment

A comprehensive web application for food ordering built with the MERN stack, allowing students to order food from various vendors within IIIT campus.

## Features

### Authentication System
- User registration with role selection (Buyer/Vendor)
- Secure login system with JWT authentication
- Role-based access control

### Buyer Features
- **Dashboard**: Browse and search food items with advanced filtering
- **Search & Filter**: 
  - Fuzzy search by food name
  - Filter by Veg/Non-Veg, shop name, tags, price range
  - Sort by price and rating
- **Favorites**: Mark and view favorite food items
- **Wallet Management**: Add money and track balance
- **Order Management**: Place orders, track status, rate completed orders
- **Profile Management**: Update personal information

### Vendor Features
- **Food Menu Management**: Add, edit, delete food items
- **Order Processing**: Manage incoming orders through different stages
- **Statistics Dashboard**: View sales analytics and order statistics
- **Profile Management**: Update shop information and timings

### Order Management System
Order statuses: PLACED → ACCEPTED → COOKING → READY FOR PICKUP → COMPLETED/REJECTED

### Additional Features
- Responsive design for mobile and desktop
- Real-time order status updates
- Wallet-based payment system
- Rating and review system
- Vendor availability checking based on opening hours

## Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Frontend
- **React.js** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **React Toastify** - Notifications
- **Lucide React** - Icons

## Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Backend Setup
1. Navigate to the backend directory:
   \`\`\`bash
   cd backend
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Create a `.env` file in the backend directory:
   \`\`\`env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/food-ordering
   JWT_SECRET=your-secret-key-here
   \`\`\`

4. Start the backend server:
   \`\`\`bash
   npm run dev
   \`\`\`

### Frontend Setup
1. Navigate to the frontend directory:
   \`\`\`bash
   cd frontend
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Start the frontend development server:
   \`\`\`bash
   npm start
   \`\`\`

The application will be available at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Food Items
- `GET /api/foods` - Get all food items with filters
- `POST /api/foods` - Add new food item (vendor only)
- `PUT /api/foods/:id` - Update food item (vendor only)
- `DELETE /api/foods/:id` - Delete food item (vendor only)
- `POST /api/foods/:id/favorite` - Toggle favorite status

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Place new order
- `PUT /api/orders/:id/status` - Update order status (vendor only)
- `POST /api/orders/:id/rate` - Rate completed order

### Wallet
- `GET /api/wallet` - Get wallet balance
- `POST /api/wallet/add-money` - Add money to wallet

## Database Schema

### User Model
\`\`\`javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  userType: enum['buyer', 'vendor'],
  // Buyer fields
  contactNumber: String,
  age: Number,
  batch: enum['UG1', 'UG2', 'UG3', 'UG4', 'UG5'],
  favorites: [ObjectId],
  // Vendor fields
  shopName: String (unique),
  openingTime: String,
  closingTime: String
}
\`\`\`

### Food Model
\`\`\`javascript
{
  name: String,
  price: Number,
  rating: Number,
  ratingCount: Number,
  totalRating: Number,
  isVeg: Boolean,
  image: String,
  addons: [{name: String, price: Number}],
  tags: [String],
  vendor: ObjectId,
  isAvailable: Boolean
}
\`\`\`

### Order Model
\`\`\`javascript
{
  buyer: ObjectId,
  vendor: ObjectId,
  items: [{
    food: ObjectId,
    quantity: Number,
    selectedAddons: [{name: String, price: Number}],
    itemTotal: Number
  }],
  totalAmount: Number,
  status: enum['PLACED', 'ACCEPTED', 'COOKING', 'READY FOR PICKUP', 'COMPLETED', 'REJECTED'],
  rating: Number
}
\`\`\`

### Wallet Model
\`\`\`javascript
{
  user: ObjectId,
  balance: Number,
  transactions: [{
    type: enum['CREDIT', 'DEBIT', 'REFUND'],
    amount: Number,
    description: String,
    createdAt: Date
  }]
}
\`\`\`

## Usage

### For Buyers
1. Register as a buyer with personal details
2. Add money to wallet
3. Browse food items using search and filters
4. Add items to cart with desired quantity and add-ons
5. Place orders (separate orders for different vendors)
6. Track order status in "My Orders" section
7. Rate completed orders

### For Vendors
1. Register as a vendor with shop details
2. Add food items to menu with details and add-ons
3. Manage incoming orders through different stages
4. View statistics and analytics
5. Update profile and shop timings

## Business Logic

### Order Processing
- Buyers can only order from open vendors
- Vendors can handle maximum 10 orders in ACCEPTED + COOKING stages
- Money is deducted from wallet when order is placed
- Refund is processed if order is rejected
- Rating updates food item's average rating

### Wallet System
- Dummy money addition system for testing
- Sufficient balance required for placing orders
- Transaction history maintained

## Error Handling
- Input validation on both frontend and backend
- Proper error messages for user actions
- Edge cases handled (insufficient balance, vendor capacity, etc.)

## Security Features
- Password hashing with bcrypt
- JWT token-based authentication
- Role-based route protection
- Input sanitization and validation

## Future Enhancements
- Email notifications for order updates
- Google/Facebook authentication
- Image upload for food items
- Advanced analytics and reporting
- Push notifications
- Payment gateway integration

## Testing
The application should be thoroughly tested for:
- User registration and login
- Food item management
- Order placement and processing
- Wallet functionality
- Edge cases and error scenarios

## Deployment
The application can be deployed on platforms like:
- **Backend**: Heroku, AWS, DigitalOcean
- **Frontend**: Netlify, Vercel
- **Database**: MongoDB Atlas

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make changes and test thoroughly
4. Submit a pull request

## License
This project is for educational purposes as part of DASS Assignment.
\`\`\`