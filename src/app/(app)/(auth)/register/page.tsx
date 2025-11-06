"use client";

import { useRegister } from "@/api/auth";
import { AuthLayout } from "@/components/auth/auth-layout";
import { Button } from "@/components/common/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/common/ui/form";
import { Input } from "@/components/common/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

// Backend expects username + password only
const schema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(40, "Username must be at most 40 characters long"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long"),
  repeatPassword: z
    .string()
    .min(6, "Password must be at least 6 characters long"),
}).refine((data) => data.password === data.repeatPassword, {
  message: "Passwords must match",
  path: ["repeatPassword"],
});

export default function RegisterPage() {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      password: "",
      repeatPassword: "",
    },
    mode: "onBlur",
  });

  const registerMutation = useRegister();

  async function onSubmit(data: z.infer<typeof schema>) {
    try {
      await registerMutation.mutateAsync({
        username: data.username,
        password: data.password,
      });
      alert("Registration successful! Please login.");
      router.push("/login");
    } catch (err: any) {
      console.error("Registration failed:", err.message || err);
      alert(err.message || "Registration failed. Please try again.");
    }
  }

  return (
    <AuthLayout title={"Register"} form={form} onSubmit={onSubmit}>
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input placeholder="your username" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input placeholder="password" {...field} type="password" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="repeatPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Repeat Password</FormLabel>
            <FormControl>
              <Input placeholder="repeat password" {...field} type="password" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button type="submit" className="w-full">
        Submit
      </Button>

      <div className="text-black-500 text-sm text-center mt-4">
        Already have an account?{" "}
        <a href="/login" className="text-blue-500 underline">
          Login here
        </a>
      </div>
    </AuthLayout>
  );
}