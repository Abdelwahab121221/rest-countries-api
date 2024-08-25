import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import { useParams, useNavigate } from "react-router-dom";

function Country() {
  let { Country } = useParams();
  let navigator = useNavigate();
  const [country_data, setCountry_data] = useState(null);
  const get_data_code = async (e) => {
    let res = await fetch(
      `https://restcountries.com/v3.1/alpha/${e.target.textContent}`
    );
    let data = await res.json();
    return data[0];
  };
  useEffect(() => {
    const get_country_data = async () => {
      if (Country !== "Israel") {
        try {
          let res = await fetch(
            `https://restcountries.com/v3.1/name/${Country}`
          );
          if (!res.ok) {
            throw new Error("Country not found");
          }
          let data = await res.json();
          setCountry_data(data[0]);
        } catch (error) {
          navigator("/error");
        }
      } else {
        navigator("/error");
      }
    };
    get_country_data();
  }, [navigator]);

  return (
    <>
      <Header />
      <div className="Country">
        <button
          onClick={() => {
            navigator("/");
          }}
          className="back"
        >
          <i className="fa-solid fa-arrow-left-long"></i> Back
        </button>
        <div className="country-data">
          <div className="flag">
            {country_data && (
              <img src={country_data.flags.svg} alt={country_data.flags.alt} />
            )}
          </div>
          <div className="text">
            {country_data && (
              <>
                <h1>{country_data.name.common}</h1>
                <div className="details">
                  <div className="first">
                    <span>
                      Native Name:{" "}
                      <span>
                        {
                          country_data.name.nativeName[
                            Object.keys(country_data.name.nativeName).at(-1)
                          ].common
                        }
                      </span>
                    </span>
                    <span>
                      Population:{" "}
                      <span>{country_data.population.toLocaleString()}</span>
                    </span>
                    <span>
                      Region: <span>{country_data.region}</span>
                    </span>
                    <span>
                      Sub Region: <span>{country_data.subregion}</span>
                    </span>
                    <span>
                      Capital: <span>{country_data.capital}</span>
                    </span>
                  </div>
                  <div className="last">
                    <span>
                      Top Level Domain: <span>{country_data.tld[0]}</span>
                    </span>
                    <span>
                      Currencies:{" "}
                      {Object.keys(country_data.currencies).map(
                        (currency, index) => {
                          return (
                            <span key={index}>
                              {country_data.currencies[currency].name}
                            </span>
                          );
                        }
                      )}
                    </span>
                    <span>
                      Languages:{" "}
                      {Object.keys(country_data.languages).map(
                        (language, index) => {
                          return (
                            <span key={index}>
                              {country_data.languages[language]}
                            </span>
                          );
                        }
                      )}
                    </span>
                  </div>
                </div>
              </>
            )}
            <div className="borders">
              {country_data && country_data.borders !== undefined ? (
                <span>
                  Borders Countries:{" "}
                  {country_data.borders.map((border, index) => {
                    return (
                      <span
                        onClick={(e) => {
                          get_data_code(e).then((country_data) => {
                            window.location.href =
                              window.location.origin +
                              `/${country_data.name.common}`;
                          });
                        }}
                        key={index}
                      >
                        {border}
                      </span>
                    );
                  })}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Country;
