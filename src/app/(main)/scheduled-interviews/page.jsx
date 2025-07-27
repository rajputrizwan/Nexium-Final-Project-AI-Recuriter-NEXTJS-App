"use client";
import { supabase } from "@/services/supabaseClient";
import React, { useEffect, useState } from "react";
import { useUser } from "@/app/provider";
import InterviewCard from "../dashboard/_components/InterviewCard";
import { Video, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

function ScheduledInterviews() {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);

  useEffect(() => {
    if (user) {
      GetInterviewList();
    }
  }, [user]);

  const GetInterviewList = async () => {
    const { data, error } = await supabase
      .from("Interviews")
      .select(
        `
      id,
      jobPosition,
      Duration,
      interview_id,
      created_at,
      interview-feedback (
        *
      )
    `
      )
      .order("id", { ascending: false });

    if (error) {
      console.error("Error fetching interviews:", error);
      return;
    }

    // ✅ Filter feedbacks within each interview
    const filteredInterviews = data.map((interview) => {
      const filteredFeedback = interview["interview-feedback"]?.filter(
        (fb) => fb.userEmail === user.email
      );

      return {
        ...interview,
        ["interview-feedback"]: filteredFeedback,
      };
    });

    console.log("Filtered Interviews:", filteredInterviews);
    setInterviewList(filteredInterviews);
  };

  return (
    <div className="mt-5">
      <h2 className="font-bold text-xl">
        Interview List with Candidates Feedback
      </h2>

      <div className="mt-3">
        {interviewList.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center gap-4 py-10 bg-white p-5 border border-gray-200 rounded-lg">
            <Video className="h-10 w-10 text-primary" />
            <h2 className="text-lg font-semibold">
              You don't have any interviews created
            </h2>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create New Interview
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3">
            {interviewList.map((interview, index) => (
              <InterviewCard
                key={interview.id || index}
                interview={interview}
                viewDetail={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ScheduledInterviews;
