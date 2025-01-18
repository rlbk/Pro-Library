"use server";

import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { hash } from "bcryptjs";
import { signIn } from "@/auth";
import { headers } from "next/headers";
import ratelimit from "../rate-limit";
import { redirect } from "next/navigation";
import config from "../config";
import { workflowClient } from "../workflow";

export const signInWithCredentials = async (
  params: Pick<IAuthCredentials, "email" | "password">
) => {
  const { email, password } = params;
  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);

  if (!success) return redirect("/too-fast");
  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (result?.error) return { success: false, error: result.error };
    return { success: true };
  } catch (error) {
    console.log(error, "@Signin error");
    return {
      success: false,
      error: "Signin failed",
    };
  }
};

export const signUp = async (params: IAuthCredentials) => {
  const { email, password, fullName, universityId, universityCard } = params;

  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);

  if (!success) return redirect("/too-fast");

  // Check if the user already exists
  const existUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existUser.length > 0)
    return { success: false, error: "User already exists" };
  const hashedPassword = await hash(password, 10);

  try {
    await db.insert(users).values({
      email,
      password: hashedPassword,
      fullName,
      universityId,
      universityCard,
    });

    await workflowClient.trigger({
      url: `${config.env.apiEndpoint}/api/workflows/onboarding`,
      body: { email, fullName },
    });

    return await signInWithCredentials({ email, password });
  } catch (error) {
    console.log(error, "@Signup error");
    return {
      success: false,
      error: "Signup failed",
    };
  }
};
