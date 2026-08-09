"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(email, password);
      router.push(searchParams.get("next") || "/account");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-6 py-20">
      <p className="eyebrow">Account</p>
      <h1 className="mt-3 font-display text-3xl">Sign in</h1>
      <p className="mt-2 text-sm text-muted">
        New here?{" "}
        <Link href="/register" className="focus-ring text-brass hover:underline">
          Create an account
        </Link>
      </p>

      <form onSubmit={handleSubmit} className="mt-10 space-y-5">
        <div>
          <label htmlFor="email" className="font-mono text-xs uppercase tracking-widest2 text-muted">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="focus-ring mt-2 w-full border border-line bg-surface px-4 py-3 text-sm"
          />
        </div>
        <div>
          <label htmlFor="password" className="font-mono text-xs uppercase tracking-widest2 text-muted">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="focus-ring mt-2 w-full border border-line bg-surface px-4 py-3 text-sm"
          />
        </div>

        {error && (
          <p className="border border-rust/40 bg-rust/10 px-4 py-3 text-sm text-rust">
            {error}
          </p>
        )}

        <button type="submit" disabled={submitting} className="btn-primary focus-ring w-full">
          {submitting ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
