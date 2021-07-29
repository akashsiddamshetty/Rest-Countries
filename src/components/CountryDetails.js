import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NumberFormat from "react-number-format";
import { withRouter, Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';

class CountryDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
            country: [],
            exists: false,
            borders: [],
        };
    }

    componentDidMount() {
        return this.fetchData();
    }

    fetchData() {
        return fetch('https://restcountries.eu/rest/v2/all')
            .then(res => res.json())
            .then(data => {
                let result = data.find(country => country.alpha3Code === this.state.id);
                let borders3Alpha = result.borders.map(borderCountry => borderCountry);

                (!result) ?
                    this.props.history.push("/")
                    :
                    this.setState({
                        exists: true,
                        country: result,
                        borders: [
                            ...this.state.borders,
                            ...borders3Alpha.map(item => {
                                let re = data.find(country => country.alpha3Code === item);
                                return re.name;
                            })
                        ]
                    });
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            (this.state.exists) ?
                <section className="container">
                    <button className="btn-back FilterSection">
                        <Link to={'/'}>
                            <span>
                                <FontAwesomeIcon icon={faArrowLeft} /> Back
                            </span>
                        </Link>
                    </button>
                    <div className="row">
                        <Col xs={12} sm={6}>
                            <img src={this.state.country.flag} alt={this.state.country.name} className="flag-img" />
                        </Col>
                        <Col xs={12} sm={6} className="details-card-h2" >
                            <h2><strong>{this.state.country.name}</strong></h2>
                            <br />
                            <div className="details-card">
                                <Col sm={6} xs={12}>
                                    <p><span>Native name :</span>{this.state.country.nativeName}</p>
                                    <p><span>Population :</span>&nbsp;
                                        {
                                            (this.state.country.population === 0) ?
                                                'Uninhabited'
                                                :
                                                <NumberFormat value={this.state.country.population} displayType={'text'} thousandSeparator={true} />

                                        }</p>
                                    <p><span>Region : </span>{(this.state.country.region) ? this.state.country.region : 'N/A'}</p>
                                    <p><span>Subregion : </span>{(this.state.country.subregion) ? this.state.country.subregion : 'N/A'}</p>
                                    <p><span>Capital : </span>{(this.state.country.capital) ? this.state.country.capital : 'N/A'}</p>
                                </Col>
                                <Col sm={6} xs={12}>
                                    <p><span>Top Level Domain : </span>{this.state.country.topLevelDomain}</p>
                                    <p><span>Currencies : </span>{this.state.country.currencies.map(currency => currency.name + '. ')}</p>
                                    <p><span>Languages : </span>{this.state.country.languages.map(language => language.name + '. ')}</p>
                                </Col>
                            </div>
                            <br />
                            {(this.state.borders.length) ?
                                <div className="border-card">
                                    <p>Border countries :</p>&nbsp;
                                    {this.state.borders.map(borderCountryName => <span className="countryblb">{borderCountryName}</span>)}
                                </div>
                                :
                                <div className="border-card">
                                    There are no border countries
                                </div>
                            }
                        </Col>
                    </div >
                </section>
                : ''
        )
    }

}
export default withRouter(CountryDetails);