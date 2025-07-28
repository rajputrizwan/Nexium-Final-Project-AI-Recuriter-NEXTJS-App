import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import moment from "moment";
import { Progress } from "@/components/ui/progress";

function CandidateFeedbackDialog({ candidate }) {
  const feedback = candidate?.feedback?.feedback;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-primary">
          View Report
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] sm:max-w-xl md:max-w-2xl lg:max-w-3xl w-full">
        <DialogHeader>
          <DialogTitle>Feedback</DialogTitle>
          <DialogDescription asChild>
            <div className="mt-5 space-y-6">
              {/* Header Row */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="bg-primary text-white font-bold rounded-full p-3 px-4">
                    {candidate?.userName?.[0] || "N/A"}
                  </div>
                  <div>
                    <h2 className="font-bold text-base">
                      {candidate?.userName}
                    </h2>
                    <p className="text-gray-500 text-sm">
                      {candidate?.userEmail}
                    </p>
                  </div>
                </div>
                <div className="text-primary text-2xl font-bold">6/10</div>
              </div>

              {/* Skills Grid */}
              <div>
                <h2 className="font-bold text-lg mb-3">Skill's Assessment</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h2 className="flex justify-between text-sm font-medium">
                      Technical Skills{" "}
                      <span>{feedback?.rating?.technicalSkills}/10</span>
                    </h2>
                    <Progress
                      value={feedback?.rating?.technicalSkills * 10}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <h2 className="flex justify-between text-sm font-medium">
                      Communication{" "}
                      <span>{feedback?.rating?.communication}/10</span>
                    </h2>
                    <Progress
                      value={feedback?.rating?.communication * 10}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <h2 className="flex justify-between text-sm font-medium">
                      Problem Solving{" "}
                      <span>{feedback?.rating?.problemSolving}/10</span>
                    </h2>
                    <Progress
                      value={feedback?.rating?.problemSolving * 10}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <h2 className="flex justify-between text-sm font-medium">
                      Experience <span>{feedback?.rating?.experience}/10</span>
                    </h2>
                    <Progress
                      value={feedback?.rating?.experience * 10}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <h2 className="font-bold">Performance Summary </h2>
                <div className="p-5 bg-secondary rounded-lg mt-3">
                  <p>{feedback?.summary}</p>
                </div>
              </div>

              {/* Recommendation Message */}
              <div
                className={`p-5 rounded-md flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center ${
                  feedback?.recommendation === "No"
                    ? "bg-red-100"
                    : "bg-green-100"
                }`}
              >
                <div className="flex-1">
                  <h2
                    className={`font-bold mb-1 ${
                      feedback?.recommendation === "No"
                        ? "text-red-700"
                        : "text-green-700"
                    }`}
                  >
                    Recommendation Message:
                  </h2>
                  <p
                    className={`text-sm ${
                      feedback?.recommendation === "No"
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {feedback?.recommendationMsg}
                  </p>
                </div>

                <Button
                  className={`w-full sm:w-auto ${
                    feedback?.recommendation === "No"
                      ? "bg-red-700"
                      : "bg-green-700"
                  }`}
                >
                  Send Message
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default CandidateFeedbackDialog;
