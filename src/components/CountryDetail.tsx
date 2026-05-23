import React from 'react';
import { Drawer, Box, Typography, IconButton, LinearProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { type Country } from '../hooks/useCountries';

interface CountryDetailProps {
  country: Country | null;
  onClose: () => void;
  maxPopulation: number;
}

export const CountryDetail: React.FC<CountryDetailProps> = ({ country, onClose, maxPopulation }) => {
  // Si no hay país seleccionado, no renderizamos nada
  if (!country) return null;

  // Calculamos el porcentaje de población frente al país más poblado
  const populationPercentage = maxPopulation > 0 ? (country.population / maxPopulation) * 100 : 0;

  // Formatear las monedas para mostrarlas ordenadas
  const currencies = country.currencies
    ? Object.values(country.currencies).map((c) => `${c.name} (${c.symbol})`).join(', ')
    : 'No registra';

  // Formatear los idiomas
  const languages = country.languages
    ? Object.values(country.languages).join(', ')
    : 'No registra';

  return (
    <Drawer anchor="right" open={!!country} onClose={onClose}>
      <Box sx={{ width: { xs: '100vw', sm: 400 }, p: 3, position: 'relative' }}>
        
        {/* Botón para cerrar */}
        <IconButton 
          onClick={onClose} 
          sx={{ position: 'absolute', top: 12, right: 12 }}
          aria-label="Cerrar detalles"
        >
          <CloseIcon />
        </IconButton>

        {/* Bandera y Nombre */}
        <Box sx={{ mt: 2, textAlign: 'center', mb: 3 }}>
          <img 
            src={country.flags.svg} 
            alt={`Bandera de ${country.name.common}`} 
            style={{ width: '100%', height: 'auto', borderRadius: '4px', boxShadow: '0px 2px 8px rgba(0,0,0,0.1)' }}
          />
          <Typography variant="h4" sx={{ mt: 2, fontWeight: 'bold' }}>
            {country.name.common}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {country.name.official}
          </Typography>
        </Box>

        <hr />

        {/* Información Avanzada */}
        <Box sx={{ my: 3 }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Capital:</strong> {country.capital ? country.capital.join(', ') : 'No tiene'}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Moneda(s):</strong> {currencies}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Idioma(s):</strong> {languages}
          </Typography>
        </Box>

        <hr />

        {/* Métrica comparativa de población */}
        <Box sx={{ my: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
            Proporción de Población Global:
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Representa el <strong>{populationPercentage.toFixed(3)}%</strong> respecto al país más poblado del mundo.
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={populationPercentage > 0.1 ? populationPercentage : 1} // Mínimo visible para países pequeños
            sx={{ height: 10, borderRadius: 5 }}
          />
        </Box>

        <hr />

        {/* Países Fronterizos */}
        <Box sx={{ my: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
            Códigos de Países Fronterizos:
          </Typography>
          {country.borders && country.borders.length > 0 ? (
            <div className="d-flex flex-wrap gap-2 mt-2">
              {country.borders.map((border) => (
                <span key={border} className="badge bg-light text-dark border p-2">
                  {border}
                </span>
              ))}
            </div>
          ) : (
            <Typography variant="body2" color="text.secondary">
              Este país no tiene fronteras terrestres (es una isla o territorio aislado).
            </Typography>
          )}
        </Box>

      </Box>
    </Drawer>
  );
};