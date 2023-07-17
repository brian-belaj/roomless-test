import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

function App() {
  const [ads, setAds] = useState([]);
  const [fromPrice, setFromPrice] = useState("");
  const [toPrice, setToPrice] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    fetchAds();
  }, [fromPrice, toPrice, pageNumber]);

  const fetchAds = async () => {
    try {
      const response = await axios.post('https://apigateway-dev.roomlessrent.com/listing-svc/listing/search', {
        listingTypes: [],
        services: [],
        fromPrice: fromPrice || 0,
        toPrice: toPrice || 300000,
        sortField: 'RELEVANCE',
        sortOrder: 'ASC',
        lang: 'it',
        pageNumber,
        pageSize: 60,
        radius: 20,
        placeSlang: 'citta-milano',
        latitude: 45.4640998840332,
        longitude: 9.189740180969238,
      });
  
      setAds(response.data.listings);
    } catch (error) {
      console.error(error);
    }
  };
  
  

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    setPageNumber(1); // Reset page number to 1 when applying filters
  };

  return (
    <div>
      <h1>Annunci Immobiliari</h1>
      <form onSubmit={handleFilterSubmit}>
        {/* ... campi di input e pulsante di filtro ... */}
      </form>
  
      <h2>Elenco annunci</h2>
      {ads && ads.map((ad) => (
        <div key={ad.id}>
          <img src={ad.imageUrl} alt="Annuncio" />
          <h3>{ad.title}</h3>
          <p>Prezzo: {ad.price}</p>
          <p>Indirizzo: {ad.address}</p>
        </div>
      ))}
    </div>
  );
  
}

export default App;
