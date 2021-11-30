import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Filter from "./Filter";

export default function Countries() {
    const [countries, setCountries] = useState([])
    const [filtered, setFiltered] = useState([])
    const [searchInput, setSearchInput] = useState("")

    const fecthCountries = async () => {
        const res = await fetch('https://restcountries.com/v2/all')
        const data = await res.json()
        setCountries(data)
    }
    useEffect(() => {
        fecthCountries()
    }, [])

    const searchCountries = (searchValue) => {
        setSearchInput(searchValue)
        if (searchInput) {
            const filteredCountries = countries.filter((country) => (
                Object.values(country).join("").toLowerCase().includes(searchValue.toLowerCase())
            ))
            setFiltered(filteredCountries)
        }
        else (
            setFiltered(countries)
        )
    }

    return (
        <>
            <Filter searchCountries={searchCountries} searchInput={searchInput} setCountries={setCountries} />
            {searchInput.length > 0 ? <section className="grid container">
                {filtered.map((country) => {
                    const { numericCode, name, population, region, capital, flag } = country
                    return (
                        <>
                            <Link className="link" to={`/${name}`}>
                                <article key={numericCode} className="card">
                                    <img src={flag} alt={name} />
                                    <div className="CardInfo">
                                        <h3>Name : <span>{name}</span></h3>
                                        <h4>Population :<span>{population}</span></h4>
                                        <h4>Region : <span>{region}</span></h4>
                                        <h4>Capital : <span>{capital}</span></h4>
                                    </div>
                                </article>
                            </Link>
                        </>
                    )
                })}
            </section>
                :
                <section className="grid container">
                    {countries.map((country) => {
                        const { numericCode, name, population, region, capital, flag } = country
                        return (
                            <>
                                <Link className="link" to={`/${name}`}>
                                    <article key={numericCode} className="card">
                                        <img src={flag} alt={name} />
                                        <div className="CardInfo">
                                            <h3>Name : <span>{name}</span></h3>
                                            <h4>Population :<span>{population}</span></h4>
                                            <h4>Region : <span>{region}</span></h4>
                                            <h4>Capital : <span>{capital}</span></h4>
                                        </div>
                                    </article>
                                </Link>
                            </>
                        )
                    })}
                </section>}
        </>
    )
}
