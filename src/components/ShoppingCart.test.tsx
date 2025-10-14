// src/components/ShoppingCart.simple.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ShoppingCart from './ShoppingCart';

describe('ShoppingCart Debug Tests', () => {
  test('debug - check what renders', () => {
    render(<ShoppingCart />);

    // Imprimir el contenido del componente para debugging
    screen.debug();

    // Test muy básico
    expect(screen.getByText('Carrito de Compras')).toBeInTheDocument();
  });

  test('debug - add one item', () => {
    render(<ShoppingCart />);

    // Encontrar el primer botón "Agregar"
    const addButtons = screen.getAllByText('Agregar');
    console.log('Número de botones Agregar:', addButtons.length);

    fireEvent.click(addButtons[0]);

    // Verificar que algo cambió
    const emptyCart = screen.queryByText('El carrito está vacío');
    console.log('¿Carrito vacío existe?:', !!emptyCart);

    // Test simple
    expect(emptyCart).not.toBeInTheDocument();
  });
});