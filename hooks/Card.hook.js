import { useState, useEffect } from "react";

const useCart = (id) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   async function fetchFromFirestore() {}

  //   fetchFromFirestore();
  // }, []);

  return {
    data,
    loading,
    error,
  };
};

const useCartOnce = (id) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log("once");

  useEffect(() => {}, []);

  return {
    data,
    loading,
    error,
  };
};

export { useCart, useCartOnce };
