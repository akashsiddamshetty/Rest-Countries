import React, { Component } from 'react'
import NumberFormat from 'react-number-format';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';


class CountryCard extends Component {
    render() {

        return (
            <Col xs={12} sm={6} md={4} lg={3} className="col">
                <div className="card">
                    <Link to={`CountryDetails/${this.props.id}`}>
                    <img src={this.props.flag} alt="" />
                    <div className="CardInfo">
                        <h2>{this.props.name}</h2>
                        <p><span>Population :</span>
                            {
                                (this.props.population === 0) ?
                                    'Uninhabited'
                                    :
                                    <NumberFormat value={this.props.population} displayType={"text"} thousandSeparator={true} />
                            }
                        </p>
                        <p><span>Region :</span>{(this.props.region) ? this.props.region : 'N/A'}</p>
                        <p><span>Captial :</span>{(this.props.capital.length) ? this.props.capital : 'N/A'}</p>

                    </div>
                    </Link>
                </div>
            </Col>
        )
    }
}

export default CountryCard;
