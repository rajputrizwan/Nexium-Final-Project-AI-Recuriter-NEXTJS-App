"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Calendar,
  Clock,
  Briefcase,
  Code,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const InterviewCard = ({
  userId,
  interviewId,
  role,
  type,
  techstack,
  createdAt,
  feedback,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const formattedDate = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
  });

  const isPastInterview = feedback;

  return (
    <Link
      href={
        feedback
          ? `/interview/${interviewId}/feedback`
          : `/interview/${interviewId}`
      }
      className="block"
    >
      <div
        className={`bg-gray-800 rounded-xl p-6 border border-gray-700 transition-all duration-300 ${
          isHovered
            ? "shadow-lg shadow-blue-900/20 border-blue-600/30 transform -translate-y-1"
            : ""
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">{role}</h3>
            <div className="flex items-center text-gray-400 text-sm mb-4">
              <Calendar size={14} className="mr-1" />
              <span>{formattedDate}</span>
              <span className="mx-2">•</span>
              <Clock size={14} className="mr-1" />
              <span>30 min</span>
            </div>
          </div>

          <div
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              type.toLowerCase() === "technical"
                ? "bg-blue-900/30 text-blue-400"
                : type.toLowerCase() === "behavioral"
                ? "bg-purple-900/30 text-purple-400"
                : "bg-green-900/30 text-green-400"
            }`}
          >
            {type}
          </div>
        </div>

        <div className="flex items-center mb-4">
          <Briefcase size={16} className="text-gray-400 mr-2" />
          <span className="text-gray-300">{role}</span>
        </div>

        {techstack && techstack.length > 0 && (
          <div className="flex items-center mb-6">
            <Code size={16} className="text-gray-400 mr-2" />
            <div className="flex flex-wrap gap-2">
              {techstack.map((tech, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-700 rounded-md text-xs text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mt-2">
          <div
            className={`flex items-center ${
              isPastInterview ? "text-blue-500" : "text-green-500"
            }`}
          >
            {isPastInterview ? (
              <>
                <CheckCircle size={16} className="mr-1" />
                <span className="text-sm font-medium">View Feedback</span>
              </>
            ) : (
              <>
                <span className="text-sm font-medium">Take Interview</span>
              </>
            )}
          </div>

          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              isHovered
                ? isPastInterview
                  ? "bg-blue-600"
                  : "bg-green-600"
                : "bg-gray-700"
            }`}
          >
            <ArrowRight size={16} className="text-white" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default InterviewCard;
