# 🔐 React Authentication App

A React-based authentication system integrated with the external **Authentication API**:  
👉 [https://os-project-server.vercel.app](https://os-project-server.vercel.app)

The app includes:
- ✅ **User Registration** (with token storage)  
- ✅ **Login** with JWT authentication  
- ✅ **Forgot/Reset Password** via OTP email (API integrated)  
- ✅ **Welcome Dashboard** showing token-based user data  
- ✅ **Animated UI** with modern background effects  

---

## 🚀 Features
- **JWT Authentication** – Tokens are securely stored in `localStorage`
- **API Integration** – Uses external API endpoints for login, register, and password reset
- **Password Reset Flow** – User receives OTP on email for resetting their password
- **Protected Routes** – Dashboard is only accessible with valid token
- **UI/UX Enhancements** – Gradient animations, floating particles, and responsive design

---

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/ZaighamNasir/Auth-api-integration-Part-two-.git
cd Auth-api-integration-Part-two-
```
### 2. Install dependencies
```bash
npm install
```
### 3. Start development server
```bash
npm run dev
```
### The app will run on:
👉 http://localhost:5173/ (if using Vite)
👉 http://localhost:3000/ (if using CRA)

## 🔑 Authentication Flow

### 1. Register

- User signs up with username, email, and password.
- A JWT token is generated and stored in localStorage.

### 2. Login

- User logs in with credentials.
- On success, a JWT token is received → stored in localStorage.
- Token is decoded (using jwt-decode) to get user info.

### 3. Dashboard (Protected Route)

- Only accessible if a valid token exists.
- Displays personalized welcome message with user data.

### 4. Forgot/Reset Password

- User enters their email to request password reset.
- API sends an OTP email.
- User enters OTP + new password to reset account.

## 🧪 How to Test the App

1. Register a new account.
2. Login with your credentials.
3. Check Dashboard – your decoded token info will be displayed.
4. Use Forgot Password:
    - Enter your email.
    - Check your inbox for OTP.
    - Enter OTP + new password to reset
5. Try logging in again with the new password.

## 🛠️ Tech Stack

- React + Vite
- Framer Motion (animations)
- React Router (navigation)
- TailwindCSS (styling)
- jwt-decode (JWT decoding)

## 👨‍💻 Author

### Developed by Zaigham Nasir ✨
