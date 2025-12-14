# ContestHub - Ultimate Contest Platform

ContestHub is a modern, full-stack contest management platform designed to connect creative minds with opportunities. Whether you're a designer, writer, or innovator, ContestHub allows you to participate in global contests or host your own to find the best talent.

**Live Site URL**: [https://contest-haven.web.app](https://contest-haven.web.app) (Example URL)

## 🚀 Key Features

*   **Role-Based Access Control**: Secure separate dashboards for Admins, Contest Creators, and Users with JWT authentication.
*   **Dynamic Contest Creation**: Creators can launch contests with rich details, images, prices, and deadlines using a user-friendly interface.
*   **Secure Payment Integration**: Seamless entry fee payments powered by Stripe, ensuring safe transactions.
*   **Live Leaderboard**: Real-time ranking of top winners based on their contest achievements.
*   **Interactive Dashboard**:
    *   **Users**: Track participated and winning contests, view win rates via charts.
    *   **Creators**: Manage contests, view submissions, and declare winners.
    *   **Admins**: Manage users, approve/reject contests, and oversee platform activity.
*   **Responsive Modern Design**: Built with React and TailwindCSS/DaisyUI for a stunning experience on Mobile, Tablet, and Desktop.
*   **Smart Search & Filters**: Easily find contests by category or search term with optimized backend queries.
*   **Submission System**: Specialized modal interfaces for submitting tasks (e.g., Google Drive links) securely.
*   **Winner Celebration**: Dedicated sections and profile highlights to showcase and celebrate contest winners.
*   **Theme Customization**: Persistent Dark/Light mode toggle for a personalized viewing experience.

## 🛠️ Technology Stack

*   **Frontend**: React, TailwindCSS, DaisyUI, Framer Motion, Recharts, React Router DOM.
*   **Backend**: Node.js, Express.js, MongoDB (Native Driver), JWT.
*   **Tools**: Vite, Axios, TanStack Query, React Hook Form, SweetAlert2.
*   **Payment**: Stripe.
*   **Auth**: Firebase & JWT.

## 📦 Installation

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    cd server
    npm install
    ```
3.  Setup `.env` files for Client (Firebase/Stripe keys) and Server (MongoDB/Stripe Secrets).
4.  Run the server: `node index.js`
5.  Run the client: `npm run dev`

## 📄 License

This project is licensed under the MIT License.
