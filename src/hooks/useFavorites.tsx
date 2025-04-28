
import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { toast } from "@/components/ui/sonner";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  
  // Load favorites from localStorage
  useEffect(() => {
    const loadFavorites = () => {
      try {
        const storedFavorites = localStorage.getItem(`clujCompass_favorites_${user?.id || 'guest'}`);
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error("Error loading favorites:", error);
        // Reset favorites if there's an error
        localStorage.removeItem(`clujCompass_favorites_${user?.id || 'guest'}`);
        setFavorites([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadFavorites();
  }, [user?.id]);
  
  // Save favorites to localStorage
  const saveFavorites = (updatedFavorites: string[]) => {
    try {
      localStorage.setItem(
        `clujCompass_favorites_${user?.id || 'guest'}`, 
        JSON.stringify(updatedFavorites)
      );
      setFavorites(updatedFavorites);
    } catch (error) {
      console.error("Error saving favorites:", error);
    }
  };
  
  const addFavorite = (locationId: string) => {
    if (!favorites.includes(locationId)) {
      const updatedFavorites = [...favorites, locationId];
      saveFavorites(updatedFavorites);
      toast.success("Added to favorites");
    }
  };
  
  const removeFavorite = (locationId: string) => {
    if (favorites.includes(locationId)) {
      const updatedFavorites = favorites.filter(id => id !== locationId);
      saveFavorites(updatedFavorites);
      toast.success("Removed from favorites");
    }
  };
  
  const toggleFavorite = (locationId: string) => {
    if (favorites.includes(locationId)) {
      removeFavorite(locationId);
    } else {
      addFavorite(locationId);
    }
  };
  
  const isFavorite = (locationId: string) => {
    return favorites.includes(locationId);
  };
  
  return {
    favorites,
    isLoading,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite
  };
};
