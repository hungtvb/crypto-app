import React from 'react'
import { useGetCryptoExchangesQuery } from '../services/cryptoApi'

import { Col, Row, Collapse, Typography, Avatar } from 'antd';
import HTMLReactParser from 'html-react-parser';
import millify from 'millify';
import { Loading } from '.';

const {Text} = Typography;
const {Panel} = Collapse;

const Exchanges = () => {

    const {data, isFetching} = useGetCryptoExchangesQuery();
    const exchangesList = data?.data?.exchanges;

    if(isFetching){
        return <Loading type="cylon" color="#0071bd"/>
    }



    return (
        <>
            <Row style={{marginBottom: '10px'}}>
                <Col span={6}><strong>Exchanges</strong></Col>
                <Col span={6}><strong>24h Trade Volume</strong></Col>
                <Col span={6}><strong>Markets</strong></Col>
                <Col span={6}><strong>Change</strong></Col>
            </Row>
            <Row>
                {exchangesList.map((exchange) => (
                    <Col span={24}>
                        <Collapse>
                            <Panel key={exchange.id} showArrow={false}
                            header={(
                                <Row key={exchange.id}>
                                    <Col span={6}>
                                        <Text><strong>{exchange.rank}</strong></Text>
                                        <Avatar className="exchange-image" src={exchange.iconUrl} />
                                        <Text><strong>{exchange.name}</strong></Text>
                                    </Col>
                                    <Col span={6}>${millify(exchange.volume)}</Col>
                                    <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                                    <Col span={6}>{millify(exchange.marketShare)}%</Col>
                                </Row>
                            )} >
                             {HTMLReactParser(exchange.description || '')}
                            </Panel>
                        </Collapse>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default Exchanges
