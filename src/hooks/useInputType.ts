import { useEffect, useState } from "react";

function useInputType(): "mouse" | "touch" {
  const [inputType, setInputType] = useState<"mouse" | "touch">("mouse");

  useEffect(() => {
    const handleInputTypeChange = (e: MediaQueryListEvent) => {
      setInputType(e.matches ? "mouse" : "touch");
    };

    const mediaQuery = window.matchMedia("(hover: hover)");

    // Set initial input type based on media query
    setInputType(mediaQuery.matches ? "mouse" : "touch");

    // Add event listener for media query changes
    mediaQuery.addEventListener("change", handleInputTypeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleInputTypeChange);
    };
  }, []);

  return inputType;
}

export default useInputType;
