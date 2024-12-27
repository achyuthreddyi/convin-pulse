import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold">Welcome to Convin Pulse</h1>
        </main>
      </div>
    </div>
  );
}
