import LoginForm from "@/components/Auth/LoginForm";
import { Suspense } from "react";

const LoginPage = () => {
  return (
    <section className="max-w-md w-full bg-white drop-shadow-2xl p-10 rounded-2xl">
      <Suspense>
        <LoginForm />
      </Suspense>
    </section>
  );
};

export default LoginPage;
