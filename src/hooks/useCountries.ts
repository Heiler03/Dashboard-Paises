import { useState, useEffect } from 'react';
import { countriesApi } from '../services/api';


export interface Country {
  name: { common: string; official: string };
  cca3: string;
  flags: { svg: string; png: string };
  region: string;
  population: number;
  capital?: string[];
  currencies?: { [key: string]: { name: string; symbol: string } };
  languages?: { [key: string]: string };
  borders?: string[];
}

export const useCountries = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        // Traemos todos los países de una sola vez para filtrar en el cliente
        const response = await countriesApi.get<Country[]>('/all?fields=name,cca3,flags,region,population,capital,currencies,languages,borders');
        setCountries(response.data);
        setError(null);
      } catch (err) {
        setError('Error al cargar los países. Intenta de nuevo.');
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return { countries, loading, error };
};