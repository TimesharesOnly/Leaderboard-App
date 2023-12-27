<div align="center">


<!-- Short description: -->
<h2>MERN Stack Boilerplate for production use</h2>

## 📖 Prerequisites

In order to run the project you need `node>=16` and `npm>=8` installed on your machine.

## 🚩 Getting Started

### 1. Clone the `mern-stack-authentication-boilerplate` repository:

```bash
git clone https://github.com/TimesharesOnly/Leaderboard-App.git
```

### 2. Navigate into repo:
```bash
cd mern-stack-authentication-boilerplate
```

### 3. Rename `.env.example` into `.env` and put all creadentials:

```bash
# In the root directory put your creadentials
APP_BASE_URL=http://localhost:3000
NODE_ENV=development
PORT=5000
MONGO_URI="YOUR_MONGO_CONNECTION_URL"
JWT_SECRET="YOUR_JWT_SECRET"
JWT_EXPIRE=24 # In hours
SMTP_HOST=<YOUR_SMTP_SERVER_HOST_NAME>
SMTP_PORT=587
SMTP_USER=<YOUR_SMTP_SERVER_USER_NAME>
SMTP_PASSWORD=<YOUR_SMTP_SERVER_PASSWORD>
EMAIL_FROM=<EMAIL_ADDRESS_OF_SENDER>

# Now go to client folder and put your cloudinary creadentials 
REACT_APP_CLOUDINARY_CLOUD_NAME=<YOUR_CLOUDINARY_CLOUD_NAME>
REACT_APP_CLOUDINARY_UPLOAD_PRESET=<YOUR_CLOUDINARY_UPLOAD_PRESET>
```

### 4. Install package dependencies:

```bash
npm install # Server dependencies
cd client
npm install # Client dependencies
```

### 4. Run project:
In the `root` directory, open two terminal sessions and run both commands separately:

```bash
npm run client
npm run server
```