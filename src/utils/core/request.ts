export async function request(url: URL | string) {
  const res = await fetch(url);

  if (!res.ok) throw new Error('Failed to fetch data.');

  return await res.json();
}
