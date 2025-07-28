"use client";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useUser } from "@/app/provider";
import { supabase } from "@/services/supabaseClient";
import InterviewDetailContainer from "../../_components/InterviewDetailContainer";

function InterviewDetail() {
  const { interview_id } = useParams();

  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);

  useEffect(() => {
    if (user) {
      GetInterviewDetail();
    }
  }, [user]);

  const GetInterviewDetail = async () => {
    const { data, error } = await supabase
      .from("Interviews")
      .select(
        `
      id,
      jobPosition,
      jobDescription,
      type,
      questionList,
      Duration,
      interview_id,
      created_at,
      interview-feedback:interview-feedback (
        userEmail,
        interview_id
      )
    `
      )
      .order("id", { ascending: false });

    if (error) {
      console.error("Error fetching interviews:", error);
      return;
    }

    // ✅ Filter feedbacks by current user's email
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
    <div>
      <h2 className="font-bold text-2xl">Interview Detail</h2>
      <InterviewDetailContainer />
    </div>
  );
}

export default InterviewDetail;
