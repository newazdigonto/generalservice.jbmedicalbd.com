"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim(), password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Login failed");
        setLoading(false);
        return;
      }
      const from = searchParams.get("from");
      router.push(from && from.startsWith("/admin") ? from : "/admin");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm rounded-2xl border border-border bg-white px-8 py-9 shadow-[0_18px_44px_rgba(27,22,80,0.1)]"
    >
      <div className="flex justify-center">
        <Image src="/brand/logo.png" alt="JB Medical Center" width={500} height={97} className="h-10 w-auto" />
      </div>
      <div className="mt-6 text-center text-[13px] font-semibold tracking-[0.08em] text-faint uppercase">
        Admin Panel
      </div>
      <div className="mt-7 flex flex-col gap-4">
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
          autoFocus
          className="rounded-[10px] border border-border-input px-4 py-3.5 text-[14.5px]"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          required
          className="rounded-[10px] border border-border-input px-4 py-3.5 text-[14.5px]"
        />
        <button
          type="submit"
          disabled={loading}
          className="mt-1 rounded-full bg-purple px-6 py-3.5 text-[14px] font-medium text-white hover:bg-purple-dark disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
        {error && <div className="text-[13.5px] text-red-600">{error}</div>}
      </div>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-soft px-6">
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
