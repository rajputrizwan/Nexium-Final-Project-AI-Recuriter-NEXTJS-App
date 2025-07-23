"use client";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import FormContainer from "./_components/FormContainer";

function CreateInterview() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const [formData, setFromData] = useState();
  const onHandleInputChnage = (field, value) => {
    setFromData((prev) => ({ ...prev, [field]: value }));

    console.log("FormData", formData);
  };

  return (
    <div className="mt-10 px-4 mb-4 sm:px-12 md:px-20 lg:px-32 xl:px-48 2xl:px-64">
      <div className="flex gap-5 items-center">
        <ArrowLeft onClick={() => router.back()} className="cursor-pointer" />
        <h2 className="font-bold text-2xl">Create New Interview</h2>
      </div>
      <Progress value={step * 33.33} className="my-5" />
      <FormContainer onHandleInputChange={onHandleInputChnage} />
    </div>
  );
}

export default CreateInterview;
