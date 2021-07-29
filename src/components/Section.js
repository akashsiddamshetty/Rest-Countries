import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import CountryCard from './CountryCard';
import Spinner from 'react-bootstrap/Spinner';
import { Container } from 'react-bootstrap';


export default function Section() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [distinctRegions, setDistinctRegions] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState('');


    const CountriesAPI = () => {
        return fetch('https://restcountries.eu/rest/v2/all')
                .then(res => res.json())
    };

    useEffect(() => {
        CountriesAPI().then(res => {
            onLoad(res);
            setLoading(false);
        });
    }, []);
      
    const onLoad = dataList => {
        setData(...data, dataList);
        getRegions(dataList);
    };

    const getRegions = dataList => {
        let regions = [];

        dataList.map(dataItem => dataItem.region.length ? regions.push(dataItem.region) : '');

        let regionsFiltered = regions.filter((item, index, arr) => arr.indexOf(item) === index);
        setDistinctRegions(...distinctRegions, regionsFiltered);
    }
    const renderLoading = () => {
        return (
            <Container>
                <Spinner animation="grow" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
                Loading...
            </Container>
        );
    };

    const change = event => {
        setSelectedRegion(event.target.value);
    };
    const search = event => {
        setSearchTerm(event.target.value);
    };
    const renderData = (dataList, distinctRegionsItem) => {
        if (dataList && dataList.length) {

            return (

                <section className="container">


                    <div className="FilterSection">
                        <div className="SearchInput">
                            <FontAwesomeIcon icon={faSearch} />
                            <input type="text" placeholder={'Search for a country...'} onKeyUp={search} />
                        </div>
                        <select onChange={change}>
                            <option value="" hidden>Filter by region</option>
                            <option value="All">All</option>
                            {distinctRegionsItem.map(item => {
                                return <option key={item} value={item}>{item}</option>
                            })}
                        </select>
                    </div>

                    <div className="row">
                        {dataList
                            .filter(country => !selectedRegion || selectedRegion === 'All' || country.region === selectedRegion)
                            .filter(country => country.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
                            .map(country => (
                                <CountryCard
                                    population={country.population}
                                    region={country.region}
                                    capital={country.capital}
                                    flag={country.flag}
                                    key={country.alpha3Code}
                                    id={country.alpha3Code}
                                    name={country.name} />

                            ))
                        }

                    </div>


                </section>

            )

        }
        else {
            return <div>No items found</div>
        }

    };
    return loading ?
        renderLoading()
        :
        renderData(data, distinctRegions);
}