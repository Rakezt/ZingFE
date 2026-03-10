# ZingFE – Frontend Application

ZingFE is the **frontend client for the Zing social networking platform**, built using **React, TypeScript, Redux Toolkit, and TailwindCSS**.
It provides a responsive user interface for authentication, profile management, social connections, real-time chat, and premium features.

The application communicates with the **ZingBE backend API** and supports **real-time messaging using Socket.IO**.

---

# 🚀 Features

* User Authentication (Login / Logout)
* Profile Management
* Social Feed
* Friend Connections
* Connection Requests
* Real-time Chat
* Premium Membership
* Responsive UI with TailwindCSS + DaisyUI
* Global State Management with Redux Toolkit
* API Communication using Axios
* Client-side Routing with React Router

---

# 🛠 Tech Stack

### Core

* **React 19**
* **TypeScript**
* **Vite**

### State Management

* **Redux Toolkit**
* **React Redux**

### Styling

* **TailwindCSS**
* **DaisyUI**

### Networking

* **Axios**
* **Socket.IO Client**

### Routing

* **React Router DOM**

### Code Quality

* **ESLint**

---

# 📁 Project Structure

```
ZingFE
│
├── public
│
├── src
│   ├── components
│   │   ├── Body.tsx
│   │   ├── Chat.tsx
│   │   ├── EditProfile.tsx
│   │   ├── Feed.tsx
│   │   ├── FeedCard.tsx
│   │   ├── Friends.tsx
│   │   ├── FriendsCard.tsx
│   │   ├── Login.tsx
│   │   ├── NavBar.tsx
│   │   ├── Premium.tsx
│   │   ├── Profile.tsx
│   │   └── Requests.tsx
│   │
│   ├── utils
│   │   └── constant.tsx
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---


# 📦 Installation

Clone the repository:

```
git clone https://github.com/your-username/ZingFE.git
cd ZingFE
```

Install dependencies:

```
npm install
```

---

# ▶️ Running the Application

Start development server:

```
npm run dev
```

The app will run on:

```
http://localhost:5173
```

---

# 🏗 Build for Production

```
npm run build
```

Preview the production build:

```
npm run preview
```

---

# 🌐 Backend API

This frontend communicates with the **ZingBE backend**.

Production API:

```
https://zingbe.onrender.com
```

Example API call:

```
POST /signup
POST /login
GET /profile/view
GET /user/connections
```

---

# 💬 Real-Time Chat

Real-time messaging is powered by **Socket.IO Client**.

Chat component connects to the backend socket server for:

* message delivery
* user presence
* real-time updates

---

# 🎨 UI & Styling

The UI is built using:

* **TailwindCSS**
* **DaisyUI components**

Benefits:

* fast styling
* responsive design
* customizable themes

---

# 🧠 State Management

Global application state is managed using **Redux Toolkit**.

Used for:

* authentication state
* user data
* connections
* feed data

---

# 🚀 Deployment

The frontend can be deployed on:

* **Vercel**
* **Netlify**
* **AWS S3 + CloudFront**
* **Render Static Site**

Recommended production hosting:

**Vercel**

---

# 🔐 Security Practices

* Secure cookie-based authentication
* API calls handled through Axios
* Environment-based configuration

---

# 📄 License

This project is licensed under the **MIT License**.

---

# 👨‍💻 Author

Developed by **Rakesh Singh**

If you like this project, feel free to ⭐ the repository.
