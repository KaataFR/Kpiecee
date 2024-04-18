import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/img/LOGO-KPIECE.png";
import "./Header.css";

function Header() {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  // Fonction de gestion de la saisie de recherche
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  // Fonction de gestion de la soumission de recherche
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchValue.trim() !== "") {
      navigate(`/recherche/${searchValue}`);
    }
  };
  

  return (
    <header>
      <Link to="./" className="logo-link">
        <img src={logo} alt="logo kpiece" />
      </Link>

      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchValue}
          onChange={handleSearchChange}
          placeholder="Rechercher un scan..."
        />
        <button type="submit"><i class="fa-solid fa-magnifying-glass"></i>  </button>
      </form>
    </header>
  );
}

export default Header;
