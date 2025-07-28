// "use client";
// import { supabase } from "@/services/supabaseClient";
// import React, { useEffect, useState } from "react";
// import { useUser } from "@/app/provider";
// import InterviewCard from "../dashboard/_components/InterviewCard";
// import { Video, Plus } from "lucide-react";
// import { Button } from "@/components/ui/button";

// function ScheduledInterviews() {
//   const { user } = useUser();
//   const [interviewList, setInterviewList] = useState([]);

//   useEffect(() => {
//     user && GetInterviewList();
//   }, [user]);

//   const GetInterviewList = async () => {
//     const result = await supabase
//       .from("Interviews")
//       .select(
//         "jobPosition,Duration, interview_id, interview-feedback(userEmail) "
//       )
//       .eq("userEmail", user?.email)
//       .order("id", { ascending: false });

//     console.log(result);
//     setInterviewList(result);
//   };

//   // useEffect(() => {
//   //   if (user) {
//   //     GetInterviewList();
//   //   }
//   // }, [user]);

//   // const GetInterviewList = async () => {
//   //   const { data, error } = await supabase
//   //     .from("Interviews")
//   //     .select(
//   //       `
//   //     id,
//   //     jobPosition,
//   //     Duration,
//   //     interview_id,
//   //     created_at,
//   //     interview-feedback (
//   //       *
//   //     )
//   //   `
//   //     )
//   //     .order("id", { ascending: false });

//   //   if (error) {
//   //     console.error("Error fetching interviews:", error);
//   //     return;
//   //   }

//   //   // ✅ Filter feedbacks within each interview
//   //   const filteredInterviews = data.map((interview) => {
//   //     const filteredFeedback = interview["interview-feedback"]?.filter(
//   //       (fb) => fb.userEmail === user.email
//   //     );

//   //     return {
//   //       ...interview,
//   //       ["interview-feedback"]: filteredFeedback,
//   //     };
//   // });

//   // console.log("Filtered Interviews:", filteredInterviews);
//   // setInterviewList(filteredInterviews);
//   // };

//   return (
//     <div className="my-5">
//       <h2 className="font-bold text-2xl pb-5">
//         Interview List with Candidates Feedback
//       </h2>

//       {/* <div className="mt-3">
//         {interviewList.length === 0 ? (
//           <div className="flex flex-col items-center justify-center text-center gap-4 py-10 bg-white p-5 border border-gray-200 rounded-lg">
//             <Video className="h-10 w-10 text-primary" />
//             <h2 className="text-lg font-semibold">
//               You don't have any interviews created
//             </h2>
//             <Button>
//               <Plus className="mr-2 h-4 w-4" />
//               Create New Interview
//             </Button>
//           </div>
//         ) : (
//           <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3">
//             {interviewList.map((interview, index) => (
//               <InterviewCard
//                 key={interview.id || index}
//                 interview={interview}
//                 viewDetail={true}
//               />
//             ))}
//           </div>
//         )}
//       </div> */}

//       {interviewList?.length === 0 && (
//         <div className="p-5 flex flex-col gap-3 items-center">
//           <Video className="h-10 w-10 text-primary" />
//           <h2>You don't have any interview created!</h2>
//           <Button>+ Create New Interview</Button>
//         </div>
//       )}

//       {interviewList?.length > 0 && (
//         <div className="grid grid-cols-2 mt-5 xl:grid-cols-3 gap-3">
//           {interviewList.map((interview, index) => (
//             <InterviewCard
//               key={index}
//               interview={interview}
//               viewDetail={true}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default ScheduledInterviews;

"use client";
import { supabase } from "@/services/supabaseClient";
import React, { useEffect, useState } from "react";
import { useUser } from "@/app/provider"; // Assuming this hook provides the user object
import InterviewCard from "../dashboard/_components/InterviewCard";
import { Video, Plus } from "lucide-react"; // Importing Plus icon
import { Button } from "@/components/ui/button";

function ScheduledInterviews() {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Added loading state

  useEffect(() => {
    // Only call GetInterviewList if user and user.email are available
    if (user?.email) {
      // CHANGED: Added check for user?.email to ensure it's not null/undefined
      GetInterviewList();
    } else if (user === null) {
      // ADDED: Handle case where user is explicitly null (e.g., not logged in)
      setIsLoading(false); // If no user, stop loading and show no interviews
    }
  }, [user]); // Dependency array: re-run when 'user' object changes

  // Re-activating the more complete GetInterviewList function
  const GetInterviewList = async () => {
    setIsLoading(true); // Set loading to true before fetching data
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
          userEmail
        )
      `
      )
      .eq("userEmail", user?.email) // CHANGED: Ensure user?.email is used for the query
      .order("id", { ascending: false });

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

    console.log("Filtered Interviews:", filteredInterviews);
    setInterviewList(filteredInterviews); // CHANGED: Set the state with the filtered 'data'
    setIsLoading(false); // Set loading to false after data is fetched and processed
  };

  return (
    <div className="my-5">
      <h2 className="font-bold text-2xl pb-5">
        Interview List with Candidates Feedback
      </h2>

      {isLoading ? ( // ADDED: Loading state display
        <div className="text-center py-10">Loading interviews...</div>
      ) : (
        <>
          {interviewList?.length === 0 ? ( // CHANGED: Use optional chaining on interviewList for safety
            <div className="p-5 flex flex-col gap-3 items-center">
              <Video className="h-10 w-10 text-primary" />
              <h2>You don't have any interview created!</h2>
              <Button>
                <Plus className="mr-2 h-4 w-4" />{" "}
                {/* CHANGED: Added Plus icon */}
                Create New Interview
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 mt-5 xl:grid-cols-3 gap-3">
              {interviewList.map((interview, index) => (
                <InterviewCard
                  key={interview.interview_id || index} // CHANGED: Use a more stable key if available (e.g., interview_id)
                  interview={interview} // CHANGED: Passed 'interview' prop directly
                  viewDetail={true} // Passed 'viewDetail' prop as per your previous request
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ScheduledInterviews;
