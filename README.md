<<<<<<< HEAD

=======
# 🛒 Ecommerce Backend

This is the **backend** for the Ecommerce website, built using **Node.js, Express, and MongoDB**.  
It includes **user authentication, admin panel APIs, and product management** with image upload.

---

## 🚀 Features

✅ User **Registration & Login** (JWT Authentication)  
✅ **Admin Panel** (Only admins can manage products)  
✅ **CRUD for Products** (Add, Update, Delete, Get Products)  
✅ **Image Upload** (Multer)  
✅ **Secure Routes** (Protected with JWT middleware)

---

## 📂 Project Structure

Ecommerce-Backend/ │── controllers/ │ ├── productController.js │── middlewares/ │ ├── authMiddleware.js │── models/ │ ├── User.js │ ├── product.js │── routes/ │ ├── authRoutes.js │ ├── productRoutes.js │── uploads/ (Stores uploaded images) │── .env (Environment Variables - Not Uploaded) │── .gitignore │── package.json │── server.js (Main Entry Point)

yaml
Copy
Edit

---

## 🛠️ Installation & Setup

### **1️⃣ Clone the Repository**

```sh
git clone https://github.com/kunalsingh059/Ecommerce-Backend.git
cd Ecommerce-Backend
2️⃣ Install Dependencies
sh
Copy
Edit
npm install
3️⃣ Create a .env File
Create a .env file in the project root and add the following:

sh
Copy
Edit
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
Replace:

your_mongodb_connection_string → With the MongoDB URL
your_jwt_secret_key → With a secure JWT secret
▶️ Running the Server
4️⃣ Start the Server
sh
Copy
Edit
npm start
or (if using nodemon for auto-restart on code changes)

sh
Copy
Edit
nodemon server.js
If successful, you should see:

pgsql
Copy
Edit
Server running on port 3000
Connected to MongoDB
🔄 API Endpoints (For Testing in Postman)
🛠️ Authentication APIs
✅ Register a User
Method: POST
URL: http://localhost:3000/api/auth/register
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
Response:
json
Copy
Edit
{
  "message": "User created successfully"
}
✅ Login
Method: POST
URL: http://localhost:3000/api/auth/login
Body (JSON):
json
Copy
Edit
{
  "email": "john@example.com",
  "password": "123456"
# }
Response:
json
Copy
Edit
{
  "message": "Login successful",
  "token": "your_jwt_token",
  "isAdmin": true
}
📝 Note: Copy the token from the response; it will be needed for protected routes.

🛍️ Product APIs
✅ Get All Products
Method: GET
URL: http://localhost:3000/api/products
✅ Get Product by ID
Method: GET
URL: http://localhost:3000/api/products/:id
✅ Add a Product (Admin Only)
Method: POST
URL: http://localhost:3000/api/products
Headers:
Authorization: Bearer your_jwt_token
Body (form-data for Image Upload):
name: "Laptop"
price: "1000"
image: Upload an image file
category: "Electronics"
Response:
json
Copy
Edit
{
  "message": "Product added successfully",
  "product": { "id": "123", "name": "Laptop", "price": "1000" }
}
✅ Update a Product (Admin Only)
Method: PUT
URL: http://localhost:3000/api/products/:id
Headers:
Authorization: Bearer your_jwt_token
Body (JSON):
json
Copy
Edit
{
  "name": "Updated Laptop",
  "price": "1100"
}
✅ Delete a Product (Admin Only)
Method: DELETE
URL: http://localhost:3000/api/products/:id
Headers:
Authorization: Bearer your_jwt_token
🔐 Admin Panel Access
Only users with isAdmin: true can add/update/delete products.
If a non-admin tries to access admin routes, they will get:
json
Copy
Edit
{
  "message": "Access denied. Admins only."
}
📦 Technologies Used
Node.js (Backend Runtime)
Express.js (Web Framework)
MongoDB (Database)
Mongoose (MongoDB ODM)
JWT (Authentication)
Bcrypt.js (Password Hashing)
Multer (File Upload)
dotenv (Environment Variables)
🤝 Contributing
Feel free to contribute! If you find any issues, create a pull request or open an issue.

📩 Contact
For any questions, reach out at:
📧 kunalsingh059@gmail.com

```
>>>>>>> 6606c1e (Added README file)

