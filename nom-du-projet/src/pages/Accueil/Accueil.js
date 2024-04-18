import React, { useState, useEffect } from "react";
import "./Accueil.css";
import Card from "../../components/card/Card";
// Supprimer l'importation des données de scans locales
// import scans from "../../assets/data/scans.json";

function Accueil() {
  const [currentPage, setCurrentPage] = useState(1);
  const scansPerPage = 8; // Nombre de scans à afficher par page
  // Utiliser un état local pour stocker les données de scans
  const [scans, setScans] = useState([]);

 // Ajouter un effet pour récupérer les données de scans à partir du compartiment S3
 useEffect(() => {
  const fetchScans = async () => {
    try {
      const response = await fetch(
        "https://kpiece.s3.eu-west-3.amazonaws.com/scans.json"
      );
      if (response.ok) {
        const scans = await response.json();
        setScans(scans); // Mettre à jour l'état local avec les données de scans
      } else {
        console.error("Failed to fetch scans:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to fetch scans:", error);
    }
  };

  fetchScans();
}, []);


  // Calcul du nombre total de pages
  const totalPages = Math.ceil(scans.length / scansPerPage);

  // Index de début et de fin des scans à afficher sur la page actuelle
  const startIndex = (currentPage - 1) * scansPerPage;
  const endIndex = startIndex + scansPerPage;

  // Tableau de scans à afficher sur la page actuelle
  // Tableau de scans à afficher sur la page actuelle
  const currentScans = scans.slice(startIndex, endIndex);

  useEffect(() => {
    // Réinitialiser la page courante lorsque scans est modifié
    setCurrentPage(1);
  }, [scans]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  const handleScrollToTop = () => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  return (
    <div className="Accueil">
      <h2> Dernières sorties </h2>
      <button className="ScrollToTopButton" onClick={handleScrollToTop}>
        Revenir en haut
      </button>
      <ul>
        {currentScans.map((scan, index) => (
          <li key={scan.scan}>
            <Card
              scan={scan.scan}
              title={scan.title}
              pages={scan.pages}
              isNew={currentPage === 1 && index === 0} // Vérifier si le scan est le premier de la première page
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

export default Accueil;
