import React, {
    createContext,
    useState,
    useCallback,
    useEffect,
    ReactNode,
  } from "react";
  
  // Define the shape of the context
  interface LoaderContextType {
    loading: boolean;
    showLoader: () => void;
    hideLoader: () => void;
  }
  
  // Create the context with an initial undefined value
  export const LoaderContext = createContext<LoaderContextType | undefined>(
    undefined
  );
  
  interface LoaderProviderProps {
    children: ReactNode;
  }
  
  export const LoaderProvider: React.FC<LoaderProviderProps> = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [timer, setTimer] = useState<number | null>(null);
  
    const showLoader = useCallback(() => {
      // Clear the previous timer if it exists
      if (timer) {
        clearTimeout(timer);
      }
      // Set loading to true
      setLoading(true);
      // Set a new timer to hide the loader after 30 seconds
      const newTimer = setTimeout(() => {
        setLoading(false);
        setTimer(null); // Reset the timer state after it finishes
      }, 30000);
      setTimer(newTimer);
    }, [timer]);
  
    const hideLoader = useCallback(() => {
      if (timer) {
        clearTimeout(timer);
        setTimer(null); // Reset the timer state
      }
      setLoading(false);
    }, [timer]);
  
    // Cleanup the timer when the component unmounts
    useEffect(() => {
      return () => {
        if (timer) {
          clearTimeout(timer);
        }
      };
    }, [timer]);
  
    return (
      <LoaderContext.Provider value={{ loading, showLoader, hideLoader }}>
        {children}
      </LoaderContext.Provider>
    );
  };
  