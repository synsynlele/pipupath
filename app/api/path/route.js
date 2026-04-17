import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req){
  try{
    const { prompt } = await req.json();

    const completion = await client.chat.completions.create({
      model:"gpt-5.4-mini",
      temperature:0.8,
      messages:[
        {
          role:"system",
          content:"Return only valid JSON."
        },
        {
          role:"user",
          content:prompt
        }
      ]
    });

    const raw = completion.choices?.[0]?.message?.content || "{}";

    const cleaned = raw
      .replace(/```json/g,"")
      .replace(/```/g,"")
      .trim();

    const parsed = JSON.parse(cleaned);

    return NextResponse.json({ result: parsed });

  } catch(error){
    return NextResponse.json(
      { error:"Generation failed" },
      { status:500 }
    );
  }
}