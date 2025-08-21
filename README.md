# Parcel Delivery API

A robust, modular, scalable **RESTful API** for managing parcels with role-based access control built using **Express.js**, **TypeScript**, and **Mongoose**.

---

## Project Overview

A fully-featured API system for managing parcel deliveries with features like parcel creation, status tracking, cancellation, and user role-based access control built with **modular** architecture.

**Live Link**: [Parcel Delivery API](https://0284-assignment-05-l2-m05-m-034-a-0.vercel.app/)  
**Repository**: [GitHub](https://github.com/Md-Firoz-Mahmud-Nur/0284-Assignment_05-L2_M05_m_034-A_05-D_28_07_2025)

---

## Tech Stack

- Node.js with Express.js  
- MongoDB with Mongoose  
- TypeScript  
- JWT for Authentication  
- Zod for Validation
- Bcrypt for password security

---

## Features

- **User Roles:** Admin, Sender, Receiver  
- **Parcel Tracking:** Unique tracking IDs
- **Parcel Lifecycle:** Requested → Approved → Dispatched → In Transit → Delivered  
- **Parcel Cancellation:** Only senders can cancel parcels before approved  
- **Validation:** Input validated with Zod schemas  
- **Error Handling:** Centralized error handling with clear messages  
- **API Response:** Consistent response structure for all endpoints  
- **Authentication:** Secure JWT tokens with role validation  

---

## Folder Structure

```
src/
├── app/
|  ├── modules/
|  |  ├── auth/
│  |  ├── parcel/
│  |  ├── user/
|  ├── middlewares/
|  ├── config/
|  ├── utils/
|  ├── helpers/
├── app.ts
├── server.ts
```

---

## Role-Based Access

- **Admin**: Full access – view, block, update users and parcels
- **Sender**: Create, cancel, and track parcels they created
- **Receiver**: View assigned parcels and mark as delivered

---

## API Endpoints

### Auth Routes

| Method | Endpoint                       | Description                   | Access        | 
|--------|--------------------------------|-------------------------------|---------------|
| POST   | `/api/v1/auth/login`           | login                         | Public        |
| POST   | `/api/v1/auth/refresh-token`   | Get new access token          | Public        |
| POST   | `/api/v1/auth/logout`          | logout                        | Authenticated |
| POST   | `/api/v1/auth/reset-password`  | Change user password          | Authenticated |

### User Routes

| Method | Endpoint                       | Description                   | Access        |
|--------|--------------------------------|-------------------------------|---------------|
| POST   | `/api/v1/user/register`        | Register a new user           | Public        |
| GET    | `/api/v1/user/all-users`       | Get all users                 | Admin         |
| GET    | `/api/v1/user/all-sender`      | Get all sender                | Admin         |
| GET    | `/api/v1/user/all-receiver`    | Get all receiver              | Admin         |
| GET    | `/api/v1/user/:id`             | Get a single user by ID       | Admin         |
| GET    | `/api/v1/user/me`              | Get current logged-in user    | Authenticated |
| PATCH  | `/api/v1/user/:id`             | Update user by ID             | Authenticated |

### Parcel Routes

| Method | Endpoint                       | Description                       | Access                  |
|--------|--------------------------------|-----------------------------------|-------------------------|
| POST   | `/api/v1/parcel/create-parcel` | Create a new parcel               | Sender                  |
| GET    | `/api/v1/parcel/all-parcel`    | Get all parcels                   | Admin                   |
| GET    | `/api/v1/parcel/mine`          | Get parcels created by sender     | Sender                  |
| GET    | `/api/v1/parcel/incoming`      | Get parcels destined for receiver | Receiver                |
| GET    | `/api/v1/parcel/:trackingId`   | Get parcel by trackingId          | Admin & Authenticated   |
| PATCH  | `/api/v1/parcel/:trackingId`   | Update parcel status              | Admin & Sender          |

--- 
