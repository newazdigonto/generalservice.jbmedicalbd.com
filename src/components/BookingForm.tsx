"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function BookingForm({
  initialService,
}: {
  initialService?: string;
}) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(initialService ?? "");
  const [preferredDate, setPreferredDate] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      setError("Please share your name and mobile number.");
      setStatus("error");
      return;
    }
    setStatus("submitting");
    setError("");
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          phone: phone.trim(),
          service: service.trim(),
          preferredDate: preferredDate.trim(),
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setFullName("");
      setPhone("");
      setService("");
      setPreferredDate("");
    } catch {
      setStatus("error");
      setError("Something went wrong sending your request. Please call us directly.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8.5 flex max-w-110 flex-col gap-4"
    >
      <input
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        placeholder="Full name"
        required
        className="rounded-[10px] border border-border-input px-4 py-3.5 text-[14.5px]"
      />
      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Mobile number"
        required
        type="tel"
        className="rounded-[10px] border border-border-input px-4 py-3.5 text-[14.5px]"
      />
      <input
        value={service}
        onChange={(e) => setService(e.target.value)}
        placeholder="Service or test needed"
        className="rounded-[10px] border border-border-input px-4 py-3.5 text-[14.5px]"
      />
      <input
        value={preferredDate}
        onChange={(e) => setPreferredDate(e.target.value)}
        placeholder="Preferred date"
        type="date"
        className="rounded-[10px] border border-border-input px-4 py-3.5 text-[14.5px]"
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="self-start rounded-full bg-purple px-7 py-3.5 text-[14px] font-medium text-white hover:bg-purple-dark disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Request appointment →"}
      </button>
      {status === "success" && (
        <div className="text-[14px] text-accent">
          Request received — our team will call to confirm your appointment.
        </div>
      )}
      {status === "error" && <div className="text-[14px] text-red-600">{error}</div>}
    </form>
  );
}
