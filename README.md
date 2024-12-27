---

# Welcome to **"Quiz Builder"** 🎓✨

**Empowering Learning with Seamless Quiz Management**  
**Quiz Builder** is the ultimate solution for simplifying quiz management for **students** and **teachers**. With an intuitive interface and powerful features, the platform combines ease of use and functionality for creating, managing, and analyzing quizzes.

---

## 🚧 **Project Status**

- **Status:** Completed
- **Planned Release Date:** December 2024

---

## 🚀 **Key Features**

### **1. User Authentication**

- **User Roles:**
  - **Students:** Access assigned quizzes, submit answers, and view their own results.
  - **Teachers:** Create and manage quizzes, view student submissions, and track individual or class performance.
- **Backend:** Secure authentication powered by Supabase.
- **API Endpoints:**
  - `POST /auth/login` for user login.
  - `POST /auth/register` for user registration.
  - `GET /auth/logout` to log users out.

---

### **2. Role-Based Access Control (RBAC)**

- **Students:**
  - View a list of assigned quizzes.
  - Submit quiz answers for evaluation.
  - Access their own results and feedback.
- **Teachers:**
  - Create, update, and delete quizzes.
  - Review quiz submissions with detailed student performance metrics.
  - Access performance reports for quizzes and classes.

---

### **3. Quiz Management**

- **Teacher Features:**
  - Design quizzes with multiple-choice and open-ended questions.
  - Set quiz duration and deadlines.
  - Enable **automatic grading** for multiple-choice questions.
  - Review open-ended answers manually.
  - Export quiz results in CSV format.
- **API Endpoints:**
  - `POST /quizzes` to create new quizzes.
  - `GET /quizzes` to retrieve a list of all quizzes.
  - `PUT /quizzes/{quizId}` to edit quiz details.

---

### **4. Student Quiz Portal**

- **Features for Students:**
  - Attempt quizzes assigned by teachers within the deadline.
  - Save progress and resume incomplete quizzes.
  - Receive instant feedback on multiple-choice questions.
  - View detailed results, including correct answers and explanations.

---

### **5. Grading and Analytics**

- **For Teachers:**
  - Automatic grading for objective questions.
  - Option for manual grading for subjective questions.
  - Provide comments on student submissions.
  - View analytics such as:
    - Average class scores.
    - Top performers.
    - Frequently missed questions.

---

### **6. Performance Reports**

- **Students:**
  - View individual results and track personal progress.
- **Teachers:**
  - Access detailed performance analytics, including:
    - Average scores.
    - Insights into challenging questions.
    - Progress tracking for individual students and the whole class.

---

### **7. Modern UI/UX**

- Fully responsive design optimized for **desktop** and **mobile** devices.
- User-friendly quiz builder interface for teachers.
- Engaging and intuitive quiz-taking experience for students.

---

## 🛠️ **Technologies Used**

- **Programming Language:** TypeScript
- **Frontend Framework:** Next.js
- **Styling:** Tailwind CSS
- **Backend:** Supabase (Authentication, Database)
- **State Management:** React Context API
- **API:** RESTful API

---

## 📷 **Application Preview**

🚧 **Coming Soon!** Screenshots showcasing the platform's UI/UX will be added soon.

---

## 📬 **Contact Me**

Have questions or want to collaborate? Reach out at:

- **Email:** [fifanaufal10@gmail.com](mailto:fifanaufal10@gmail.com)
- **GitHub Issues:** [Report an Issue](https://github.com/fifovalle/Quiz-Builder/issues)

---

## 👨‍💻 **How to Run the Project**

1. Clone the repository:

   ```bash
   git clone https://github.com/fifovalle/Quiz-Builder.git
   ```

2. Install dependencies:

   ```bash
   cd quiz-builder
   npm install
   ```

3. Configure Supabase environment variables in the `.env.local` file:

   ```plaintext
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the application in your browser:
   ```plaintext
   http://localhost:3000
   ```

---

<div align="center">  
  &copy; 2024 **Naufal FIFA**  
</div>
