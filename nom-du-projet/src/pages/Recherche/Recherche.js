import React, { useState, useEffect } from "react";
import Card from "../../components/card/Card";
import { useParams } from "react-router-dom";
import './Recherche.css';

function Recherche() {
  const { searchTerm } = useParams();
  const [scansData, setScansData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const scansPerPage = 8; // Nombre de scans à afficher par page

  useEffect(() => {
    const fetchScans = async () => {
      try {
        const response = await fetch(
          "https://kpiece.s3.eu-west-3.amazonaws.com/scans.json"
        );
        if (response.ok) {
          const scansData = await response.json();
          setCurrentPage(1); // Réinitialiser la page courante à 1
          setScansData(scansData);
        } else {
          console.error("Failed to fetch scans:", response.statusText);
        }
      } catch (error) {
        console.error("Failed to fetch scans:", error);
      }
    };
  
    fetchScans();
  }, []);
  

  const searchTermLowerCase = searchTerm.toLowerCase();

  const searchResults = scansData.filter((scan) =>
    scan.scan.toLowerCase().includes(searchTermLowerCase) ||
    scan.arc.toLowerCase().includes(searchTermLowerCase)
  );

  // Calcul du nombre total de pages
  const totalPages = Math.ceil(searchResults.length / scansPerPage);

  // Index de début et de fin des scans à afficher sur la page actuelle
  const startIndex = (currentPage - 1) * scansPerPage;
  const endIndex = startIndex + scansPerPage;

  // Tableau de scans à afficher sur la page actuelle
  const currentScans = searchResults.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  return (
    <div className="search-wrap">
      <h1>Résultats de recherche pour <span className="search-number"> "{searchTerm}" </span> </h1>

      <ul className="card-list">
        {currentScans.map((scan) => (
          <li key={scan.scan}>
            <Card
              scan={scan.scan}
              title={scan.title}
              pages={scan.pages}
            />
          </li>
        ))}
      </ul>
      <div className="Pagination">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            className={pageNumber === currentPage ? "active" : ""}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Recherche;
