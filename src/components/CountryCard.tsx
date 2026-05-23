import React from 'react';
import { type Country } from '.././hooks/useCountries';

interface CountryCardProps {
  country: Country;
  onSelect: (country: Country) => void;
}

export const CountryCard: React.FC<CountryCardProps> = ({ country, onSelect }) => {
  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
      <div 
        className="card h-100 shadow-sm border-0" 
        style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
        onClick={() => onSelect(country)}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        <img 
          src={country.flags.svg} 
          className="card-img-top mx-auto" 
          alt={`Bandera de ${country.name.common}`}
          style={{ height: '160px', objectFit: 'cover', width: '100%' }}
        />
        <div className="card-body d-flex flex-column justify-content-between">
          <div>
            <h5 className="card-title text-truncate mb-3" title={country.name.official}>
              {country.name.common}
            </h5>
            <p className="card-text mb-1 fs-6">
              <strong>Región:</strong> <span className="text-muted">{country.region}</span>
            </p>
            <p className="card-text fs-6">
              <strong>Población:</strong> <span className="text-muted">{country.population.toLocaleString()}</span>
            </p>
          </div>
          <button className="btn btn-outline-primary btn-sm mt-3 w-100">
            Ver Detalles
          </button>
        </div>
      </div>
    </div>
  );
};