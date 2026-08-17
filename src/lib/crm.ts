export type AppointmentPayload = {
  id: number;
  fullName: string;
  phone: string;
  service: string | null;
  preferredDate: string | null;
  sourcePath: string | null;
  createdAt: string;
};

/**
 * Forwards a new appointment to an external CRM webhook, if configured.
 * Never throws — a CRM outage must not block the patient's booking request.
 */
export async function forwardToCrm(payload: AppointmentPayload): Promise<boolean> {
  const url = process.env.CRM_WEBHOOK_URL;
  if (!url) return false;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.CRM_WEBHOOK_SECRET
          ? { Authorization: `Bearer ${process.env.CRM_WEBHOOK_SECRET}` }
          : {}),
      },
      body: JSON.stringify({ event: "appointment.created", data: payload }),
      signal: controller.signal,
    });
    return res.ok;
  } catch (err) {
    console.error("CRM webhook forward failed:", err);
    return false;
  } finally {
    clearTimeout(timeout);
  }
}
