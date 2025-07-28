import moment from "moment";
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Copy, Send } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

function InterviewCard({ interview, viewDetail = false }) {
  const url =
    process.env.NEXT_PUBLIC_HOST_URL + "/interview/" + interview?.interview_id;

  const copyLink = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => toast.success("Link copied to clipboard!"))
      .catch(() => toast.error("Failed to copy link"));
  };

  const onSend = () => {
    const interviewUrl = `${process.env.NEXT_PUBLIC_HOST_URL}/interview/${interview?.interview_id}`;
    const recipient = "mrizwan2702@gmail.com";
    const subject = encodeURIComponent("AICruiter Interview Link");
    const body = encodeURIComponent(
      `Hi,\n\nHere's the interview link:\n${interviewUrl}`
    );

    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="p-4 md:p-5 bg-white border rounded-xl shadow-sm flex flex-col justify-between h-full">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-3">
        <div className="h-10 w-10 bg-primary rounded-full" />
        <h2 className="text-xs md:text-sm text-gray-600">
          {moment(interview?.created_at).format("Do MMM YY")}
        </h2>
      </div>

      {/* Position */}
      <h2 className="text-base md:text-lg font-semibold text-gray-800 mb-1">
        {interview?.jobPosition}
      </h2>

      {/* Duration and candidate count */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>{interview?.Duration}</span>
        <span className="text-green-700">
          {interview["interview-feedback"]?.length} Candidates
        </span>
      </div>

      {/* Buttons */}
      {!viewDetail ? (
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <Button
            variant="outline"
            onClick={copyLink}
            className="flex-1 flex items-center justify-center gap-2"
          >
            <Copy className="h-4 w-4" />
            Copy
          </Button>
          <Button
            onClick={onSend}
            className="flex-1 flex items-center justify-center gap-2"
          >
            <Send className="h-4 w-4" />
            Send
          </Button>
        </div>
      ) : (
        <Link
          href={"/scheduled-interviews/" + interview?.interview_id + "/details"}
        >
          <Button
            className="mt-5 w-full flex justify-between items-center"
            variant="outline"
          >
            <span>View Detail</span>
            <ArrowRight className="ml-2" />
          </Button>
        </Link>
      )}
    </div>
  );
}

export default InterviewCard;
