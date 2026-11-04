export default function Tag({ children }) {
  return (
    <span className="rounded-full border border-destaque/30 bg-destaque/10 px-2 py-0.5 text-[0.72rem] text-destaque">
      {children}
    </span>
  );
}
