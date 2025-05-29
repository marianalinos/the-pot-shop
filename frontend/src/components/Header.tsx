import { Link } from "react-router-dom";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

interface HeaderProps {
  cartItemCount?: number;
}

export default function Header({ cartItemCount = 0 }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-900">
              The Pot
            </Link>
            
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/products"
                className="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-normal"
              >
                Products
              </Link>
              <Link
                to="/orders"
                className="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-normal"
              >
                Orders
              </Link>
            </div>
          </div>

          {/* Right side - Cart */}
          <div className="flex items-center">
            <Link
              to="/cart"
              className="p-1 rounded-full text-gray-400 hover:text-gray-500 relative"
            >
              <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
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