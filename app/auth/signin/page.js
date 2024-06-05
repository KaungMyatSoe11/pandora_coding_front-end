"use client";
import SignInForm from "@/components/SignInForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const { data: session } = useSession();
  const router = useRouter();

  // If user is logged in, redirect to admin page
  if (session) {
    router.push("/admin/post");
    return null; // Return null to prevent rendering anything else in this component
  }
  return (
    <div className="h-[91vh] flex justify-center items-center">
      <SignInForm />
    </div>
  );
};

export default SignIn;
