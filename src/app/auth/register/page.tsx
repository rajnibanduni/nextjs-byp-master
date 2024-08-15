import RegisterForm from "@/components/Auth/RegisterForm";
import { Suspense } from "react";

const RegisterPage = () => {
  return (
    <section className="max-w-md w-full xl:bg-white lg:bg-white md:bg-white drop-shadow-2xl rounded-2xl">{/* Changes done*/}
      <Suspense>
        <RegisterForm />
      </Suspense>
    </section>
  );
};

export default RegisterPage;
