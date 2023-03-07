import { useEffect } from "react";
import { UseApp } from "./UseApp";

export function UseDataFromStorage () {
  const {
    setQuarters,
    setHouseType,
  } = UseApp()

  useEffect(() => {
    const savedQuarters = localStorage.getItem('quarters');
    const savedHouseType = localStorage.getItem('house-type');
    if (savedQuarters && savedHouseType ) {
      setQuarters(JSON.parse(savedQuarters));
      setHouseType(savedHouseType)
    }
  }, []);
}
