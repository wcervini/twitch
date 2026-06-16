import type { APIRoute } from 'astro';
export const prerender = false;

// Inicializamos la propiedad global si no existe para mantener el estado
if (!(globalThis as any).twitchFollowerGoal) {
  (globalThis as any).twitchFollowerGoal = 100;
}

// Exportamos una función en lugar de una variable fija para obtener el valor actualizado real
export function getCurrentGoal(): number {
  return (globalThis as any).twitchFollowerGoal;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const newGoal = parseInt(data.goal);

    if (isNaN(newGoal) || newGoal < 0) {
      return new Response(JSON.stringify({ error: 'Número inválido' }), { status: 400 });
    }

    // Guardamos directamente en la memoria global compartida
    (globalThis as any).twitchFollowerGoal = newGoal;

    return new Response(JSON.stringify({ success: true, goal: newGoal }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error en la petición' }), { status: 500 });
  }
};
