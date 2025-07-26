"use client";

import { InterviewDataContext } from "@/app/Context/interviewDataContext";
import React, { useContext, useEffect, useState } from "react";
import { Timer, Mic, Video, PhoneOff } from "lucide-react";
import Image from "next/image";
import Vapi from "@vapi-ai/web";
import AlertConfirmation from "./_components/AlertConfirmation";
import { toast } from "sonner";

function StartInterview() {
  const { interviewInfo } = useContext(InterviewDataContext);
  const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY);
  const [activeUser, setActiveUser] = useState(false);

  useEffect(() => {
    interviewInfo && startCall();
  }, [interviewInfo]);

  const startCall = () => {
    const questionList = interviewInfo?.interviewData?.questionList
      .map((item) => item?.question)
      .join(", ");
    console.log(questionList);

    const assistantOptions = {
      name: "AI Recruiter",
      firstMessage:
        "Hi " +
        interviewInfo?.userName +
        ", how are you? Ready for your interview on " +
        interviewInfo?.interviewData?.jobPosition,
      transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en-US",
      },
      voice: {
        provider: "playht",
        voiceId: "jennifer",
      },
      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              `You are an AI voice assistant conducting interviews.
Your job is to ask candidates provided interview questions, assess their responses.
Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
"Hey there! Welcome to your ` +
              interviewInfo?.interviewData?.jobPosition +
              ` interview. Let's get started with a few questions!"
Ask one question at a time and wait for the candidate's response before proceeding. Keep the questions clear and concise. Below Are the questions ask one by one:
Questions: ` +
              questionList +
              `If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example:
"Need a hint? Think about how React tracks component updates!"
Provide brief, encouraging feedback after each answer. Example:
"Nice! That's a solid answer."
"Hmm, not quite! Want to try again?"
Keep the conversation natural and engaging-use casual phrases like "Alright, next up..." or "Let's tackle a tricky one!"
After 5-7 questions, wrap up the interview smoothly by summarizing their performance. Example:
"That was great! You handled some tough questions well. Keep sharpening your skills!"
End on a positive note:
"Thanks for chatting! Hope to see you crushing projects soon!"
Key Guidelines:
✅ Be friendly, engaging, and witty 🎤
✅ Keep responses short and natural, like a real conversation
✅ Adapt based on the candidate's confidence level
✅ Ensure the interview remains focused on React
.trim(),`,
          },
        ],
      },
    };

    vapi.start(assistantOptions);
  };

  const stopInterview = () => vapi.stop();

  vapi.on("call-start", () => {
    toast("Call Connected...");
    console.log("Call started");
    setActiveUser(false);
  });

  vapi.on("call-end", () => {
    toast("Interview Ended...");
    console.log("Call ended");
    setActiveUser(true);
  });

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col justify-between">
      {/* Top Header */}
      <div className="w-full py-4 px-4 md:px-10 flex items-center justify-between backdrop-blur bg-white/80 shadow-sm border-b border-blue-100">
        <h2 className="text-lg md:text-xl font-bold text-blue-700">
          Live Interview
        </h2>
        <div className="flex items-center gap-2 text-blue-600 font-medium text-sm md:text-base">
          <Timer className="w-5 h-5" />
          <span>00:00:00</span>
        </div>
      </div>

      {/* Main Video Section */}
      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6 px-4 py-6 md:px-10 lg:px-32 xl:px-40">
        {/* AI Interviewer */}
        <div className="rounded-xl shadow-md bg-white/80 backdrop-blur p-6 flex flex-col items-center justify-center border border-blue-100">
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-blue-300">
            {!activeUser && (
              <>
                <span className="absolute top-[44%] left-[50%] w-28 h-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500 opacity-20 animate-ping z-0" />
              </>
            )}

            <Image
              src="/ai-girl.jpg"
              alt="AI Interviewer"
              width={160}
              height={160}
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="mt-4 text-base md:text-lg font-semibold text-blue-800">
            AI Interviewer
          </h3>
        </div>

        {/* User */}
        <div className="rounded-xl shadow-md bg-white/80 backdrop-blur p-6 flex flex-col items-center justify-center border border-blue-100">
          <div className="w-40 h-40 rounded-full bg-gray-300 flex items-center justify-center text-blue-600 text-4xl font-bold border-4 border-blue-300">
            {/* Render user's initial if available */}
            <div className="relative">
              {!activeUser && (
                <>
                  <span className="absolute top-[44%] left-[50%] w-28 h-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500 opacity-20 animate-ping z-0" />
                </>
              )}
              {interviewInfo?.userName
                ? interviewInfo.userName.charAt(0).toUpperCase()
                : "U"}
            </div>
          </div>
          <h3 className="mt-4 text-base md:text-lg font-semibold text-blue-800">
            {interviewInfo?.userName ? interviewInfo?.userName : "You"}
          </h3>
        </div>
      </div>

      <div className="flex items-center justify-center py-5">
        <h2 className="text-gray-400 ">Interview in Progress ...</h2>
      </div>

      {/* Bottom Controls */}
      <div className="w-full bg-white/80 backdrop-blur px-4 md:px-10 py-4 flex flex-wrap justify-center gap-4 border-t border-blue-100 shadow-sm">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full flex items-center gap-2 text-sm shadow">
          <Mic className="w-5 h-5" /> Mute
        </button>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full flex items-center gap-2 text-sm shadow">
          <Video className="w-5 h-5" /> Camera
        </button>
        <AlertConfirmation stopInterview={() => stopInterview}>
          <button className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full flex items-center gap-2 text-sm shadow">
            <PhoneOff className="w-5 h-5" /> Leave
          </button>
        </AlertConfirmation>
      </div>
    </div>
  );
}

export default StartInterview;
