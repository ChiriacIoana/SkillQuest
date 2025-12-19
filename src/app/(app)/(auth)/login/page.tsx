"use client";

import { Button } from "@/components/common/ui/button";
import { AuthLayout } from "@/components/auth/auth-layout";
import { useLogin } from "@/api/auth";
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
import {useState} from "react";
import {Eye, EyeOff} from "lucide-react";

const schema = z.object({
  username: z
    .string()
    .min(3, "Username is required")
    .max(40, "Username must be at most 40 characters long"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    
});

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onBlur",
  });

  const loginMutation = useLogin();

  async function onSubmit(data: z.infer<typeof schema>) {
    try {
      const res = await loginMutation.mutateAsync({
        username: data.username,
        password: data.password,
      });

      console.log("Login successful:", res);
      router.push("/welcome");
    } catch (err: any) {
      console.error("Login failed:", err.message || err);
      alert(err.message || "Login failed. Please try again.");
    }
  }

  return (
    <AuthLayout title={"Login"} form={form} onSubmit={onSubmit}>
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
              <div className="relative">
              <Input placeholder="password" 
              {...field} 
               type={showPassword ? "text" : "password"}
            className="pr-10"
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
            
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button type="submit" className="w-full"> Submit </Button>

      <div className="text-black-500 text-sm text-center mt-4">
        Don't have an account?{" "}
        <a href="/register" className="text-blue-500 underline">
          Register here
        </a>
      </div>
    </AuthLayout>
  );

}