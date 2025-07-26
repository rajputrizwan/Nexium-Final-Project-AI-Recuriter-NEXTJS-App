"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Clock, Info, LoaderIcon, VideoIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { supabase } from "@/services/supabaseClient";
import { toast } from "sonner";
import { InterviewDataContext } from "@/app/Context/interviewDataContext";
import { useRouter } from "next/navigation";

function Interview() {
  const { interview_id } = useParams();
  const [userName, setUserName] = useState();
  const [fetchingInterview, setFetchingInterview] = useState(true);
  const [joining, setJoining] = useState(false);
  const [interviewData, setInterviewData] = useState();
  const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext);
  const router = useRouter();

  useEffect(() => {
    interview_id && GetInterviewDetails();
  }, [interview_id]);

  const GetInterviewDetails = async () => {
    setFetchingInterview(true);
    try {
      let { data: Interviews, error } = await supabase
        .from("Interviews")
        .select("jobPosition , jobDescription, Duration, type")
        .eq("interview_id", interview_id);

      if (Interviews?.length === 0) {
        toast("Incorrect Interview Link");
        return;
      }

      setInterviewData(Interviews[0]);
    } catch (e) {
      toast("Incorrect Interview Link");
    } finally {
      setFetchingInterview(false);
    }
  };

  const onJoinInterview = async () => {
    setJoining(true);
    let { data: Interviews, error } = await supabase
      .from("Interviews")
      .select("*")
      .eq("interview_id", interview_id);

    setInterviewInfo({ userName: userName, interviewData: Interviews });
    router.push("/interview/" + interview_id + "/start");
    setJoining(false);
  };

  if (fetchingInterview) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <LoaderIcon className="animate-spin w-6 h-6 mx-auto mb-2" />
          <p className="text-sm text-gray-600">Loading interview details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 my-10">
      <div className="flex flex-col items-center justify-center border rounded-lg bg-white p-5 sm:p-8 md:p-10 max-w-3xl mx-auto w-full shadow-sm">
        {/* Logo */}
        <Image src="/sidebarLogo.png" alt="logo" width={100} height={100} />

        {/* Title */}
        <h2 className="mt-3 text-center text-lg sm:text-xl font-semibold">
          AI-Powered Interview Platform
        </h2>

        {/* Image */}
        <Image
          className="border rounded-2xl mt-4"
          src="/video-conference.png"
          alt="video-conference-logo"
          width={280}
          height={160}
        />

        {/* Position Title */}
        <h2 className="font-bold text-lg sm:text-xl mt-4 text-center">
          {interviewData?.jobPosition}
        </h2>

        {/* Duration */}
        <div className="flex gap-2 items-center text-gray-500 mt-2 text-sm">
          <Clock className="h-4 w-4" />
          <span>{interviewData?.Duration}</span>
        </div>

        {/* Form & Info */}
        <div className="w-full mt-6 space-y-6 max-w-lg mx-auto">
          {/* Input field */}
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="fullName" className="text-sm font-medium">
              Enter your full name
            </label>
            <Input
              id="fullName"
              placeholder="e.g. John Smith"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          {/* Info box */}
          <div className="p-4 bg-blue-100 flex gap-4 rounded-lg w-full">
            <Info className="text-primary mt-1" />
            <div>
              <h2 className="font-semibold text-sm sm:text-base mb-1">
                Before you begin
              </h2>
              <ul className="list-disc pl-5 space-y-1 text-sm text-primary">
                <li>Ensure you have a stable internet connection</li>
                <li>Test your camera and microphone</li>
                <li>Find a quiet place for the interview</li>
              </ul>
            </div>
          </div>

          {/* Join Button */}
          <Button
            className="w-full font-bold flex items-center justify-center gap-2"
            disabled={joining || !userName}
            onClick={onJoinInterview}
          >
            {joining ? (
              <>
                <LoaderIcon className="w-5 h-5 animate-spin" />
                <span>Joining...</span>
              </>
            ) : (
              <>
                <VideoIcon className="w-5 h-5" />
                <span>Join Interview</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Interview;
