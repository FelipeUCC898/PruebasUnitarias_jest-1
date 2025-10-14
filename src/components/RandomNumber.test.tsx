// src/components/__tests__/RandomNumber.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RandomNumber from './RandomNumber';

// Mock de Math.random para controlar los números generados
const mockMathRandom = jest.spyOn(global.Math, 'random');

describe('RandomNumber Component', () => {
  beforeEach(() => {
    // Limpiar todos los mocks antes de cada test
    jest.clearAllMocks();
  });

  afterAll(() => {
    // Restaurar Math.random original después de todos los tests
    mockMathRandom.mockRestore();
  });

  test('renders correctly with initial state', () => {
    render(<RandomNumber />);
    
    // Verificar que el título se renderiza
    expect(screen.getByText('Generador de Números Aleatorios')).toBeInTheDocument();
    
    // Verificar que el botón se renderiza
    expect(screen.getByRole('button', { name: /generar número aleatorio/i })).toBeInTheDocument();
    
    // Verificar que inicialmente no hay número mostrado
    expect(screen.queryByText(/tu número aleatorio es:/i)).not.toBeInTheDocument();
  });

  test('generates and displays a random number when button is clicked', () => {
    // Mock para que siempre retorne 0.5 (50/100 + 1 = 51)
    mockMathRandom.mockReturnValue(0.5);

    render(<RandomNumber />);
    
    const button = screen.getByRole('button', { name: /generar número aleatorio/i });
    
    // Hacer clic en el botón
    fireEvent.click(button);
    
    // Verificar que el número se muestra
    expect(screen.getByText(/tu número aleatorio es:/i)).toBeInTheDocument();
    expect(screen.getByText('51')).toBeInTheDocument();
    expect(screen.getByText('Rango: 1 - 100')).toBeInTheDocument();
  });

  test('generates different numbers on multiple clicks', () => {
    // Secuencia de valores mock para Math.random
    const mockValues = [0.1, 0.7, 0.3];
    mockMathRandom.mockImplementation(() => {
      const value = mockValues.shift() || 0.5;
      return value;
    });

    render(<RandomNumber />);
    
    const button = screen.getByRole('button', { name: /generar número aleatorio/i });
    
    // Primer clic - debería generar 11 (0.1 * 100 + 1 = 11)
    fireEvent.click(button);
    expect(screen.getByText('11')).toBeInTheDocument();
    
    // Segundo clic - debería generar 71 (0.7 * 100 + 1 = 71)
    fireEvent.click(button);
    expect(screen.getByText('71')).toBeInTheDocument();
    
    // Tercer clic - debería generar 31 (0.3 * 100 + 1 = 31)
    fireEvent.click(button);
    expect(screen.getByText('31')).toBeInTheDocument();
  });

  test('generated number is within range [1, 100]', () => {
    // Test para el límite inferior
    mockMathRandom.mockReturnValue(0);
    render(<RandomNumber />);
    fireEvent.click(screen.getByRole('button', { name: /generar número aleatorio/i }));
    expect(screen.getByText('1')).toBeInTheDocument();

    // Test para el límite superior
    mockMathRandom.mockReturnValue(0.999);
    fireEvent.click(screen.getByRole('button', { name: /generar número aleatorio/i }));
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  test('button has correct styling and attributes', () => {
    render(<RandomNumber />);
    
    const button = screen.getByRole('button', { name: /generar número aleatorio/i });
    
    // Verificar que el botón tiene las clases CSS esperadas
    expect(button).toHaveClass('bg-green-500');
    expect(button).toHaveClass('text-white');
    expect(button).toHaveClass('px-6');
    expect(button).toHaveClass('py-3');
  });

  test('number display section has correct styling', () => {
    mockMathRandom.mockReturnValue(0.5);
    
    render(<RandomNumber />);
    fireEvent.click(screen.getByRole('button', { name: /generar número aleatorio/i }));
    
    const numberSection = screen.getByText(/tu número aleatorio es:/i).parentElement;
    
    // Verificar estilos del contenedor del número
    expect(numberSection).toHaveClass('bg-blue-50');
    expect(numberSection).toHaveClass('border');
    expect(numberSection).toHaveClass('border-blue-200');
    expect(numberSection).toHaveClass('rounded-lg');
    
    // Verificar estilos del número
    const numberElement = screen.getByText('51');
    expect(numberElement).toHaveClass('font-bold');
    expect(numberElement).toHaveClass('text-2xl');
    expect(numberElement).toHaveClass('text-blue-600');
  });

  test('multiple interactions maintain component stability', () => {
    mockMathRandom.mockReturnValue(0.25);
    
    render(<RandomNumber />);
    const button = screen.getByRole('button', { name: /generar número aleatorio/i });
    
    // Hacer múltiples clics rápidos
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    
    // El componente debería mantenerse estable y mostrar el número
    expect(screen.getByText('26')).toBeInTheDocument(); // 0.25 * 100 + 1 = 26
    expect(screen.getByText(/tu número aleatorio es:/i)).toBeInTheDocument();
  });
});