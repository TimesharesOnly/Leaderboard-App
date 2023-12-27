import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

// Function to assess password strength
export const getPasswordStrength = (password) => {
    const lengthCriteria = password.length >= 12;
    const numberCriteria = /[0-9]/.test(password);
    const upperCaseCriteria = /[A-Z]/.test(password);
    const lowerCaseCriteria = /[a-z]/.test(password);
    const specialCharCriteria = /[!@#$%^&*()]/.test(password);
  
    const metCriteria = [
      lengthCriteria,
      numberCriteria,
      upperCaseCriteria,
      lowerCaseCriteria,
      specialCharCriteria
    ].filter(Boolean).length;
  
    switch (metCriteria) {
      case 5: return 'Very Strong';
      case 4: return 'Strong';
      case 3: return 'Moderate';
      case 2: return 'Weak';
      default: return 'Very Weak';
    }
  };

  export const PasswordStrengthIndicator = ({ password }) => {
    const strength = getPasswordStrength(password);
    let variant;
    let now;
  
    switch (strength) {
      case 'Very Strong':
        variant = 'success';
        now = 100;
        break;
      case 'Strong':
        variant = 'info';
        now = 80;
        break;
      case 'Moderate':
        variant = 'warning';
        now = 60;
        break;
      case 'Weak':
        variant = 'danger';
        now = 40;
        break;
      default:
        variant = 'danger';
        now = 20;
    }
  
    return (
      <div>
        <ProgressBar now={now} variant={variant} />
        <span className={`text-${variant}`}>Strength: {strength}</span>
      </div>
    );
  };


  // Function to generate a random password
export const generateRandomPassword = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
  let password = '';
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};