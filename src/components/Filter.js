// import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function Filter({ searchCountries, searchInput }) {


    return (
        <section className="container">
            <div className="FilterSection">
                <div className="SearchInput">
                    <FontAwesomeIcon icon={faSearch} />
                    <input
                        type="text"
                        placeholder={'Search for a country...'}
                        name="search"
                        id="search"
                        value={searchInput}
                        onChange={(e) => searchCountries(e.target.value)}
                        autoComplete="off"
                    />
                </div>
            </div>
        </section>

    )
}

