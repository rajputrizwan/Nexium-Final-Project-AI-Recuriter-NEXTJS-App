"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient"; // update this path if needed

export default function Hero() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleStartInterview = async () => {
    setLoading(true);
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session?.user) {
      router.push("/interview");
    } else {
      router.push("/auth");
    }

    setLoading(false);
  };

  return (
    <div className="relative overflow-hidden bg-white pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-20 pb-24 md:pt-32 md:pb-32 flex flex-col-reverse md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2 mt-10 md:mt-0 text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Ace Your Next Interview with{" "}
              <span className="text-blue-600">AI</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-2xl">
              Practice makes perfect. AICruiter uses advanced AI to simulate
              real interview scenarios, providing personalized feedback to help
              you land your dream job.
            </p>
            <div className="mt-10">
              <button
                onClick={handleStartInterview}
                disabled={loading}
                className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
              >
                {loading ? "Checking..." : "Start an Interview"}
              </button>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px]">
              <Image
                src="/robot2.png"
                alt="AI Interview Robot"
                width={500}
                height={500}
                className="object-contain"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl -z-10" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-blue-100/30 to-transparent -z-10" />
      <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-blue-100/20 to-transparent -z-10" />
    </div>
  );
}
