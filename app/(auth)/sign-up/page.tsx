"use client";

import AuthForm from "@/components/auth-form";
import { signUp } from "@/lib/actions/auth.action";
import { signUpSchema } from "@/lib/validation";
import React from "react";

const SignUp = () => {
  return (
    <>
      <AuthForm
        type="sign-up"
        schema={signUpSchema}
        defaultValues={{
          email: "",
          password: "",
          fullName: "",
          universityId: 0,
          universityCard: "",
        }}
        onSubmit={signUp}
      />
    </>
  );
};

export default SignUp;
