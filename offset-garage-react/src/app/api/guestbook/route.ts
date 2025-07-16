import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { supabase } from '../../../lib/supabaseClient';

// GET: Fetch all guestbook entries
export async function GET() {
  const { data, error } = await supabase
    .from('guestbook')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// POST: Create a new guestbook entry
export async function POST(request: Request) {
  const { content } = await request.json();

  if (!content || content.length > 100) {
    return NextResponse.json({ error: 'Invalid content' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('guestbook')
    .insert([{ content }])
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// DELETE: Delete a guestbook entry by ID
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing guestbook entry ID' }, { status: 400 });
  }

  const { error } = await supabase
    .from('guestbook')
    .delete()
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  revalidatePath('/inkdrop'); // Revalidate the page, not the API route
  return NextResponse.json({ message: 'Entry deleted successfully' }, { status: 200 });
}
