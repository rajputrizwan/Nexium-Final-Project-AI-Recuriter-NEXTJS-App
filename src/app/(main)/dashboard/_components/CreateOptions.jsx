import React from "react";
import { Video, Phone } from "lucide-react";
import Link from "next/link";

function CreateOptions() {
  return (
    <div>
      <h2 className="font-bold text-2xl mb-5">Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Link
          href="/dashboard/create-interview"
          className="bg-white border border-gray-200 rounded-lg p-5 space-y-2"
        >
          <Video className="p-3 text-primary bg-blue-50 rounded-lg h-12 w-12" />
          <h2 className="font-bold">Create New Interview</h2>
          <p className="text-gray-600">
            Create AI-powered interviews and seamlessly schedule them with
            candidates.
          </p>
        </Link>

        <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-2">
          <Phone className="p-3 text-primary bg-blue-50 rounded-lg h-12 w-12" />
          <h2 className="font-bold">Create Phone Screening Call</h2>
          <p className="text-gray-600">
            Create phone screening calls with candidates.
          </p>
        </div>
      </div>
    </div>
  );
}

export default CreateOptions;
