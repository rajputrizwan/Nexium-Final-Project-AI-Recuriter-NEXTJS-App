"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { supabase } from "@/services/supabaseClient";

function Login() {
  const handleLogin = async () => {
    // Use to Sign in with Google
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      console.error("Error logging in with Google:", error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="flex flex-col items-center border rounded-2xl p-6 space-y-4 max-w-md w-full">
        <Image
          src="/logo.png"
          alt="AiCruiter Logo"
          width={250}
          height={50}
          className="w-[250px]"
        />

        <Image
          src="/login.png"
          alt="Login Illustration"
          width={400}
          height={250}
          className="w-[400px] h-[250px] rounded-2xl"
        />

        <h2 className="text-2xl font-bold text-center">Welcome to AiCruiter</h2>
        <p className="text-gray-500 text-center">
          Sign in with Google Authentication
        </p>

        <Button className="w-full" onClick={handleLogin}>
          Login with Google
        </Button>
      </div>
    </div>
  );
}

export default Login;
