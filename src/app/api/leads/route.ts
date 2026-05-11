import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { supabaseAdmin } from "@/lib/supabase"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, companyName, role, auditId, totalSavings, honeypot } = body

    if (honeypot) {
      return NextResponse.json({ ok: true })
    }

    if (!email || !auditId) {
      return NextResponse.json(
        { error: "Email and auditId are required" },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      )
    }

    const { error: dbError } = await supabaseAdmin
      .from("leads")
      .insert({
        audit_id: auditId,
        email,
        company_name: companyName || null,
        role: role || null,
      })

    if (dbError) {
      console.error("Lead insert error:", dbError)
    }

    const isHighSavings = totalSavings > 500

    await resend.emails.send({
      from: "SpendLens <onboarding@resend.dev>",
      to: email,
      subject: "Your AI spend audit report",
      html: buildEmailHTML(auditId, totalSavings, isHighSavings),
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("Leads route error:", err)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

function buildEmailHTML(
  auditId: string,
  totalSavings: number,
  isHighSavings: boolean
): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const reportUrl = `${baseUrl}/audit/${auditId}`
  return `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px 24px">
      <h1 style="font-size:22px;margin-bottom:8px">Your audit is ready</h1>
      <p style="color:#666;margin-bottom:24px">
        We found <strong>$${totalSavings}/month</strong> in potential savings on your AI stack.
      </p>
      <a href="${reportUrl}"
         style="background:#16a34a;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;display:inline-block;margin-bottom:24px">
        View Full Report
      </a>
      ${isHighSavings ? `
      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:16px;margin-bottom:24px">
        <strong style="color:#15803d">You qualify for a Credex consultation</strong>
        <p style="color:#166534;margin:8px 0 0">At $${totalSavings}/month in potential savings, a Credex advisor will reach out within 24 hours with discounted credit options.</p>
      </div>` : ""}
      <p style="color:#999;font-size:12px">You're receiving this because you requested an audit on SpendLens.</p>
    </div>
  `
}