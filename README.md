# 🔗 Tiny URL - Full Stack Application

## 🚀 Project Overview

This project is a **Full Stack Tiny URL Web Application** that allows users to shorten long URLs, manage them, and track usage.

Users can generate short links, mark them as private/public, view click counts, and delete or update URLs.

---

## 🧰 Tech Stack

### 🔹 Frontend

* Angular (Standalone Components)

### 🔹 Backend

* ASP.NET Core 8 (Web API - Controller Based)
* Entity Framework Core

### 🔹 Database

* Microsoft SQL Server / Azure SQL

### 🔹 Cloud

* Azure App Service
* Azure SQL Database
* Azure Functions (Cron Job)
* Azure Blob Storage (Logging)

---

## ✨ Features

### 🌐 Frontend

* Generate short URL
* List public URLs
* Mark URL as private
* View click count
* Delete URL
* Update URL
* Redirect to original URL

### ⚙️ Backend API

| Method | Endpoint             | Description              |
| ------ | -------------------- | ------------------------ |
| POST   | `/api/add`           | Create short URL         |
| GET    | `/api/public`        | Get all public URLs      |
| GET    | `/r/{code}`          | Redirect to original URL |
| PUT    | `/api/update/{code}` | Update URL               |
| DELETE | `/api/delete/{code}` | Delete URL               |
| DELETE | `/api/delete-all`    | Delete all URLs          |

---

## 🗄️ Database Schema

Table: `ShortUrls`

| Column      | Type          | Description         |
| ----------- | ------------- | ------------------- |
| Id          | int           | Primary key         |
| OriginalUrl | nvarchar(max) | Full URL            |
| Code        | nvarchar(10)  | Short code          |
| IsPrivate   | bit           | Private/Public flag |
| ClickCount  | int           | Number of clicks    |
| CreatedAt   | datetime2     | Created date        |

---

## ⚙️ Setup Instructions

### 🔹 Backend Setup

```bash
cd backend/TinyUrl.Api
dotnet restore
dotnet ef database update
dotnet run
```

API will run on:

```
https://localhost:7153
```

---

### 🔹 Frontend Setup

```bash
cd frontend/tiny-url-ui
npm install
ng serve
```

Frontend runs on:

```
http://localhost:4200
```

---

## 🔗 API Testing

Swagger UI:

```
https://localhost:7153/swagger
```

---

## ☁️ Azure Deployment

* Backend deployed using Azure App Service
* Database hosted in Azure SQL
* Azure Function used for scheduled cleanup (every 1 hour)
* CI/CD configured using GitHub Actions

---

## 📂 Project Structure

```
tiny-url/
 ├── backend/
 ├── frontend/
 ├── README.md
```

---

## 📸 Screenshots (Optional)

* Swagger API
* Angular UI
* Redirect working

---

## 👨‍💻 Author

Muthukumar

---

## 📧 Submission

Subject: Tiny URL - <your-email>

---
