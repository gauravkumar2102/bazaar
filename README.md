# 🛍️ Bazaar — Micro Marketplace

A full-stack marketplace app with **Node.js/Express** backend, **React** web app, and **React Native (Expo)** mobile app.

---

## 📋 Table of Contents

- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [API Reference](#api-reference)
- [Test Credentials](#test-credentials)
- [Project Structure](#project-structure)
- [Features](#features)

---

## Architecture

```
micro-marketplace/
├── backend/      Node.js + Express + MongoDB REST API
├── web/          React web application
└── mobile/       React Native (Expo) mobile app
```

---

## Tech Stack

| Layer    | Technology                                      |
|----------|-------------------------------------------------|
| Backend  | Node.js, Express, MongoDB, Mongoose, JWT, bcrypt|
| Web      | React 18, React Router v6, Axios                |
| Mobile   | React Native, Expo 50, React Navigation         |

---

## Quick Start

### Prerequisites

- Node.js ≥ 18
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas) cloud)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`) — for mobile

---

### 1. Backend

```bash
cd backend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env — set MONGODB_URI and JWT_SECRET

# Seed the database (10 products + 2 users)
npm run seed

# Start development server
npm run dev
# → Running on http://localhost:5000
```

**`.env` file:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/micro-marketplace
JWT_SECRET=your-super-secret-key-change-in-production
NODE_ENV=development
```

---

### 2. Web App

```bash
cd web

# Install dependencies
npm install

# Start development server
npm start
# → Opens http://localhost:3000
```

The web app proxies API requests to `http://localhost:5000` via the `proxy` field in `package.json`.

---

### 3. Mobile App

```bash
cd mobile

# Install dependencies
npm install

# Start Expo dev server
npm start

# Press 'a' for Android emulator
# Press 'i' for iOS simulator
# Scan QR code with Expo Go app on your phone
```

> **Important:** If testing on a real device, update `BASE_URL` in `mobile/src/utils/api.js` to your machine's local IP (e.g., `http://192.168.1.10:5000`).

---

## API Reference

Base URL: `http://localhost:5000`

All protected routes require: `Authorization: Bearer <token>`

---

### Auth

#### `POST /auth/register`
Register a new user.

**Body:**
```json
{
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "password": "password123"
}
```

**Response `201`:**
```json
{
  "success": true,
  "data": {
    "user": { "_id": "...", "name": "Alice Johnson", "email": "alice@example.com" },
    "token": "eyJhbGci..."
  }
}
```

---

#### `POST /auth/login`
Login with email and password.

**Body:**
```json
{
  "email": "alice@example.com",
  "password": "password123"
}
```

**Response `200`:**
```json
{
  "success": true,
  "data": { "user": { ... }, "token": "eyJhbGci..." }
}
```

---

#### `GET /auth/me` 🔒
Get current authenticated user.

---

### Products

#### `GET /products`
List products with search, filters, and pagination.

**Query Parameters:**

| Parameter  | Type   | Description                                         |
|------------|--------|-----------------------------------------------------|
| `q`        | string | Search title, description, category                 |
| `category` | string | Filter by category (Electronics, Clothing, etc.)    |
| `minPrice` | number | Minimum price                                       |
| `maxPrice` | number | Maximum price                                       |
| `sort`     | string | `newest` \| `price_asc` \| `price_desc` \| `rating`|
| `page`     | number | Page number (default: 1)                            |
| `limit`    | number | Results per page (default: 10, max: 100)            |

**Example:** `GET /products?q=headphones&category=Electronics&sort=price_asc&page=1&limit=8`

**Response `200`:**
```json
{
  "success": true,
  "data": {
    "products": [ { "_id": "...", "title": "...", "price": 49.99, ... } ],
    "pagination": {
      "page": 1,
      "limit": 8,
      "total": 10,
      "totalPages": 2,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

---

#### `GET /products/:id`
Get a single product by ID.

---

#### `POST /products` 🔒
Create a new product.

**Body:**
```json
{
  "title": "My Product",
  "price": 29.99,
  "description": "A great product",
  "image": "https://example.com/image.jpg",
  "category": "Electronics",
  "stock": 50
}
```

**Categories:** `Electronics` | `Clothing` | `Home` | `Books` | `Sports` | `Beauty` | `Toys` | `Food` | `Other`

---

#### `PUT /products/:id` 🔒
Update a product (owner only). Accepts same fields as POST, all optional.

---

#### `DELETE /products/:id` 🔒
Delete a product (owner only).

---

#### `POST /products/:id/favorite` 🔒
Toggle favorite on a product (add if not favorited, remove if favorited).

**Response `200`:**
```json
{
  "success": true,
  "message": "Added to favorites",
  "data": { "favorited": true }
}
```

---

#### `GET /products/favorites/me` 🔒
Get the current user's favorited products.

---

### HTTP Status Codes

| Code | Meaning                        |
|------|--------------------------------|
| 200  | OK                             |
| 201  | Created                        |
| 400  | Bad Request / Validation Error |
| 401  | Unauthorized (missing/expired) |
| 403  | Forbidden (not owner)          |
| 404  | Not Found                      |
| 409  | Conflict (e.g. duplicate email)|
| 500  | Internal Server Error          |

---


## Features

### Backend
- ✅ JWT authentication (7-day expiry)
- ✅ Password hashing with bcrypt (12 rounds)
- ✅ Full CRUD for products
- ✅ Full-text search across title, description, category
- ✅ Filtering by category and price range
- ✅ Sorting (newest, price asc/desc, top rated)
- ✅ Pagination with metadata (total, totalPages, hasNext/hasPrev)
- ✅ Add/remove favorites (toggle)
- ✅ Express-validator input validation
- ✅ Proper HTTP status codes
- ✅ Seed script with 10 products across 8 categories + 2 users

### Web App
- ✅ Login & Register with form validation
- ✅ Product grid with live search (debounced)
- ✅ Category filter chips + sort dropdown
- ✅ Pagination with page number display
- ✅ Product detail page with full info
- ✅ Favorite/unfavorite with heart animation (micro-interaction)
- ✅ Staggered fade-up card animations on load
- ✅ Responsive design (mobile → desktop)
- ✅ Dark luxury theme (Bazaar design system)
- ✅ Protected routes + token persistence

### Mobile
- ✅ Login & Register screens
- ✅ Product browse with category pills + search
- ✅ Pull-to-refresh
- ✅ Product detail with all info
- ✅ Favorite/unfavorite from card + detail view
- ✅ Favorites tab
- ✅ Profile with logout
- ✅ Token persistence via AsyncStorage
- ✅ Bottom tab navigation + stack navigation

---

## Design

The UI follows the **Bazaar** design language:
- **Background:** Near-black `#0c0c0e`
- **Accent:** Warm orange `#ff6b35`
- **Price:** Soft gold `#f0c060`
- **Typography:** Fraunces (display, italic) + DM Sans (body)
- **Creative element:** Staggered fade-up card animations on page load + springy heart bounce on favorite

---

*Built for the Micro Marketplace Internship Assignment — February 2026*
