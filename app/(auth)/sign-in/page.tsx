"use client";

import AuthForm from "@/components/auth-form";
import { signInSchema } from "@/lib/validation";
import React from "react";

const SignIn = () => {
  return (
    <>
      <AuthForm
        type="sign-in"
        schema={signInSchema}
        defaultValues={{
          email: "",
          password: "",
        }}
        onSubmit={() => {}}
      />
    </>
  );
};

export default SignIn;
