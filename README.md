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
