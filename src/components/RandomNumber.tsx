// src/components/RandomNumber.tsx
import { useState } from "react";

export default function RandomNumber() {
  const [randomNumber, setRandomNumber] = useState<number | null>(null);

  const generateRandomNumber = () => {
    const newNumber = Math.floor(Math.random() * 100) + 1;
    setRandomNumber(newNumber);
  };

  return (
    <div className="h-full w-full p-6">
      <h1 className="text-2xl font-bold mb-4">Generador de Números Aleatorios</h1>
      <button
        onClick={generateRandomNumber}
        className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition font-semibold"
      >
        Generar Número Aleatorio
      </button>
      {randomNumber !== null && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-lg">
            Tu número aleatorio es: <span className="font-bold text-2xl text-blue-600">{randomNumber}</span>
          </p>
          <p className="text-sm text-gray-600 mt-2">Rango: 1 - 100</p>
        </div>
      )}
    </div>
  );
}