3️⃣ Install Dependencies
Since your backend uses Node.js and Express, they need to install the required dependencies.
Run:

sh
Copy
Edit
npm install
This will install all dependencies listed in package.json, including:

express
mongoose
jsonwebtoken
bcryptjs
multer
dotenv
...etc.
4️⃣ Create a .env File (Environment Variables)
Since .env files are not uploaded to GitHub for security reasons, they must create a new .env file in the project root and add necessary variables.

Tell them to create .env and add:

sh
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
Replace:

your_mongodb_connection_string → With the correct MongoDB URL.
your_jwt_secret_key → With a secure secret for JWT authentication.
5️⃣ Start the Backend Server
Run:

sh
Copy
Edit
npm start
or

sh
Copy
Edit
nodemon server.js
(if using nodemon for automatic restarts).

If everything is correct, they should see:

pgsql
Copy
Edit
Server running on port 5000
Connected to MongoDB
6️⃣ Test APIs Using Postman
Ask them to test APIs with Postman:

✅ Register a User
Method: POST
URL: http://localhost:5000/api/auth/register
Body (JSON):
json
Copy
Edit
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456",
  "confirmPassword": "123456"
}
Expected Response:
json
Copy
Edit
{
  "message": "User created successfully"
}
✅ Login
Method: POST
URL: http://localhost:5000/api/auth/login
Body (JSON):
json
Copy
Edit
{
  "email": "john@example.com",
  "password": "123456"
}
Response:
json
Copy
Edit
{
  "message": "Login successful",
  "token": "your_jwt_token",
  "isAdmin": true
}
IMPORTANT: Ask them to copy the token; it is needed for authentication.

✅ Get All Products
Method: GET
URL: http://localhost:5000/api/products
✅ Add a Product (Admin Only)
Method: POST
URL: http://localhost:5000/api/products
Headers:
Authorization: Bearer your_jwt_token
Body (form-data for Image Upload):
name: "Laptop"
price: "1000"
image: Upload an image file
category: "Electronics"
