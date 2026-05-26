drop policy if exists "anyone can submit contact" on public.contact_messages;
create policy "anyone can submit contact" on public.contact_messages
  for insert to anon, authenticated
  with check (
    length(name) between 1 and 200
    and length(email) between 3 and 320
    and email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    and length(message) between 1 and 5000
  );

revoke execute on function public.handle_new_user() from public, anon, authenticated;