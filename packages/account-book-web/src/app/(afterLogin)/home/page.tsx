"use client";

import { useProtectedRoute } from "@/app/hooks/useProtectedRoute";

export default function Page() {
  const hasPermission = useProtectedRoute();
  if (!hasPermission) return null;
  return <div>home</div>;
}
