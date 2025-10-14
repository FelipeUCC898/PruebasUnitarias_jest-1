// src/components/Survey.tsx
import { useState } from "react";

export default function Survey() {
  const [rating, setRating] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating !== null) {
      setSubmitted(true);
    }
  };

  const resetSurvey = () => {
    setRating(null);
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="h-full w-full p-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <h2 className="text-xl font-bold text-green-800 mb-2">¡Gracias por tu opinión!</h2>
          <p className="text-lg mb-4">Calificaste con {rating} estrella{rating !== 1 ? 's' : ''}</p>
          <button
            onClick={resetSurvey}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Realizar otra encuesta
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full p-6">
      <h1 className="text-2xl font-bold mb-2">Encuesta de Satisfacción</h1>
      <p className="text-gray-600 mb-6">¿Cómo calificarías nuestro servicio?</p>
      
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center gap-4 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <label key={star} className="cursor-pointer">
              <input
                type="radio"
                name="rating"
                value={star}
                onChange={() => setRating(star)}
                className="hidden"
              />
              <span className={`text-3xl ${
                rating && rating >= star 
                  ? 'text-yellow-400' 
                  : 'text-gray-300'
              } hover:text-yellow-300 transition`}>
                ★
              </span>
            </label>
          ))}
        </div>
        
        <div className="text-center mb-4">
          {rating && (
            <p className="text-lg font-semibold">
              Seleccionaste: {rating} estrella{rating !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={rating === null}
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Enviar Encuesta
        </button>
      </form>
    </div>
  );
}