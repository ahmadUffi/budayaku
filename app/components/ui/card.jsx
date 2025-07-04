export function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-white/30 backdrop-blur-md rounded-2xl shadow-lg ${className}`}
    >
      {children}
    </div>
  );
}

export function CardContent({ children }) {
  return <div className="p-6">{children}</div>;
}
