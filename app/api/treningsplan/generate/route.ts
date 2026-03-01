import { NextRequest, NextResponse } from "next/server";
import { generateTrainingPlan } from "@/lib/ai/generate-plan";
import { createServiceClient } from "@/lib/supabase/server";
import type { Facility, Season } from "@/lib/ai/category-engine";

export const maxDuration = 60; // Allow up to 60s for AI generation

interface GenerateRequest {
  handicap: number;
  sessionsPerWeek: number;
  facilities: Facility[];
  season: Season;
  goals?: string;
  email: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: GenerateRequest = await request.json();

    // Validate input
    if (typeof body.handicap !== "number" || body.handicap < -5 || body.handicap > 54) {
      return NextResponse.json({ error: "Ugyldig handicap (må være -5 til 54)" }, { status: 400 });
    }
    if (typeof body.sessionsPerWeek !== "number" || body.sessionsPerWeek < 2 || body.sessionsPerWeek > 7) {
      return NextResponse.json({ error: "Ugyldig antall økter (2-7)" }, { status: 400 });
    }
    if (!Array.isArray(body.facilities) || body.facilities.length === 0) {
      return NextResponse.json({ error: "Velg minst én fasilitet" }, { status: 400 });
    }
    if (!body.season) {
      return NextResponse.json({ error: "Velg sesong" }, { status: 400 });
    }
    if (!body.email || !body.email.includes("@")) {
      return NextResponse.json({ error: "Ugyldig e-postadresse" }, { status: 400 });
    }

    const input = {
      handicap: body.handicap,
      sessionsPerWeek: body.sessionsPerWeek,
      facilities: body.facilities,
      season: body.season,
      goals: body.goals,
    };

    // Generate plan via AI
    const result = await generateTrainingPlan(input);

    // Store in Supabase
    const supabase = createServiceClient();
    const { data: plan, error: dbError } = await supabase
      .from("plans")
      .insert({
        email: body.email,
        tier: "basis",
        status: "preview",
        handicap: body.handicap,
        sessions_per_week: body.sessionsPerWeek,
        facilities: body.facilities,
        season: body.season,
        goals: body.goals || null,
        category: result.plan.summary.playerCategory,
        preview_data: result.preview,
        full_plan: result.plan,
        ai_model: result.metadata.model,
        ai_tokens_used: result.metadata.inputTokens + result.metadata.outputTokens,
        generation_time_ms: result.metadata.generationTimeMs,
      })
      .select("id")
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json({ error: "Kunne ikke lagre plan" }, { status: 500 });
    }

    return NextResponse.json({
      planId: plan.id,
      preview: result.preview,
    });
  } catch (error) {
    console.error("Plan generation error:", error);
    const message = error instanceof Error ? error.message : "Ukjent feil";
    return NextResponse.json({ error: `Feil ved generering: ${message}` }, { status: 500 });
  }
}
