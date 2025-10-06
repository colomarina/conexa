import { NextResponse } from 'next/server';

const EXTERNAL_API_URL = process.env.API_URL;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1';

  try {
    const response = await fetch(`${EXTERNAL_API_URL}/character?page=${page}`, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'No se pudieron cargar los personajes' },
        { status: response.status }
      );
    }

    const characters = await response.json();
    return NextResponse.json(characters);
  } catch {
    return NextResponse.json(
      { error: 'Error del servidor' },
      { status: 500 }
    );
  }
}
