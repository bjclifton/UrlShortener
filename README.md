# URL Shortener

A full-stack URL shortener application built with React, Node.js, Express, and MongoDB.

## Features

- Shorten long URLs to easily shareable links
- User authentication and registration
- User-specific link management
- Copy shortened URLs with a single click
- Dark mode support for comfortable viewing in low-light environments

## Screenshots

### Home Page
![image](https://github.com/user-attachments/assets/9494c700-47d4-40d7-8475-86b05367c608)

### URL Shortening Result
![image](https://github.com/user-attachments/assets/bc99a235-ddd6-40ff-ad52-59f855c40908)

### User Profile
![image](https://github.com/user-attachments/assets/9a4a2939-2600-4c1c-847b-8c2c38c17558)

### Login Page
![image](https://github.com/user-attachments/assets/ce4fc260-c05a-43c1-afc4-b70946c1b432)

### Registration Page
![image](https://github.com/user-attachments/assets/d2b13eb3-0142-43f1-be6d-4db9dcaa7ce3)

### Dark Mode
![image](https://github.com/user-attachments/assets/22c1b545-7807-4499-9a30-39ecbb60a331)

## Installation and Setup

### Prerequisites

- Node.js (v20 or later)
- npm
- MongoDB Atlas account

### Backend Setup

1. Clone the repository:
```
git clone https://github.com/bjclifton/url-shortener.git
cd url-shortener
```
2. Navigate to the backend directory:
```
cd back
```
3. Install dependencies:
`npm install`
4. Create a `.env` file in the `/back` directory with the following contents:
```
BASE_URL=http://localhost:YOUR_BACKEND_PORT
PORT=YOUR_BACKEND_PORT
MONGODB_URI=your_mongodb_atlas_connection_string
SESSION_SECRET=your_session_secret
```
Replace `YOUR_BACKEND_PORT`, `your_mongodb_atlas_connection_string`, and `your_session_secret` with your actual values.

5. Start the backend server:
`npm start`
### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
`cd front`
2. Install dependencies:
`npm install`
3. Start the frontend development server:
`npm run dev`
The frontend will run on `http://localhost:5173` by default.

## Usage

1. Open your browser and go to `http://localhost:5173`
2. Register for a new account or log in if you already have one
3. Enter a long URL in the input field on the home page and click "Shorten"
4. Copy and share your shortened URL
5. View and manage your shortened URLs on your profile page

## Technologies Used

- Frontend: React, Material-UI
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: Passport.js

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
