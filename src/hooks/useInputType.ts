import { useEffect, useState } from "react";

function useInputType(): "mouse" | "touch" {
  const [inputType, setInputType] = useState<"mouse" | "touch">("mouse");

  useEffect(() => {
    const handleMouse = () => setInputType("mouse");
    const handleTouch = () => setInputType("touch");

    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("touchstart", handleTouch);

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("touchstart", handleTouch);
    };
  }, []);

  return inputType;
}

export default useInputType;
