import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { addCustomer, getCustomerByName } from '../api/customer';
import { useCustomer } from '../context/CustomerContext';

export default function Login() {
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { currentCustomer, loginCustomer, logoutCustomer } = useCustomer();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!nickname.trim()) {
      setError('A nickname is required!');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const existingCustomer = await getCustomerByName(nickname);
      
      if (existingCustomer) {
        loginCustomer(existingCustomer);
        navigate('/products');
        return;
      }

      try {
        const newCustomer = await addCustomer(nickname);
        
        if (!newCustomer?.customer_name) {
          throw new Error("Invalid customer data received");
        }

        loginCustomer(newCustomer);
        navigate('/products');
      } catch (createError) {
        console.error('Customer creation failed:', createError);
        setError('Failed to create customer. Please try a different name.');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      setError(error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logoutCustomer();
    setNickname('');
  };

  if (currentCustomer) {
    return (
      <div className="min-h-screen min-w-screen flex flex-col items-center justify-center p-4 bg-[#432e56] text-[#b98dc2] font-mono pixelated">
        <div className="max-w-md w-full border-4 border-[#b98dc2] p-8 shadow-[8px_8px_0_#b98dc2] bg-[#432e56]/90 text-center">
          <h1 className="text-4xl mb-6 text-shadow-lg shadow-black/50">
            WELCOME BACK, {currentCustomer.customer_name.toUpperCase()}!
          </h1>
          <button
            onClick={handleLogout}
            className="text-2xl px-6 py-3 border-4 border-[#f47d7d] shadow-[4px_4px_0_#f47d7d] 
            hover:bg-[#f47d7d] hover:text-[#432e56] hover:shadow-[2px_2px_0_#f47d7d] 
            hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center"
          >
            CHANGE CUSTOMER <ArrowLeftIcon className="h-6 w-6 ml-2" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen min-w-screen bg-[#432e56] text-[#b98dc2] flex flex-col items-center justify-center p-4 font-mono pixelated">
      <div className="max-w-md w-full border-4 border-[#b98dc2] p-8 shadow-[8px_8px_0_#b98dc2] bg-[#432e56]/90">
        <h1 className="text-4xl mb-8 text-center text-shadow-lg shadow-black/50">
          THE POTION SHOP 
        </h1>
        
        <div className="space-y-6">
          <div>
            <label htmlFor="nickname" className="block text-2xl mb-2">
              Enter your name:
            </label>
            <input
              type="text"
              id="nickname"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
                setError('');
              }}
              className="w-full bg-[#432e56] border-4 border-[#b98dc2] px-4 py-3 text-2xl 
              focus:outline-none focus:ring-2 focus:ring-[#d4b3da] focus:border-transparent"
              placeholder="Your name..."
              maxLength={20}
            />
            {error && <p className="text-red-400 text-xl mt-2">{error}</p>}
          </div>
          
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className={`w-full text-2xl px-6 py-3 border-4 border-[#b98dc2] shadow-[4px_4px_0_#b98dc2] 
            hover:bg-[#b98dc2] hover:text-[#432e56] hover:shadow-[2px_2px_0_#b98dc2] 
            hover:translate-x-[2px] hover:translate-y-[2px] transition-all
            ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'PROCESSING...' : 'ENTER SHOP'}
          </button>
        </div>
      </div>
    </div>
  );
}