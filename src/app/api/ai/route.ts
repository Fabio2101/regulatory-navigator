// src/app/api/ai/route.ts
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Sei un assistente normativo esperto nel diritto italiano.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
    });

    const risposta = completion.choices[0].message?.content ?? '';
    return NextResponse.json({ risposta });
  } catch (err) {
    console.error('API AI error:', err);
    return NextResponse.json(
      { risposta: 'Errore durante la generazione della risposta.' },
      { status: 500 }
    );
  }
}
