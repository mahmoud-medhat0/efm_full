import RootLayout from "../../layout";
import { Link } from "@inertiajs/react";
const BitcoinGamePage = () => {
  return (
    <RootLayout>
    <main className="w-full h-full my-20 container">
      <div className="mb-2">
        <h2 className="text-4xl text-black mb-4">
          <span className="mark-zigzag">Bitcoin</span> Game
        </h2>
      </div>
      <div className="w-full"></div>
    </main>
    </RootLayout>
  );
};

export default BitcoinGamePage;
