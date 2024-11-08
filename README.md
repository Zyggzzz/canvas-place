# CanvasPlace - A Clone of r/place

CanvasPlace is a pixel art platform inspired by the r/place community project. It allows users to create accounts, log in with JWT-based sessions, and participate in a shared pixel art canvas. Built using Next.js, React, Bun, and a custom API, this project aims to provide a simple, interactive platform for creative expression.

## Features

- **User Authentication**: Account creation and login functionality using JWT-based sessions.
- **Pixel Art Canvas**: Users can place colored pixels on a shared canvas.
- **Rate Limiting**: Basic rate limiting is enforced, so users can only place pixels at specified intervals.
- **Tech Stack**: Bun, Next.js, React, JavaScript, and a SQL database for persistence.

## Database Structure

This project uses a SQL database with the following structure:

- **pixels** table: Stores pixel coordinates and color information.
- **sessions** table: Stores JWT tokens for authenticated sessions.
- **users** table: Stores user information, including usernames, hashed passwords, and timestamps of their last pixel placement.

```sql
-- pixels table
CREATE TABLE IF NOT EXISTS `pixels` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `x` int(11) DEFAULT 0,
  `y` int(11) DEFAULT 0,
  `color` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- sessions table
CREATE TABLE IF NOT EXISTS `sessions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `token` varchar(500) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- users table
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `last_placed_at` bigint(20) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

## Prerequisites

Before you begin, ensure you have the following installed:

    Bun
    Node.js and npm (optional but recommended)
    MySQL or compatible SQL database

## Getting Started

Follow these steps to clone and set up the project locally:
  1. Clone the Repository

    git clone https://github.com/your-username/CanvasPlace.git
    cd CanvasPlace

2. Install Dependencies

Using Bun:

    bun install

3. Configure the Database

Create a MySQL database named canvasplace and import the table structure provided above.

    CREATE DATABASE canvasplace;
    USE canvasplace;
    -- Paste table creation scripts here

4. Environment Variables

Create a .env file in the root directory and set the following environment variables:

    JWT_SECRET=*your jwt secret key*
    dbhost=*your host ip*
    dbuser=*your database username*
    dbpass=*your database password*
    dbname=*your database name*
    dbport=*your database port*



5. Run the Development Server

To start the server, use the following command:

    bun run dev

Your application should now be running at http://localhost:3000.
6. Testing the Application

    Sign Up: Create a new account through the UI.
    Log In: Use your credentials to log in. A JWT token will be generated and stored for the session.
    Place Pixels: Choose a pixel on the canvas, select a color, and place it. The color will appear on the canvas for all users to see.

Project Structure

This is the project structure for CanvasPlace:

    CanvasPlace
    ├── app
    │   ├── api
    │   │   ├── auth
    │   │   │   ├── signin
    │   │   │   │   └── route.js
    │   │   │   └── signUp
    │   │   │       └── route.js
    │   │   ├── pixelArt
    │   │   │   └── route.js
    │   │   └── protected
    │   │       └── route.js
    │   ├── auth
    │   │   ├── error
    │   │   │   └── page.js
    │   │   ├── signin
    │   │   │   └── page.js
    │   │   └── signUp
    │   │       └── page.js
    │   ├── error
    │   │   └── page.js
    │   ├── favicon.ico
    │   ├── layout.js
    │   └── page.js
    ├── assets
    │   ├── components
    │   │   └── pixelArtCanvas.jsx
    │   ├── css
    │   │   ├── artBoard.css
    │   │   ├── error.css
    │   │   ├── root.css
    │   │   └── signUp.css
    │   └── js
    │       ├── database.js
    │       └── token.js
    ├── .gitignore
    ├── bun.lockb
    ├── jsconfig.json
    ├── next.config.mjs
    ├── package.json
    └── README.md

  app/api: Contains custom API routes for managing authentication, pixel art data, and protected routes.
  app/auth: Authentication-related pages, such as sign-in, sign-up, and error pages.
  app/error: Error handling page.
  assets/components: Reusable components, such as the pixel art canvas component.
  assets/css: CSS files for styling different parts of the application.
  assets/js: Utility JavaScript files, such as database connection and token handling.

Future Improvements

    Real-time updates: Implement real-time updates with WebSockets for a more interactive experience.
    Rate limiting: Add rate limiting feature
    Canvas resizing: Support multiple canvas sizes and zoom levels.

Contributing

This project was created as a solo project. If you'd like to suggest improvements or report issues, feel free to create an issue or fork the repository.
