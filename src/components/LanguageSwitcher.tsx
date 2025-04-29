
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { languages } from "lucide-react";

interface LanguageSwitcherProps {
  className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className }) => {
  const { language, setLanguage, isRomanian } = useLanguage();
  
  const toggleLanguage = () => {
    setLanguage(isRomanian ? "en" : "ro");
  };
  
  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={toggleLanguage} 
      className={className}
      title={isRomanian ? "Switch to English" : "Schimbă în Română"}
    >
      <languages className="h-4 w-4 mr-1" />
      {isRomanian ? "RO" : "EN"}
    </Button>
  );
};

export default LanguageSwitcher;
