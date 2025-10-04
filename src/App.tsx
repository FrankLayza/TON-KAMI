// import { Button } from "@/components/ui/button"
import Navbar from "@/components/Navbar";
import BalanceCard from "./components/BalanceCard";
import Send from "./components/Send";

function App() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto  px-4 py-6 md:py-8 max-w-6xl">
        <Navbar />
        <div className="space-y-6 md:space-y-8">
          <BalanceCard />

          <div className="grid grid-cols-1 md:grid-cols-2">
            <Send />
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
