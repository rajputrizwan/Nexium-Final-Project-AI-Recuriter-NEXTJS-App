"use client";
import React from "react";
import { CheckCircle, Send } from "lucide-react";
import Image from "next/image";

const InterviewComplete = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      {/* Top Icon and Message */}
      <div className="flex flex-col items-center mb-6">
        <CheckCircle className="text-green-600 w-14 h-14 mb-2" />
        <h1 className="text-3xl font-bold text-gray-800">
          Interview Complete!
        </h1>
        <p className="text-gray-600 mt-2 text-center">
          Thank you for participating in the AI-driven interview with Alcruiter
        </p>
      </div>

      {/* Illustration */}
      <div className="rounded-xl overflow-hidden shadow-md bg-white/80 backdrop-blur p-4 border border-gray-200 mb-6">
        <Image
          src="/interview-completed.png"
          alt="Interview Illustration"
          width={600}
          height={300}
          className="rounded-lg"
        />
      </div>

      {/* What's Next Section */}
      <div className="bg-white w-full max-w-xl p-6 rounded-xl shadow-md text-center border border-gray-200">
        <Send className="text-blue-600 w-10 h-10 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-800">What's Next?</h2>
        <p className="text-gray-600 mt-2">
          The recruiter will review your interview responses and will contact
          you soon regarding the next steps.
        </p>
        <p className="text-sm text-gray-500 mt-1">
          ⏱️ Response within 2–3 business days
        </p>
      </div>
    </div>
  );
};

export default InterviewComplete;
