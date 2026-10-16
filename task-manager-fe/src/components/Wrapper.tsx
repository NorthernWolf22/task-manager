import Navbar from "./Navbar";

export default function Wrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-3xl p-6">{children}</main>
    </div>
  );
}