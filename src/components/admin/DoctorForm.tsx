"use client";

import { useState } from "react";
import type { Doctor } from "@/lib/doctors";

export default function DoctorForm({
  doctor,
  onDone,
  onCancel,
}: {
  doctor?: Doctor;
  onDone: () => void;
  onCancel?: () => void;
}) {
  const [name, setName] = useState(doctor?.name ?? "");
  const [category, setCategory] = useState(doctor?.category ?? "");
  const [details, setDetails] = useState(doctor?.details ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const url = doctor ? `/api/admin/doctors/${doctor.id}` : "/api/admin/doctors";
    const method = doctor ? "PATCH" : "POST";

    try {
      const res = await fetch(url, { method, body: formData });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Something went wrong");
        setSubmitting(false);
        return;
      }
      if (!doctor) {
        setName("");
        setCategory("");
        setDetails("");
      }
      onDone();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-[12.5px] text-muted">Name</label>
          <input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Dr. Full Name"
            required
            className="w-full rounded-lg border border-border-input px-3.5 py-2.5 text-[14px]"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-[12.5px] text-muted">
            Category / Department
          </label>
          <input
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g. Family Medicine"
            required
            className="w-full rounded-lg border border-border-input px-3.5 py-2.5 text-[14px]"
          />
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-[12.5px] text-muted">
          Details (specialties, qualifications, bio)
        </label>
        <textarea
          name="details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          rows={3}
          className="w-full rounded-lg border border-border-input px-3.5 py-2.5 text-[14px]"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-[12.5px] text-muted">
          Photo {doctor?.photoUrl && "(leave empty to keep current photo)"}
        </label>
        <input
          name="photo"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="w-full text-[13.5px]"
        />
      </div>
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="self-start rounded-full bg-purple px-6 py-2.5 text-[13.5px] font-medium text-white hover:bg-purple-dark disabled:opacity-60"
        >
          {submitting ? "Saving…" : doctor ? "Save changes" : "Add doctor"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-[13.5px] font-medium text-faint hover:text-ink"
          >
            Cancel
          </button>
        )}
      </div>
      {error && <div className="text-[13px] text-red-600">{error}</div>}
    </form>
  );
}
