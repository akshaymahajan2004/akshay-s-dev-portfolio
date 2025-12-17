# 🚀 Dynamic Developer Portfolio

A modern, high-performance portfolio website built with **React**, **TypeScript**, and **Tailwind CSS**. 

Unlike traditional static portfolios, this project is **fully dynamic**. It features a secure **Admin Dashboard** powered by **Firebase**, allowing me to manage projects, skills, and content in real-time without modifying the codebase.

🔗 **Live Demo:** (https://akshay-s-dev-portfolio.vercel.app)

---

## ✨ Key Features

### 🎨 User Interface (Frontend)
* **Modern Design:** Glassmorphism effects, smooth animations, and a responsive layout.
* **Dynamic Content:** Projects and Skills are fetched dynamically from Firestore.
* **Interactive UI:** Custom navigation with scroll tracking and animated project cards.
* **Performance:** Optimized with Vite for lightning-fast load times.

### ⚙️ Admin Dashboard (Backend)
* **Secure Authentication:** Firebase Auth protects the admin route.
* **CRUD Operations:** Add, Edit, and Delete projects and skills via a GUI.
* **Media Handling:** Supports both direct image URLs and file uploads via Firebase Storage.
* **Real-time Updates:** Changes in the dashboard reflect immediately on the live site.

---

## 🛠️ Tech Stack

* **Frontend:** React, TypeScript, Vite, Tailwind CSS
* **Backend / BaaS:** Firebase (Firestore, Auth, Storage)
* **Icons:** Lucide React
* **Deployment:** Vercel

---

## 🚀 Getting Started Locally

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/akshaymahajan2004/akshay-s-dev-portfolio.git](https://github.com/akshaymahajan2004/akshay-s-dev-portfolio.git)
    cd akshay-s-dev-portfolio
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the root directory and add your Firebase credentials:
    ```env
    VITE_API_KEY=your_firebase_api_key
    VITE_AUTH_DOMAIN=your_project_id.firebaseapp.com
    VITE_PROJECT_ID=your_project_id
    VITE_STORAGE_BUCKET=your_project_id.appspot.com
    VITE_MESSAGING_SENDER_ID=your_sender_id
    VITE_APP_ID=your_app_id
    ```

4.  **Run the development server**
    ```bash
    npm run dev
    ```

---

## 🔒 Security Note
The `/admin` route is protected. Only authenticated users (configured in Firebase Authentication) can access the dashboard to modify data.

---

## 📬 Contact
**Akshay Mahajan** Full-stack Developer  
[LinkedIn] (https://linkedin.com/in/akshaymahajan1274) | [Email] (mailto:akshaymahajan730@example.com)
