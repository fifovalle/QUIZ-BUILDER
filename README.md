# Welcome to **"Quiz Builder"** 📚✨

Explore our latest project designed to simplify quiz management for students and teachers. With an intuitive interface and robust features, Quiz Builder ensures a seamless experience for managing and taking quizzes.

---

## 🚧 **Project Status**

- **Status:** In Development
- **Planned Release Date:** December 2024

---

## 🚀 **Key Features**

### **1. User Authentication**

- **Roles:** Supports login for both **Students** and **Teachers**.
- **Backend:** Secure authentication using Supabase.
- **API:**
  - `POST /auth/login` for user login.
  - `POST /auth/register` for user registration.
  - `GET /auth/logout` for logging out users.

### **2. Role-Based Access Control**

- **Students:**
  - View assigned quizzes.
  - Submit completed quizzes.
- **Teachers:**
  - Create, edit, and manage quizzes.
  - View student performance reports.

### **3. Quiz Management**

- **Features:**

  - Create multiple-choice quizzes.
  - Set time limits for quizzes.
  - Assign quizzes to specific students or groups.

- **API:**
  - `POST /quizzes` to create a new quiz.
  - `GET /quizzes` to fetch all quizzes.
  - `PUT /quizzes/{quizId}` to update quiz details.
  - `DELETE /quizzes/{quizId}` to delete a quiz.

### **4. Real-Time Submissions**

- Students can submit answers in real-time.
- Teachers can view and grade submissions instantly.

### **5. Performance Reports**

- Generate detailed reports for quizzes.
- Track individual and group performance.

### **6. Modern UI/UX**

- User-friendly design for both students and teachers.
- Responsive layout for mobile, tablet, and desktop devices.

---

## 🛠️ **Technologies Used**

- **Programming Language:** TypeScript
- **Frontend Framework:** Next.js
- **Styling:** Tailwind CSS
- **Backend:** Supabase (Authentication, Database)
- **State Management:** React Context API
- **APIs:** RESTful APIs for all backend operations

---

## 📷 **Preview**

Below are some snapshots of the Quiz Builder interface:

---

## 📬 **Contact**

Have questions or want to collaborate? Reach out to me:

- **Email:** [fifanaufal10@gmail.com](mailto:fifanaufal10@gmail.com)
- **GitHub Issues:** [Open an issue](https://github.com/fifovalle/Quiz-Builder/issues)

---

## 👨‍💻 **How to Run the Project**

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/quiz-builder.git
   ```

2. Install dependencies:

   ```bash
   cd quiz-builder
   npm install
   ```

3. Set up environment variables for Supabase in a `.env.local` file:

   ```plaintext
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the app in your browser:
   ```plaintext
   http://localhost:3000
   ```

---

<div align="center">  
  &copy; 2024 [Your Name]  
</div>
