# MiniLux 

**MiniLux** is an innovative e-commerce platform designed to solve a major pain point in the beauty and personal care industry. 

When shopping online for skincare, makeup, or perfumes, it's incredibly difficult to determine if a shade matches, if a fragrance is appealing, or if a skincare product suits your skin type. Moreover, due to hygiene concerns, these items are strictly **non-returnable**.

MiniLux tackles this issue head-on by allowing customers to **order samples** of these visual and sensory products. Instead of risking money on full-sized products that might not work out, users can buy affordable samples, find their perfect match, and shop with confidence.

---

## 🚀 Tech Stack

### Frontend (Team)
- **React.js**
- **Redux** (State Management)
- **Tailwind CSS** (Styling)
- **Shadcn UI** (Component Library)

### Backend (My Role)
- **Node.js & Express.js** (REST API)
- **MongoDB & Mongoose** (Database)
- **JSON Web Tokens (JWT)** (Authentication & Authorization)
- **Cloudinary & Multer** (Image Uploads & Storage)
- **Nodemailer** (Email Notifications)

---

## 🛠️ Setup & Installation

This repository contains the backend code for the MiniLux project. Follow the instructions below to get the development server running locally.

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- [MongoDB](https://www.mongodb.com/) installed locally or a MongoDB Atlas URI
- A [Cloudinary](https://cloudinary.com/) account for image storage
- A Gmail account with an App Password for Nodemailer

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/minilux.git
cd minilux/server
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the `server` directory and configure the following variables:

```env
# Server Configuration
PORT=5000

# Database Configuration
MONGO_URL=your_mongodb_connection_string

# Nodemailer Email Configuration
Gmail=your_email@gmail.com
Password=your_app_password

# Authentication
JWT_SECRET=your_jwt_secret_key

# Cloudinary Configuration
Cloud_Name=your_cloud_name
API_KEY=your_api_key
API_SECRET=your_api_secret
```

### 4. Run the Development Server

```bash
# Starts the server with nodemon for hot-reloading
npm run dev
```

The server should now be running on `http://localhost:5000`.

---

## 🗄️ Backend Architecture & Features

As the backend developer for MiniLux, the core features developed include:
- **User Authentication**: Secure registration and login flows using JWT.
- **Product Management**: APIs for creating, updating, and fetching product details. Integrated Cloudinary for seamless image hosting and Multer for multipart form data parsing.
- **Order Processing**: Robust handling of the logic for placing sample orders securely.
- **Email Notifications**: Integrated Nodemailer to send automated order confirmations and system updates to users.
- **Database Modeling**: Designed efficient MongoDB schemas for Users, Products, and Orders using Mongoose.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yourusername/minilux/issues).
