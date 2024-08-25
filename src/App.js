import "./style/all.css";
import "./style/App.css";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function App() {
  let navigator = useNavigate();
  const [countries, setCountries] = useState([]);
  const [preventCountries, setPreventCountries] = useState([]);
  const get_countries = async () => {
    let res = await fetch("https://restcountries.com/v3.1/all");
    let data = await res.json();
    setCountries(
      data.filter((c) => {
        return c.name.common !== "Israel";
      })
    );
    setPreventCountries(
      data.filter((c) => {
        return c.name.common !== "Israel";
      })
    );
  };
  useEffect(() => {
    get_countries();
  }, []);
  return (
    <>
      <Header />
      <div className="content">
        <div className="search-filter">
          <div className="search">
            <i className="fa fa-search"></i>
            <input
              onChange={(e) => {
                setPreventCountries(
                  countries.filter((country) => {
                    return country.name.common
                      .toLowerCase()
                      .includes(e.target.value.toLowerCase());
                  })
                );
              }}
              type="search"
              placeholder="Search for a country..."
            />
          </div>
          <div className="filter">
            <div className="Region">
              <div
                onClick={() => {
                  let i = document.querySelector(
                    ".content .search-filter .filter .choose-Region i"
                  );
                  if (i.className === "fa-solid fa-angle-down") {
                    i.className = "fa-solid fa-angle-up";
                    let region_list = document.querySelector(
                      ".content .search-filter .filter ul"
                    );
                    region_list.style.cssText = `z-index:-1;transform:translateY(10px);width:${
                      document.querySelector(
                        ".content .search-filter .filter .choose-Region"
                      ).style.width
                    };`;
                  } else {
                    i.className = "fa-solid fa-angle-down";
                    let region_list = document.querySelector(
                      ".content .search-filter .filter ul"
                    );
                    region_list.style.cssText = `z-index:1;transform:translateY(6px);width:${
                      document.querySelector(
                        ".content .search-filter .filter .choose-Region"
                      ).style.width
                    };`;
                  }
                }}
                className="choose-Region"
              >
                <h4>Filter by Region</h4>
                <i className="fa-solid fa-angle-up"></i>
              </div>
              <ul>
                <li
                  onClick={(e) => {
                    setPreventCountries(
                      countries.filter((country) => {
                        return country.region === e.target.textContent;
                      })
                    );
                  }}
                >
                  Africa
                </li>
                <li
                  onClick={(e) => {
                    setPreventCountries(
                      countries.filter((country) => {
                        return country.region === "Americas";
                      })
                    );
                  }}
                >
                  America
                </li>
                <li
                  onClick={(e) => {
                    setPreventCountries(
                      countries.filter((country) => {
                        return country.region === e.target.textContent;
                      })
                    );
                  }}
                >
                  Asia
                </li>
                <li
                  onClick={(e) => {
                    setPreventCountries(
                      countries.filter((country) => {
                        return country.region === e.target.textContent;
                      })
                    );
                  }}
                >
                  Europe
                </li>
                <li
                  onClick={(e) => {
                    setPreventCountries(
                      countries.filter((country) => {
                        return country.region === e.target.textContent;
                      })
                    );
                  }}
                >
                  Oceania
                </li>
                {/* New Feature */}
                <li onClick={get_countries}>All</li>
              </ul>
            </div>
          </div>
        </div>
        {/* New Feature */}
        <div className="num-countries">
          <h3>{preventCountries.length} countries found</h3>
        </div>
        <div className="countries">
          {preventCountries.map((country, index) => {
            return (
              <div
                onClick={() => {
                  navigator(`/${country.name.common}`);
                }}
                key={index}
                className="country"
              >
                <img src={country.flags.png} alt="flag-country" />
                <div className="text">
                  <h3 className="name">{country.name.common}</h3>
                  <span className="population">
                    Population:{" "}
                    <span>{country.population.toLocaleString()}</span>
                  </span>
                  <span className="region">
                    Region: <span>{country.region}</span>
                  </span>
                  <span className="capital">
                    Capital: <span>{country.capital}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
