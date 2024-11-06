# The Clothing Store

## Prerequisites
1. Node.js and npm (Download from https://nodejs.org/)
2. PostgreSQL (Download from https://www.postgresql.org/download/)
3. yarn (`npm install -g yarn`)

## Database Setup
1. Install PostgreSQL:
   - Windows: Download and run installer from https://www.postgresql.org/download/windows/
   - During installation:
     - Remember the password you set for the postgres user
     - Keep the default port (5432)
     - Install pgAdmin 4 when prompted

2. Configure Database:
   - Open pgAdmin 4
   - Right-click on 'Databases'
   - Create new database named 'clothingstore'

## Project Setup

1. Clone the repository:
```bash
git clone git@github.com:tim-macphail/TheClothingStore.git
cd TheClothingStore
```

2. Backend Setup:
```bash
cd backend
yarn install

# Create a .env file with your database credentials
# Copy the contents below into .env and modify as needed:
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password_here
DB_DATABASE=clothingstore
```

3. Frontend Setup:
```bash
cd frontend
yarn install
```

## Importing Initial Data

1. Make sure your database is running
2. In the backend directory:
```bash
yarn import-data
```

## Running the Application

1. Start the backend server:
```bash
cd backend
yarn dev
```

2. In a new terminal, start the frontend:
```bash
cd frontend
yarn dev
```

3. Access the application:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

## Troubleshooting

### Database Connection Issues
1. Verify PostgreSQL is running
2. Check your .env file credentials
3. Make sure the database 'clothingstore' exists
4. Try connecting through pgAdmin to verify credentials

### Data Import Issues
If the data import fails:
1. Open pgAdmin
2. Connect to the clothingstore database
3. Run this SQL to verify the tables exist:
```sql
SELECT * FROM products;
```

### Common Fixes
- If tables aren't created automatically, run the server once with `yarn dev` to create them
- If you need to reset the database, you can run:
```sql
TRUNCATE TABLE order_items, cart, products CASCADE;
```

## Project Structure
```
TheClothingStore/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── entities/
│   │   ├── routes/
│   │   ├── scripts/
│   │   └── index.ts
│   ├── .env
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   └── App.tsx
    └── package.json
```

## API Endpoints
- GET /api/products - Get all products
- GET /api/products/:id - Get single product
- POST /api/products - Create new product
- PUT /api/products/:id - Update product
- DELETE /api/products/:id - Delete product
