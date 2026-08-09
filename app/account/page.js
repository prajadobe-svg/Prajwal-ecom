"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AccountPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login?next=/account");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return <div className="mx-auto max-w-md px-6 py-20 text-muted">Loading…</div>;
  }

  return (
    <div className="mx-auto max-w-md px-6 py-20">
      <p className="eyebrow">Account</p>
      <h1 className="mt-3 font-display text-3xl">Hi, {user.name.split(" ")[0]}</h1>

      <div className="mt-10 space-y-4 border border-line p-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest2 text-muted">Name</p>
          <p className="mt-1 text-sm">{user.name}</p>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-widest2 text-muted">Email</p>
          <p className="mt-1 text-sm">{user.email}</p>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-widest2 text-muted">Account ID</p>
          <p className="mt-1 font-mono text-sm">{user.id}</p>
        </div>
      </div>

      <button onClick={logout} className="btn-outline focus-ring mt-6 w-full">
        Sign out
      </button>
    </div>
  );
}
