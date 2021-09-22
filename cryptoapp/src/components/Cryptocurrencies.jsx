import React, {useState, useEffect, useCallback} from 'react'
import millify from 'millify'
import {Link} from 'react-router-dom'
import { Card, Row, Col, Input, Select} from 'antd'
import { useGetCryptosQuery } from '../services/cryptoApi'
import { Loading } from '.'

const Cryptocurrencies = ({simple}) => {

    const count = simple ? 10 : 100;
    const {data: cryptosList, isFetching} = useGetCryptosQuery(count);
    const [cryptos, setCryptos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('rank');
    
    const sort = useCallback((a, b) => {
        let valueA = a[sortBy];
        let valueB = b[sortBy];

       if(typeof(valueA) === 'number'){
           return valueA - valueB;
       }

       if(sortBy === 'name'){
           return valueA.toLocaleLowerCase()
           .localeCompare(valueB.toLocaleLowerCase());
       }

       return valueB - valueA;
    },[sortBy])
    
    useEffect(() => {
        const filteredData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()))
        
        setCryptos(filteredData?.sort(sort));

    }, [cryptosList, searchTerm, sort]);

    useEffect(() => {
        setCryptos(c => c?.sort(sort));
    },[cryptos, sort])

    if(isFetching){
        return <Loading type="cylon" color="#0071bd"/>
    }

    return (
        <>
            {!simple && 
            <div className="filter-container">
                <div className="search-crypto">
                    <Input placeholder="Search Crypto" onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                <Select placeholder="Sort by" className="filter-crypto" onChange={(e) => setSortBy(e)}>
                    <Select.Option key="rank" value="rank">Rank</Select.Option>
                    <Select.Option key="price" value="price">Price</Select.Option>
                    <Select.Option key="name" value="name">Name</Select.Option>
                </Select>
            </div>}
            <Row gutter={[32, 32]} className="crypto-card-container">
                {
                cryptos?.map((currency) => (
                    <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
                        <Link to={`/crypto/${currency.id}`}>
                            <Card hoverable title={`${currency.rank}. ${currency.name}`} extra={<img className="crypto-image" src={currency.iconUrl} alt="crypto icon" />}>
                                <p>Price: {millify(currency.price)}</p>
                                <p>Market Cap: {millify(currency.marketCap)}</p>
                                <p>Daily Change: {millify(currency.change)}%</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default Cryptocurrencies
