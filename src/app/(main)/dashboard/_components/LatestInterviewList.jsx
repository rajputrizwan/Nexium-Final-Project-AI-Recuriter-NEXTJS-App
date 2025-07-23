"use client";
import { Plus, Video } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

function LatestInterviewList() {
  const [interviews, setInterviews] = useState([]);
  return (
    <div className="my-5 ">
      <h2 className="font-bold text-2xl pb-5">Previously Created Interviews</h2>
      {interviews?.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center gap-4 py-10 bg-white p-5 border rounded-2xl">
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
        <div className="space-y-4">
          {interviews.map((interview) => (
            <div
              key={interview.id}
              className="p-4 border rounded-lg bg-white shadow"
            >
              {interview.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LatestInterviewList;
