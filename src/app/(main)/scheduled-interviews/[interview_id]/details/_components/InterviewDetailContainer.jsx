import React from "react";
import { Calendar1Icon, Clock } from "lucide-react";
import moment from "moment";

function InterviewDetailContainer({ interviewDetail }) {
  return (
    <div className="p-5 bg-white rounded-lg mt-5">
      <h2>{interviewDetail?.jobPosition}</h2>

      <div className="mt-4 flex item-center justify-between">
        <div>
          <h2 className="text-sm text-gray-500 mb-1">Duration</h2>
          <h2 className="flex text-sm  font-bold items-center gap-2">
            <Clock className="h-4 w-4 " />
            {interviewDetail?.Duration}
          </h2>
        </div>

        <div>
          <h2 className="text-sm text-gray-500 mb-1">Created On</h2>
          <h2 className="flex text-sm  font-bold items-center gap-2">
            <Calendar1Icon className="h-4 w-4 " />
            {moment(interviewDetail?.created_at).format("Do MMM YY")}
          </h2>
        </div>

        <div>
          <h2 className="text-sm text-gray-500 mb-1">Type</h2>
          <h2 className="flex text-sm font-bold items-center gap-2">
            <Clock className="h-4 w-4" />
            {(() => {
              try {
                const parsedType = JSON.parse(interviewDetail?.type);
                return Array.isArray(parsedType) ? parsedType[0] : "N/A";
              } catch (e) {
                return interviewDetail?.type || "N/A";
              }
            })()}
          </h2>
        </div>
      </div>

      <div className="mt-5">
        <h2 className="font-bold">Job Description</h2>
        <p className="text-sm leading-6">{interviewDetail?.jobDescription}</p>
      </div>

      <div className="mt-5">
        <h2 className="font-bold mb-3">Interview Questions</h2>
        <div className="grid grid-cols-2 gap-5">
          {Array.isArray(interviewDetail?.questionList) &&
            interviewDetail.questionList.map((item, index) => (
              <h2 key={index} className="text-sm">
                {index + 1}. {item?.question || "No question"}
              </h2>
            ))}
        </div>
      </div>
    </div>
  );
}

export default InterviewDetailContainer;
