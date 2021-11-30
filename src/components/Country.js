import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Col } from 'react-bootstrap';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Country = () => {
    const [Country, setCountry] = useState([])
    const { name } = useParams()
    const fecthCountryData = async () => {
        const respose = await fetch(`https://restcountries.com/v2/name/${name}`)
        const Country = await respose.json()
        setCountry(Country)
    }
    useEffect(() => {
        fecthCountryData()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <section>
            {Country.map((c) => {
                const {
                    numericCode,flag, name, nativeName, population, region, subregion,
                    capital, topLevelDomain, currencies, languages, } = c
                return (
                    <>
                        <section className="container">
                            <div><Link to="/" className="link"><button className="back-btn"><FontAwesomeIcon icon={faArrowAltCircleLeft} />Back</button></Link></div>
                            <article key={numericCode} className="row ">
                                <div>
                                    <img src={flag} alt={flag} className="flag-img" />
                                </div>
                                <div className="details-card-h2" >
                                    <h2 className="country-name"><strong>{name}</strong></h2>
                                    <br />
                                    <div className="details-card">
                                        <Col sm={6} xs={12}>
                                            <p><span>Native name :</span>{nativeName}</p>
                                            <p><span>Population :</span>&nbsp;
                                                {population}</p>
                                            <p><span>Region : </span>{region}</p>
                                            <p><span>Subregion : </span>{subregion}</p>
                                            <p><span>Capital : </span>{capital}</p>
                                        </Col>
                                        <Col sm={6} xs={12}>
                                            <p><span>Top Level Domain : </span>{topLevelDomain}</p>
                                            <p><span>Currencies : </span>{currencies[0].name}</p>
                                            <p><span>Languages : </span>{languages[0].name}</p>
                                        </Col>
                                    </div>
                                    <br />
                                </div>
                            </article>
                        </section>

                    </>
                )
            })}

        </section >
    )
}

export default Country
