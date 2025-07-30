"use client";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useUser } from "@/app/provider";
import { supabase } from "@/lib/supabaseClient";
import InterviewDetailContainer from "./_components/InterviewDetailContainer";
import CandidatesList from "./_components/CandidatesList";

function InterviewDetail() {
  const { interview_id } = useParams();

  const { user } = useUser();

  const [interviewDetail, setInterviewDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Added loading state

  useEffect(() => {
    // Only call GetInterviewList if user and user.email are available
    if (user?.email) {
      // CHANGED: Added check for user?.email to ensure it's not null/undefined
      GetInterviewDetail();
    } else if (user === null) {
      // ADDED: Handle case where user is explicitly null (e.g., not logged in)
      setIsLoading(false); // If no user, stop loading and show no interviews
    }
  }, [user]); // Dependency array: re-run when 'user' object changes

  useEffect(() => {
    if (user) {
      GetInterviewDetail();
    }
  }, [user]);

  const GetInterviewDetail = async () => {
    // Re-activating the more complete GetInterviewList function
    setIsLoading(true); // Set loading to true before fetching data
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
  interview-feedback (
    userEmail,
    userName,
    feedback,
    created_at
  )
`
      )

      .eq("userEmail", user?.email)
      .eq("interview_id", interview_id); // CHANGED: Ensure user?.email is used for the query

    // console.log(data);

    if (error) {
      console.error("Error fetching interviews:", error);
      setIsLoading(false); // Set loading to false even on error
      // Optionally, you might want to display an error message to the user
      return;
    }

    // Filter feedbacks within each interview to only include those belonging to the current user
    // This assumes 'interview-feedback' is a related table where each feedback entry has a userEmail
    const filteredInterviews = data.map((interview) => {
      const filteredFeedback = interview["interview-feedback"]?.filter(
        (fb) => fb.userEmail === user.email
      );

      return {
        ...interview,
        "interview-feedback": filteredFeedback,
      };
    });

    console.log("Filtered Interviews:", filteredInterviews[0]);
    setInterviewDetail(filteredInterviews[0]); // CHANGED: Set the state with the filtered 'data'
    setIsLoading(false); // Set loading to false after data is fetched and processed
  };

  // const { data, error } = await supabase
  //   .from("Interviews")
  //   .select(
  //     `
  //   id,
  //   jobPosition,
  //   jobDescription,
  //   type,
  //   questionList,
  //   Duration,
  //   interview_id,
  //   created_at,
  //   interview-feedback:interview-feedback (
  //     userEmail,
  //     interview_id
  //   )
  // `
  //   )
  //   .order("id", { ascending: false });

  // if (error) {
  //   console.error("Error fetching interviews:", error);
  //   return;
  // }

  // // ✅ Filter feedbacks by current user's email
  // const filteredInterviews = data.map((interview) => {
  //   const filteredFeedback = interview["interview-feedback"]?.filter(
  //     (fb) => fb.userEmail === user.email
  //   );

  //   return {
  //     ...interview,
  //     ["interview-feedback"]: filteredFeedback,
  //   };
  // });

  // console.log("Filtered Interviews:", filteredInterviews);
  // setInterviewList(filteredInterviews);

  return (
    <div>
      <h2 className="font-bold text-2xl">Interview Detail</h2>
      <InterviewDetailContainer interviewDetail={interviewDetail} />
      <CandidatesList candidateList={interviewDetail?.["interview-feedback"]} />
    </div>
  );
}

export default InterviewDetail;
