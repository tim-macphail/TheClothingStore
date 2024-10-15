import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

const categories = [
  {
    name: 'CATEGORY 1',
    subcategories: ['Subcategory 1.1', 'Subcategory 1.2', 'Subcategory 1.3'],
  },
  {
    name: 'CATEGORY 2',
    subcategories: ['Subcategory 2.1', 'Subcategory 2.2', 'Subcategory 2.3'],
  },
  {
    name: 'CATEGORY 3',
    subcategories: ['Subcategory 3.1', 'Subcategory 3.2', 'Subcategory 3.3'],
  },
];

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            {categories.map((category, index) => (
              <div
                key={category.name}
                className="relative"
                onMouseEnter={() => setActiveDropdown(index)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 h-16">
                  {category.name}
                </button>
                {activeDropdown === index && (
                  <div className="absolute z-10 -ml-4 mt-0 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                      {category.subcategories.map((subcategory) => (
                        <Link
                          key={subcategory}
                          to={`/${category.name.toLowerCase()}/${subcategory.toLowerCase()}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          role="menuitem"
                        >
                          {subcategory}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center">
            <Link to="/cart" className="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-500">
              <ShoppingCart className="h-6 w-6" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;