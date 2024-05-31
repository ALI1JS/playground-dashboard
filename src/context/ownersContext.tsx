// src/context/OwnersContext.tsx
import React, { createContext, useState, ReactNode } from 'react';

// Define the Owner interface
interface Owner {
  id: string;
  name: string;
  email: string,
  phone: string,
  location: string
  // Add additional fields as needed
}

// Define the context type
interface OwnersContextType {
  owners: Owner[];
  displayedOwners: Owner[];
  currentPage: number;
  latestTenOwners: Owner[],
  loadMoreOwners: () => void;
  storeOwners: (newOwners: Owner[]) => void;
}

// Default values for the context
const defaultValue: OwnersContextType = {
  owners: [],
  displayedOwners: [],
  latestTenOwners: [],
  currentPage: 1,
  loadMoreOwners: () => {},
  storeOwners: () => {},
};

// Create the context with default values and types
const OwnersContext = createContext<OwnersContextType>(defaultValue);

// Define the provider component's props
interface OwnersProviderProps {
  children: ReactNode; // ReactNode allows for child components
}

// Provider component to manage state
const OwnersProvider = ({ children }: OwnersProviderProps) => {
  const [owners, setOwners] = useState<Owner[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [displayedOwners, setDisplayedOwners] = useState<Owner[]>([]);
  const [latestTenOwners, setlatestTenOwners] = useState<Owner[]>([]);

  // Function to store owners in the state
  const storeOwners = (newOwners: Owner[]) => {
    setOwners(newOwners);

    // Initialize displayedOwners with the first 10 owners
    if (newOwners.length > 0) {
      setDisplayedOwners(newOwners.slice(0, 10));
      setCurrentPage(1); // Reset current page
      setlatestTenOwners(newOwners.slice(0,10));
    }
  };

  // Function to load more owners
  const loadMoreOwners = () => {
    const newPage = currentPage + 1;
    const start = (newPage - 1) * 10;
    const newOwners = owners.slice(start, start + 10);

    setDisplayedOwners((prev) => [...prev, ...newOwners]); // Add new owners to displayed
    setCurrentPage(newPage); // Update current page
  };

  return (
    <OwnersContext.Provider
      value={{
        owners,
        displayedOwners,
        latestTenOwners,
        currentPage,
        loadMoreOwners,
        storeOwners,
      }}
    >
      {children}
    </OwnersContext.Provider>
  );
};

export { OwnersContext, OwnersProvider };
