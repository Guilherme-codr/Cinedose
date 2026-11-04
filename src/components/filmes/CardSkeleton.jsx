// Efeito de brilho que passa enquanto os dados chegam.
const BRILHO =
  "animate-brilho bg-[length:200%_100%] bg-[linear-gradient(90deg,#1e293b_25%,#2a3a52_50%,#1e293b_75%)]";

export default function CardSkeleton({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`overflow-hidden rounded-cartao border border-borda-suave bg-superficie shadow-cartao ${className}`}
    >
      <div className={`aspect-[2/3] ${BRILHO}`} />
      <div className="p-3.5">
        <div className={`mb-2 h-3.5 rounded-md ${BRILHO}`} />
        <div className={`h-3.5 w-3/5 rounded-md ${BRILHO}`} />
      </div>
    </div>
  );
}
