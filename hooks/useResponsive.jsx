import React, { useEffect, useState } from "react";

const getDevice = (width) => {
  if (width < 768) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
};

const useResponsive = () => {
  const [device, setDevice] = useState(getDevice(window.innerWidth));
  useEffect(() => {
    const handleSize = () => {
      setDevice(getDevice(window.innerWidth));
    };

    handleSize();
    window.addEventListener("resize", handleSize);
    return () => window.removeEventListener("resize", handleSize);
  }, []);
  return device;
};

export default useResponsive;
