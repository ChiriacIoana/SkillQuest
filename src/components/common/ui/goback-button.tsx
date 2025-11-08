"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/common/ui/button";

export function GoBackButton({ className }: { className?: string }) {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      size="sm"
      className={`flex items-center gap-2 ${className}`}
      onClick={() => router.back()}
    >
      <ArrowLeft size={16} />
      Go Back
    </Button>
  );
}