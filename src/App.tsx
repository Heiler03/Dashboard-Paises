import { useState, useMemo } from 'react';
import { useCountries, type Country } from './hooks/useCountries';
import { CountryCard } from './components/CountryCard';
import { TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { CountryDetail } from './components/CountryDetail';

function App() {
  const { countries, loading, error } = useCountries();
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  // Filtrado en el cliente basado en nombre y región
  const filteredCountries = useMemo(() => {
    return countries.filter((country) => {
      const matchesSearch = country.name.common.toLowerCase().includes(search.toLowerCase()) ||
                            country.name.official.toLowerCase().includes(search.toLowerCase());
      const matchesRegion = region === '' || country.region.toLowerCase() === region.toLowerCase();
      return matchesSearch && matchesRegion;
    });
  }, [search, region, countries]);

  // Población máxima para la escala de progreso comparativa
  const maxPopulation = useMemo(() => {
    if (countries.length === 0) return 1;
    return Math.max(...countries.map(c => c.population));
  }, [countries]);

  if (loading) return <div className="container mt-5"><h3>Cargando indicadores globales...</h3></div>;
  if (error) return <div className="container mt-5"><div className="alert alert-danger">{error}</div></div>;

  return (
    <div className="container mt-4">
      <h1 className="text-primary mb-2">Dashboard Global de Países</h1>
      <p className="text-muted mb-4">Prueba Técnica - Heiler Garay</p>
      
      {/* Controles de búsqueda y filtrado */}
      <div className="row g-3 mb-4 align-items-center">
        <div className="col-12 col-md-6">
          <TextField 
            fullWidth 
            label="Buscar por nombre..." 
            variant="outlined" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-12 col-md-4">
          <FormControl fullWidth>
            <InputLabel id="region-select-label">Filtrar por Región</InputLabel>
            <Select
              labelId="region-select-label"
              value={region}
              label="Filtrar por Región"
              onChange={(e) => setRegion(e.target.value)}
            >
              <MenuItem value="">Todas las regiones</MenuItem>
              <MenuItem value="africa">África</MenuItem>
              <MenuItem value="americas">América</MenuItem>
              <MenuItem value="asia">Asia</MenuItem>
              <MenuItem value="europe">Europa</MenuItem>
              <MenuItem value="oceania">Oceanía</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="col-12 col-md-2 text-md-end">
          <span className="badge bg-secondary p-2 fs-6 w-100">
            Resultados: {filteredCountries.length}
          </span>
        </div>
      </div>

      {/* Grid Catálogo responsive de países */}
      <div className="row">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <CountryCard 
              key={country.cca3} 
              country={country} 
              onSelect={(c) => setSelectedCountry(c)}
            />
          ))
        ) : (
          <div className="col-12 text-center my-5">
            <h4 className="text-muted">No se encontraron países que coincidan con los filtros.</h4>
          </div>
        )}
      </div>

      {/* Panel lateral de información detallada */}
      <CountryDetail 
        country={selectedCountry} 
        onClose={() => setSelectedCountry(null)} 
        maxPopulation={maxPopulation}
      />
    </div>
  );
}

export default App;