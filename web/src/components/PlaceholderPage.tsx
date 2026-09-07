import "@/styles/incentives-page.css";

export function PlaceholderPage({ title }: { title: string }) {
  return (
    <main className="incentives-page">
      <h1 className="incentives-page__title">{title}</h1>
    </main>
  );
}
