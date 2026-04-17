// Save this as: app/api/generate/route.js

import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // stored in Vercel, never exposed to browser
});

export async function POST(request) {
  try {
    const { prompt } = await request.json();

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // cheapest smart model: ~$0.15 per 1M tokens
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that ALWAYS responds with valid JSON only. Never include markdown code blocks, backticks, or any text outside the JSON object.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.8,
      max_tokens: 1200,
    });

    const content = completion.choices[0].message.content;
    
    // Clean up any markdown artifacts
    const cleaned = content.replace(/```json\s*|\s*```/g, '').trim();
    
    // Validate it's actual JSON
    const parsed = JSON.parse(cleaned);

    return NextResponse.json({ result: parsed });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}
