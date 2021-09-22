import React, { useState } from 'react'
import {Select, Typography, Row, Col, Avatar, Card} from 'antd'
import moment from 'moment';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { Loading } from '.';

const demoImage = 'https://www.californiaemploymentlawreport.com/wp-content/uploads/sites/747/2021/05/Crypto-currency-scaled.jpeg';

const News = ({simple}) => {

    const count = simple ? 6 : 20;
    const [newsCategory, setNewsCategory] = useState('Cryptocurrency');

    const {data: cryptoNews, isFetching} = useGetCryptoNewsQuery({newsCategory, count});
    const {data} = useGetCryptosQuery(100);

    if(isFetching){
        return <Loading type="cylon" color="#0071bd"/>
    }

    return (

        <Row gutter={[24, 24]}>
            {!simple && (
                <Col span={24}>
                    <Select
                        showSearch
                        style={{cursor: 'pointer'}}
                        className="select-news"
                        placeholder="Select a Crypto"
                        optionFilterProp="children"
                        onChange={value => setNewsCategory(value)}
                    >
                        <Select.Option value="Cryptocurrency">Cryptocurrency</Select.Option>

                        {data?.data?.coins?.map((coin) => (
                            <Select.Option value={coin.name}>{coin.name}</Select.Option>
                        ))}
                    </Select>
                </Col>
                )} 
            {cryptoNews?.value?.map((news, i) => (
                <Col xs={24} sm={12} lg={8} key={i} >
                    <Card hoverable className="news-card">
                        <a href={news.url} target="_blank" rel="noreferrer">
                            <div className="news-image-container">
                                <Typography.Title className="news-title" level={4}>
                                    {news.name}
                                    <img style={{maxWidth: '200px', maxHeight: '100px'}} src={news?.image?.thumbnail?.contentUrl || demoImage} alt="news-thumbnail"/>
                                </Typography.Title>
                            </div>
                            <p>
                                {news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}
                            </p>
                            <div className="provider-container">
                                <div>
                                    <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="news-provider"/>
                                    <Typography.Text className="provider-name">
                                        {news.provider[0]?.name}
                                    </Typography.Text>
                                </div>
                                    <Typography.Text>
                                        {moment(news.datePublished).startOf('s').fromNow()}
                                    </Typography.Text>
                            </div>
                        </a>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

export default News
