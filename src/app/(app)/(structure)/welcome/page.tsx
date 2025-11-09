"use client";

import { QuestsHeader } from "@/components/common/dashboard/quests-header";
import Skeleton from "@/components/common/ui/skeleton";
import { ArrowRight, CheckCircle, XCircle, Ghost } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const router = useRouter();
  const [showNoText, setShowNoText] = useState(false);

  return (
    <>
      <div className="mt-10">
        <QuestsHeader />
      </div>

      <div className="flex h-screen items-start bg-black p-0 gap-12">
        <div className="flex-shrink-0">
          <Skeleton />
        </div>

        <div className="flex-1 ml-20 mt-0 bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl shadow-xl min-h-[200px] p-10 text-left flex flex-col border-transparent hover:border-white transition-all">
          <h2 className="text-3xl font-bold text-black">
            Welcome, ready to begin?
            <Ghost w-6 h-6 className="inline-block mb-1 ml-2" />
          </h2>

          <div className="flex flex-col gap-6 mt-6">
            <button
              className="flex items-center gap-3 text-black font-semibold hover:text-green-400 transition text-lg"
              onClick={() => router.push("/home")}
            >
              <CheckCircle className="w-6 h-6" />
              Yes
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              className="flex items-center gap-3 text-black font-semibold hover:text-red-500 transition text-lg"
              onClick={() => setShowNoText(true)}
            >
              <XCircle className="w-6 h-6" />
              No
              <ArrowRight className="w-5 h-5" />
            </button>

            <div className="text-2xl font-medium text-black self-end">
              Be careful tho
            </div>
            <div className="text-2xl font-medium text-black self-end">
              There's no going back
            </div>

            {showNoText && (
              <div className="text-lg font-medium text-gray-400 self-center bg-black border border-gray-400 rounded-lg px-4 py-2">
              told you there's no going back
              </div>

            )}
          </div>
        </div>
      </div>
    </>
  );
}
