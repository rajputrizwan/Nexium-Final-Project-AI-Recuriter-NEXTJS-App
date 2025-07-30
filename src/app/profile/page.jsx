"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Calendar,
  Clock,
  Briefcase,
  CheckCircle,
  BarChart2,
} from "lucide-react";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { supabase } from "@/lib/supabaseClient";

dayjs.extend(relativeTime);

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const {
        data: { user: authUser },
        error,
      } = await supabase.auth.getUser();

      if (error || !authUser) {
        router.push("/sign-in");
        return;
      }

      const formattedUser = {
        id: authUser.id,
        email: authUser.email,
        name: authUser.user_metadata?.name || "Anonymous",
        picture: authUser.user_metadata?.avatar_url || null,
        createdAt: authUser.created_at,
      };

      setUser(formattedUser);

      const { data: interviewsData, error: interviewsError } = await supabase
        .from("interviews")
        .select("*")
        .eq("user_id", authUser.id)
        .order("createdAt", { ascending: false });

      if (interviewsError) {
        console.error(
          "Failed to fetch interviews:",
          interviewsError.message || interviewsError
        );
        setInterviews([]);
      } else {
        setInterviews(interviewsData || []);
      }
    }

    fetchData();
  }, [router]);

  if (!user) return null;

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profile Header */}
          <div className="mb-12">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="relative h-32 bg-gradient-to-r from-gray-300 to-gray-200">
                <div className="absolute -bottom-16 left-8">
                  <div className="w-32 h-32 rounded-full bg-white border-4 border-gray-100 flex items-center justify-center shadow overflow-hidden">
                    {user.picture ? (
                      <img
                        src={user.picture}
                        alt="User Profile"
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <User size={64} className="text-gray-600" />
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-20 pb-8 px-8">
                <h1 className="text-3xl font-bold text-gray-900">
                  {user.name}
                </h1>
                <div className="flex items-center mt-2 text-gray-600">
                  <span className="flex items-center">
                    <User size={16} className="mr-2" />
                    {user.email}
                  </span>
                  <span className="mx-3">•</span>
                  <span className="flex items-center">
                    <Calendar size={16} className="mr-2" />
                    Member since {dayjs(user.createdAt).format("MMMM YYYY")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Interview History */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Interview History
              </h2>
              <Link
                href="/interviews"
                className="text-blue-600 hover:text-blue-500 text-sm font-medium"
              >
                View All Interviews
              </Link>
            </div>

            {interviews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {interviews.map((interview) => (
                  <div
                    key={interview.id}
                    className="bg-white rounded-xl shadow hover:shadow-md transition-shadow"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-semibold text-gray-800">
                          {interview.role}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            interview.type.toLowerCase() === "technical"
                              ? "bg-blue-100 text-blue-700"
                              : interview.type.toLowerCase() === "behavioral"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {interview.type}
                        </span>
                      </div>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-center text-gray-600 text-sm">
                          <Calendar size={14} className="mr-2" />
                          <span>
                            {dayjs(interview.createdAt).format("MMM D, YYYY")}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-600 text-sm">
                          <Clock size={14} className="mr-2" />
                          <span>
                            {dayjs(interview.createdAt).format("h:mm A")}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-600 text-sm">
                          <Briefcase size={14} className="mr-2" />
                          <span>{interview.role}</span>
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        <Link
                          href={`/interview/${interview.id}/feedback`}
                          className="flex-1 py-2 px-3 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md flex items-center justify-center transition-colors"
                        >
                          <BarChart2 size={16} className="mr-2" />
                          View Feedback
                        </Link>
                        <Link
                          href={`/interview/${interview.id}`}
                          className="flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md flex items-center justify-center transition-colors"
                        >
                          <CheckCircle size={16} className="mr-2" />
                          Retake
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-8 text-center shadow">
                <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-4">
                  <Briefcase size={24} className="text-gray-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No interviews yet
                </h3>
                <p className="text-gray-600 mb-6">
                  You haven't taken any interviews yet. Start practicing to
                  improve your skills.
                </p>
                <Link
                  href="/interview"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Start Your First Interview
                </Link>
              </div>
            )}
          </div>

          {/* Stats Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Interview Statistics
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Total Interviews */}
              <div className="bg-white rounded-xl p-6 shadow">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium text-gray-800">
                    Total Interviews
                  </h3>
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Briefcase size={20} className="text-blue-600" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900">
                  {interviews.length}
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  interviews completed
                </p>
              </div>

              {/* Latest Interview */}
              <div className="bg-white rounded-xl p-6 shadow">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium text-gray-800">
                    Latest Interview
                  </h3>
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <Calendar size={20} className="text-purple-600" />
                  </div>
                </div>
                {interviews.length > 0 ? (
                  <>
                    <p className="text-3xl font-bold text-gray-900">
                      {interviews[0].role}
                    </p>
                    <p className="text-gray-600 text-sm mt-1">
                      {dayjs(interviews[0].createdAt).fromNow()}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-3xl font-bold text-gray-900">-</p>
                    <p className="text-gray-600 text-sm mt-1">
                      no interviews yet
                    </p>
                  </>
                )}
              </div>

              {/* Interview Types */}
              <div className="bg-white rounded-xl p-6 shadow">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium text-gray-800">
                    Interview Types
                  </h3>
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <BarChart2 size={20} className="text-green-600" />
                  </div>
                </div>

                {interviews.length > 0 ? (
                  <div className="space-y-3 mt-2">
                    {(() => {
                      const types = {};
                      interviews.forEach((interview) => {
                        types[interview.type] =
                          (types[interview.type] || 0) + 1;
                      });

                      return Object.entries(types).map(([type, count]) => (
                        <div key={type}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-gray-700">{type}</span>
                            <span className="text-gray-500">{count}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                type.toLowerCase() === "technical"
                                  ? "bg-blue-600"
                                  : type.toLowerCase() === "behavioral"
                                  ? "bg-purple-600"
                                  : "bg-green-600"
                              }`}
                              style={{
                                width: `${(count / interviews.length) * 100}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      ));
                    })()}
                  </div>
                ) : (
                  <p className="text-gray-600 text-sm mt-3">
                    No data available
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
