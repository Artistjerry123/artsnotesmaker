import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { topic, language, papersText } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const langInstruction = language === "hindi"
      ? "Generate the entire chapter in Hindi (Devanagari script). Use Hindi language for all explanations, headings, and exercises."
      : "Generate the entire chapter in English.";

    const systemPrompt = `You are an expert textbook author and UGC NET exam preparation specialist for Visual Art. Your task is to generate a complete, comprehensive textbook chapter on the given topic.

CRITICAL INSTRUCTIONS:
1. You are given the complete text of 9 UGC NET Visual Art previous year exam papers (2019-2025).
2. You MUST carefully scan ALL the exam papers and extract EVERY question, option, fact, concept, name, date, artwork, artist, movement, technique, and detail related to the given topic.
3. You MUST integrate ALL these exam-relevant points naturally into the chapter explanation. DO NOT miss any concept asked in previous exams.
4. DO NOT include unrelated topics. Cover ONLY the given topic.
5. ${langInstruction}

CHAPTER STRUCTURE (Follow this textbook format):

# Chapter: [Topic Name]

## Introduction
Brief overview of the topic.

## Meaning / Definition
Clear definition and meaning.

## Historical Background
Origins and development through history.

## Main Concepts and Development
Detailed explanation of key concepts, step by step.

## Important Features / Characteristics
Key distinguishing features.

## Examples or Case Studies
Real examples, artworks, monuments etc.

## Important Personalities / Events
Key people, their contributions, important events.

## Significance and Impact
Why this topic matters in art history.

## Conclusion
Summary of the chapter.

---

TEXTBOOK ELEMENTS TO INCLUDE THROUGHOUT:
- Use > 💡 **Did You Know?** for interesting facts
- Use > ℹ️ **Important Information** for exam-critical points
- Use > 📝 **Let Us Know** for additional context
- Include tables where relevant (comparisons, timelines, features)
- Bold key terms and names

---

## Exercise

### Multiple Choice Questions
(Create 10-15 MCQs based on the chapter content AND previous year exam questions on this topic)

### Short Answer Questions
(5-7 questions)

### Explain with Reasons
(3-4 questions)

### Fill in the Blanks
(5-7 items)

### Table Completion / Diagram Questions
(2-3 items)

### Project
A small research activity related to the topic.

EXPLANATION STYLE:
- Start from basic understanding
- Use very clear and simple language that even a beginner can understand
- Include deep conceptual points for IAS, UPSC, and UGC NET level
- Explain step-by-step like a teacher
- Make the chapter detailed and comprehensive (aim for 3000-5000 words)`;

    const userPrompt = `Topic: "${topic}"

Here are the complete UGC NET Visual Art previous year exam papers. Scan ALL of them and extract EVERY relevant question and concept related to "${topic}":

${papersText}

Now generate a complete textbook chapter on "${topic}" integrating ALL exam-relevant points found above. Remember to cover ONLY this topic and not miss any previously asked exam concept.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-pro",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required, please add funds." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("generate-chapter error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
