import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SimpleForm from '../component/SimpleForm'

describe('SimpleForm', () => {
  it('renders the form and input correctly', () => {
    render(<SimpleForm />);

    // Check if the form and input are rendered
    expect(screen.getByText('Simple Form')).toBeInTheDocument();
    expect(screen.getByLabelText('Enter something:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('updates the input value on change', () => {
    render(<SimpleForm />);

    // Find the input field and simulate a user typing
    const inputElement = screen.getByLabelText('Enter something:');
    fireEvent.change(inputElement, { target: { value: 'test input' } });

    // Check if the input value has been updated
    expect(inputElement.value).toBe('test input');
  });

  it('submits the form and shows success message', () => {
    render(<SimpleForm />);

    // Find the input field and simulate a user typing
    const inputElement = screen.getByLabelText('Enter something:');
    fireEvent.change(inputElement, { target: { value: 'test input' } });

    // Find the submit button and click it
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    fireEvent.click(submitButton);

    // Check if the success message is rendered
    expect(screen.getByText(/Form submitted with data:/)).toBeInTheDocument();
    expect(screen.getByText(/"inputValue":"test input"/)).toBeInTheDocument();
  });

  it('does not show success message initially', () => {
    render(<SimpleForm />);

    // Check if the success message is not rendered initially
    expect(screen.queryByText(/Form submitted with data:/)).not.toBeInTheDocument();
  });
});
