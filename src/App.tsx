import React from 'react';
import { Toaster } from 'react-hot-toast';
import RegistrationForm from './components/RegistrationForm';

function App() {
  return (
    <div className="min-h-screen bg-tech-dark text-gray-100 py-12">
      <Toaster position="top-right" />
      <div className="container mx-auto px-4">
        <RegistrationForm />
      </div>
    </div>
  );
}

export default App;