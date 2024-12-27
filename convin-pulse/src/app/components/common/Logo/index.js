export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 12H7L10 20L14 4L17 12H21"
          stroke="#5088FE"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="12" r="2" fill="#5CE7E8" />
      </svg>
      <div className="text-xl font-semibold">
        <span className="text-[#5088FE]">Convin </span>
        <span className="text-[#5CE7E8]">Pulse</span>
      </div>
    </div>
  );
} 