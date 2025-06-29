import { Link } from "react-router-dom";
import { GiSwapBag } from "react-icons/gi";
import { useCustomer } from "../context/CustomerContext";

interface HeaderProps {
  cartItemCount?: number;
}

export default function Header({ cartItemCount = 0 }: HeaderProps) {

  const { currentCustomer } = useCustomer();

  return (
    <header className="sticky min-h-auto min-w-screen bg-[#432e56]/90">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl ">
              The Potion Shop
            </Link>
            
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/products"
                
              >
                Produtos
              </Link>
              <Link
                to="/orders"
                
              >
                Pedidos
              </Link>
            </div>
          </div>

          {/* Right side - Cart */}
          <div className="flex items-center">
            { /* Display customer wallet */ }
            <div className="text-gray-400 hover:text-gray-500">
              <span className="font-bold pr-6">{currentCustomer?.wallet}G</span>
            </div>
            <Link
              to="/cart"
              className="p-1 rounded-b-md text-gray-400 hover:text-gray-500 relative"
            >
              <GiSwapBag className="h-6 w-6" aria-hidden="true" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#b98dc2] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}