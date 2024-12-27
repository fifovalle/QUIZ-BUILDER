import i18n, { InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init<InitOptions>({
    resources: {
      en: {
        translation: {
          welcome: "Welcome to Quiz Builder",
          description:
            "Create, take, and test your knowledge with fun quizzes! Let’s make learning exciting!",
          startQuiz: "Start a New Quiz",
          viewQuizzes: "View All Quizzes",
          viewQuizzes2: "View My Quizzes",
          takeQuiz: "Take a Quiz",
          changeLanguage: "Change Language",
          logout: "Logout",
          sureLogout: "Are you sure you want to logout?",
          confirm: "Confirm",
          cancel: "Cancel",
          copyRight:
            "Quiz Builder - All rights reserved. Crafted with love and technology",
          welcomeBack: "Welcome Back",
          pleaseContinue: "Please login to continue",
          email: "Email",
          password: "Password",
          confirmPassword: "Confirm Password",
          login: "Login",
          dontHaveAccount: "Don't have an account?",
          alreadyHaveAccount: "Already have an account?",
          register: "Register",
          pleaseRegister: "Please register to continue",
          result: "Your Quiz Results",
          result2: "All Quiz Results",
          score: "Score:",
          correctAnswers: "Correct Answers:",
          wrongAnswers: "Wrong Answers:",
          answerQuiz: "You've answered the quiz!",
          takeQuiz2: "Take the Quiz and Test Your Knowledge!",
          saveAnswers: "Save Answers",
        },
      },
      ar: {
        translation: {
          welcome: "مرحبًا بك في منشئ الاختبارات",
          description:
            "قم بإنشاء الاختبارات، وأجرِها، واختبر معرفتك من خلال اختبارات ممتعة! دعونا نجعل التعلم ممتعًا!",
          startQuiz: "ابدأ اختبارًا جديدًا",
          viewQuizzes: "عرض جميع الاختبارات",
          viewQuizzes2: "عرض الاختبارات الخاصة بي",
          takeQuiz: "قم بإجراء اختبار",
          changeLanguage: "تغيير اللغة",
          logout: "تسجيل الخروج",
          sureLogout: "هل انت متاكد من تسجيل الخروج؟",
          confirm: "تأكيد",
          cancel: "الغاء",
          copyRight: "منشئ الاختبارات - جميع الحقوق محفوظة. صنع بحب وتقنية",
          welcomeBack: "مرحبًا بعودتك",
          pleaseContinue: "يرجى تسجيل الدخول للمتابعة",
          email: "البريد الالكتروني",
          password: "كلمة المرور",
          confirmPassword: "تأكيد كلمة المرور",
          login: "تسجيل الدخول",
          dontHaveAccount: "ليس لديك حساب؟",
          alreadyHaveAccount: "لديك حساب بالفعل؟",
          register: "تسجيل",
          pleaseRegister: "يرجى تسجيل حساب للمتابعة",
          result: "نتائج الاختبار الخاص بك",
          result2: "نتائج جميع الاختبارات",
          score: "النتيجة:",
          correctAnswers: "الاجابات الصحيحة:",
          wrongAnswers: "الاجابات الغير صحيحة:",
          answerQuiz: "لقد اجريت الاختبار!",
          takeQuiz2: "اختر الاختبار واختبر معرفتك!",
          saveAnswers: "حفظ الاجابات",
        },
      },
    },
    fallbackLng: "en",
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
