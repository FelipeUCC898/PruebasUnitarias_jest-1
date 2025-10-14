// src/components/RegisterForm.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RegisterForm from './RegisterForm';

describe('RegisterForm Component', () => {
  test('renders correctly with initial state', () => {
    render(<RegisterForm />);

    // Verificar que el título se renderiza
    expect(screen.getByText('Formulario de Registro')).toBeInTheDocument();

    // Verificar que los inputs se renderizan
    expect(screen.getByPlaceholderText('Ingresa tu nombre')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ingresa tu email')).toBeInTheDocument();

    // Verificar que el botón está presente pero deshabilitado
    const registerButton = screen.getByRole('button', { name: /registrar/i });
    expect(registerButton).toBeInTheDocument();
    expect(registerButton).toBeDisabled();
  });

  test('button is disabled when form is empty', () => {
    render(<RegisterForm />);

    const registerButton = screen.getByRole('button', { name: /registrar/i });
    expect(registerButton).toBeDisabled();
  });

  test('button is disabled when only name is filled', () => {
    render(<RegisterForm />);

    const nameInput = screen.getByPlaceholderText('Ingresa tu nombre');
    fireEvent.change(nameInput, { target: { value: 'Juan Pérez' } });

    const registerButton = screen.getByRole('button', { name: /registrar/i });
    expect(registerButton).toBeDisabled();
  });

  test('button is disabled when only email is filled', () => {
    render(<RegisterForm />);

    const emailInput = screen.getByPlaceholderText('Ingresa tu email');
    fireEvent.change(emailInput, { target: { value: 'juan@example.com' } });

    const registerButton = screen.getByRole('button', { name: /registrar/i });
    expect(registerButton).toBeDisabled();
  });

  test('button is enabled when both fields are filled', () => {
    render(<RegisterForm />);

    const nameInput = screen.getByPlaceholderText('Ingresa tu nombre');
    const emailInput = screen.getByPlaceholderText('Ingresa tu email');

    fireEvent.change(nameInput, { target: { value: 'Juan Pérez' } });
    fireEvent.change(emailInput, { target: { value: 'juan@example.com' } });

    const registerButton = screen.getByRole('button', { name: /registrar/i });
    expect(registerButton).not.toBeDisabled();
  });

  test('updates name field correctly', () => {
    render(<RegisterForm />);

    const nameInput = screen.getByPlaceholderText('Ingresa tu nombre') as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: 'María García' } });

    expect(nameInput.value).toBe('María García');
  });

  test('updates email field correctly', () => {
    render(<RegisterForm />);

    const emailInput = screen.getByPlaceholderText('Ingresa tu email') as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: 'maria@example.com' } });

    expect(emailInput.value).toBe('maria@example.com');
  });

  test('submits form and shows success message', () => {
    render(<RegisterForm />);

    // Llenar el formulario
    const nameInput = screen.getByPlaceholderText('Ingresa tu nombre');
    const emailInput = screen.getByPlaceholderText('Ingresa tu email');

    fireEvent.change(nameInput, { target: { value: 'Carlos López' } });
    fireEvent.change(emailInput, { target: { value: 'carlos@example.com' } });

    // Enviar el formulario
    const registerButton = screen.getByRole('button', { name: /registrar/i });
    fireEvent.click(registerButton);

    // Verificar que se muestra el mensaje de éxito
    expect(screen.getByText('¡Registro Exitoso!')).toBeInTheDocument();
    expect(screen.getByText('Tu información ha sido registrada correctamente.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /registrar otra persona/i })).toBeInTheDocument();
  });

  test('clears form after submission and reset', () => {
    render(<RegisterForm />);

    const nameInput = screen.getByPlaceholderText('Ingresa tu nombre') as HTMLInputElement;
    const emailInput = screen.getByPlaceholderText('Ingresa tu email') as HTMLInputElement;

    // Llenar y enviar el formulario
    fireEvent.change(nameInput, { target: { value: 'Ana Martínez' } });
    fireEvent.change(emailInput, { target: { value: 'ana@example.com' } });

    fireEvent.click(screen.getByRole('button', { name: /registrar/i }));

    // Volver al formulario
    fireEvent.click(screen.getByRole('button', { name: /registrar otra persona/i }));

    // Verificar que los campos están vacíos
    const newNameInput = screen.getByPlaceholderText('Ingresa tu nombre') as HTMLInputElement;
    const newEmailInput = screen.getByPlaceholderText('Ingresa tu email') as HTMLInputElement;

    expect(newNameInput.value).toBe('');
    expect(newEmailInput.value).toBe('');

    // Verificar que el botón está deshabilitado
    expect(screen.getByRole('button', { name: /registrar/i })).toBeDisabled();
  });

  test('form validation ignores whitespace', () => {
    render(<RegisterForm />);

    const nameInput = screen.getByPlaceholderText('Ingresa tu nombre');
    const emailInput = screen.getByPlaceholderText('Ingresa tu email');
    const registerButton = screen.getByRole('button', { name: /registrar/i });

    // Llenar con espacios en blanco
    fireEvent.change(nameInput, { target: { value: '   ' } });
    fireEvent.change(emailInput, { target: { value: '   ' } });

    expect(registerButton).toBeDisabled();

    // Llenar con espacios pero con contenido válido
    fireEvent.change(nameInput, { target: { value: '  Juan  ' } });
    fireEvent.change(emailInput, { target: { value: '  juan@example.com  ' } });

    expect(registerButton).not.toBeDisabled();
  });
});

// Versión simplificada para debugging
describe('RegisterForm Basic Tests', () => {
  test('basic form functionality', () => {
    render(<RegisterForm />);

    // Verificar que el formulario se renderiza
    expect(screen.getByText('Formulario de Registro')).toBeInTheDocument();

    // Verificar que el botón está deshabilitado inicialmente
    expect(screen.getByRole('button', { name: /registrar/i })).toBeDisabled();

    // Llenar los campos
    const nameInput = screen.getByPlaceholderText('Ingresa tu nombre');
    const emailInput = screen.getByPlaceholderText('Ingresa tu email');

    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    // Verificar que el botón se habilita
    expect(screen.getByRole('button', { name: /registrar/i })).not.toBeDisabled();

    // Enviar el formulario
    fireEvent.click(screen.getByRole('button', { name: /registrar/i }));

    // Verificar que se muestra el mensaje de éxito
    expect(screen.getByText('¡Registro Exitoso!')).toBeInTheDocument();
  });

  test('form reset functionality', () => {
    render(<RegisterForm />);

    // Llenar y enviar formulario
    const nameInput = screen.getByPlaceholderText('Ingresa tu nombre');
    const emailInput = screen.getByPlaceholderText('Ingresa tu email');

    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /registrar/i }));

    // Resetear formulario
    fireEvent.click(screen.getByRole('button', { name: /registrar otra persona/i }));

    // Verificar que volvemos al formulario vacío
    expect(screen.getByText('Formulario de Registro')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /registrar/i })).toBeDisabled();
  });
});