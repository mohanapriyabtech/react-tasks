// SecondComponent.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SecondComponent from '../component/SecondComponent';

describe('SecondComponent', () => {
  it('renders the form and input fields correctly', () => {
    render(<SecondComponent />);

    // Check if the form and input fields are rendered
    expect(screen.getByText('SecondComponent')).toBeInTheDocument();
    expect(screen.getByLabelText('Field 1:')).toBeInTheDocument();
    expect(screen.getByLabelText('Field 2:')).toBeInTheDocument();
    expect(screen.getByLabelText('Field 3:')).toBeInTheDocument();
    expect(screen.getByLabelText('Field 4:')).toBeInTheDocument();
    expect(screen.getByLabelText('Field 5:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('updates the input values on change', () => {
    render(<SecondComponent />);

    // Find the input fields and simulate user typing
    const inputField1 = screen.getByLabelText('Field 1:');
    const inputField2 = screen.getByLabelText('Field 2:');
    const inputField3 = screen.getByLabelText('Field 3:');
    const inputField4 = screen.getByLabelText('Field 4:');
    const inputField5 = screen.getByLabelText('Field 5:');

    fireEvent.change(inputField1, { target: { value: 'value1' } });
    fireEvent.change(inputField2, { target: { value: 'value2' } });
    fireEvent.change(inputField3, { target: { value: 'value3' } });
    fireEvent.change(inputField4, { target: { value: 'value4' } });
    fireEvent.change(inputField5, { target: { value: 'value5' } });

    // Check if the input values have been updated
    expect(inputField1.value).toBe('value1');
    expect(inputField2.value).toBe('value2');
    expect(inputField3.value).toBe('value3');
    expect(inputField4.value).toBe('value4');
    expect(inputField5.value).toBe('value5');
  });

  it('submits the form and shows success message', () => {
    render(<SecondComponent />);

    // Find the input fields and simulate user typing
    fireEvent.change(screen.getByLabelText('Field 1:'), { target: { value: 'value1' } });
    fireEvent.change(screen.getByLabelText('Field 2:'), { target: { value: 'value2' } });
    fireEvent.change(screen.getByLabelText('Field 3:'), { target: { value: 'value3' } });
    fireEvent.change(screen.getByLabelText('Field 4:'), { target: { value: 'value4' } });
    fireEvent.change(screen.getByLabelText('Field 5:'), { target: { value: 'value5' } });

    // Find the submit button and click it
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    // Check if the success message is rendered
    expect(screen.getByText(/Form submitted with data:/)).toBeInTheDocument();
    expect(screen.getByText(/"field1":"value1"/)).toBeInTheDocument();
    expect(screen.getByText(/"field2":"value2"/)).toBeInTheDocument();
    expect(screen.getByText(/"field3":"value3"/)).toBeInTheDocument();
    expect(screen.getByText(/"field4":"value4"/)).toBeInTheDocument();
    expect(screen.getByText(/"field5":"value5"/)).toBeInTheDocument();
  });

  it('does not show success message initially', () => {
    render(<SecondComponent />);

    // Check if the success message is not rendered initially
    expect(screen.queryByText(/Form submitted with data:/)).not.toBeInTheDocument();
  });
});
