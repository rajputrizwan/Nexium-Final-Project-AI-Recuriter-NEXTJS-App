"use client";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import FormContainer from "./_components/FormContainer";
import QuestionList from "./_components/QuestionList";
import { toast } from "sonner";

function CreateInterview() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const [formData, setFromData] = useState();
  const onHandleInputChnage = (field, value) => {
    setFromData((prev) => ({ ...prev, [field]: value }));

    console.log("FormData", formData);
  };

  const onGoToNext = () => {
    if (
      !formData.jobPosition ||
      !formData.jobDescription ||
      !formData.Duration ||
      !formData.type
    ) {
      toast("Please enter all details!");
      return;
    }
    setStep(step + 1);
  };

  return (
    <div className="mt-10 px-4 mb-4 sm:px-12 md:px-20 lg:px-32 xl:px-48 2xl:px-64">
      <div className="flex gap-5 items-center">
        <ArrowLeft onClick={() => router.back()} className="cursor-pointer" />
        <h2 className="font-bold text-2xl">Create New Interview</h2>
      </div>
      <Progress value={step * 33.33} className="my-5" />
      {step == 1 ? (
        <FormContainer
          onHandleInputChange={onHandleInputChnage}
          GoToNext={() => onGoToNext()}
        />
      ) : step == 2 ? (
        <QuestionList formData={formData} />
      ) : null}
    </div>
  );
}

export default CreateInterview;
