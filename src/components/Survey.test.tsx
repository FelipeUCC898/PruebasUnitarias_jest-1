// src/components/Survey.simple.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Survey from './Survey';

describe('Survey Component - Simplified Tests', () => {
  test('renders survey form correctly', () => {
    render(<Survey />);

    expect(screen.getByText('Encuesta de Satisfacción')).toBeInTheDocument();
    expect(screen.getByText('¿Cómo calificarías nuestro servicio?')).toBeInTheDocument();

    // Debería haber 5 estrellas
    const stars = screen.getAllByText('★');
    expect(stars).toHaveLength(5);

    // Botón debería estar deshabilitado inicialmente
    expect(screen.getByRole('button', { name: /enviar encuesta/i })).toBeDisabled();
  });

  test('can select rating and submit', () => {
    render(<Survey />);

    const stars = screen.getAllByText('★');

    // Seleccionar tercera estrella
    fireEvent.click(stars[2]);

    // Debería mostrar la selección y habilitar el botón
    expect(screen.getByText(/seleccionaste:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enviar encuesta/i })).not.toBeDisabled();

    // Enviar encuesta
    fireEvent.click(screen.getByRole('button', { name: /enviar encuesta/i }));

    // Debería mostrar confirmación
    expect(screen.getByText('¡Gracias por tu opinión!')).toBeInTheDocument();
    expect(screen.getByText(/calificaste con/i)).toBeInTheDocument();
  });

  test('can reset survey', () => {
    render(<Survey />);

    // Completar encuesta
    const stars = screen.getAllByText('★');
    fireEvent.click(stars[2]);
    fireEvent.click(screen.getByRole('button', { name: /enviar encuesta/i }));

    // Resetear
    fireEvent.click(screen.getByRole('button', { name: /realizar otra encuesta/i }));

    // Debería volver al estado inicial
    expect(screen.getByText('Encuesta de Satisfacción')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enviar encuesta/i })).toBeDisabled();
  });
});