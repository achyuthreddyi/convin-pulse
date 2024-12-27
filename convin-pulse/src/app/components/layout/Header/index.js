import Logo from "../../common/Logo";

export default function Header() {
  return (
    <header className="border-b w-full">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center">
          <Logo />
        </div>
      </div>
    </header>
  );
} 