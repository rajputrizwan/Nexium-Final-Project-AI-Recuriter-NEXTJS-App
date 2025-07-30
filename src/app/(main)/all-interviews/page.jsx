"use client";

import { Plus, Video } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/app/provider";
import { supabase } from "@/lib/supabaseClient";
import InterviewCard from "../dashboard/_components/InterviewCard";

function AllIntevriew() {
  const [interviewsList, setInterviewList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      getInterviewList();
    }
  }, [user]);

  const getInterviewList = async () => {
    const { data: Interviews, error } = await supabase
      .from("Interviews")
      .select("*")
      .eq("userEmail", user?.email)
      .order("id", { ascending: false });
    // .limit(6);

    // console.log(Interviews);

    if (error) {
      console.error("Error fetching interviews:", error.message);
    } else {
      setInterviewList(Interviews || []);
    }
  };

  return (
    <div className="my-5">
      <h2 className="font-bold text-2xl pb-5">
        All Previously Created Interviews
      </h2>

      {interviewsList?.length === 0 ? (
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
          {interviewsList.map((interview, index) => (
            <InterviewCard interview={interview} key={interview.id || index} />
          ))}
        </div>
      )}
    </div>
  );
}

export default AllIntevriew;
