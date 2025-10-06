import { NextResponse } from 'next/server';

const EXTERNAL_API_URL = process.env.API_URL;

export async function GET(request: Request, { params }: { params: Promise<{ ids: string[] }> }) {
  const { ids } = await params;
  const episodeIds = ids[0];

  if (!episodeIds) {
    return NextResponse.json({ error: 'Se necesitan IDs de episodios' }, { status: 400 });
  }

  try {
    const response = await fetch(`${EXTERNAL_API_URL}/episode/${episodeIds}`);

    if (!response.ok) {
      return NextResponse.json(
        { error: 'No se pudieron cargar los episodios' },
        { status: response.status }
      );
    }

    const episodes = await response.json();
    return NextResponse.json(episodes);
  } catch {
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}
