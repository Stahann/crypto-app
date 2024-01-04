import React from 'react'
import millify from 'millify'
import { Collapse, Row, Col, Typography, Avatar } from 'antd'
import HTMLReactParser from 'html-react-parser'

const DUMMY_EXCHANGES = [
    {
        coinrankingUrl: 'https://coinranking.com/exchange/-zdvbieRdZ+binance',
        uuid: '-zdvbieRdZ',
        name: 'Binance',
        iconUrl: 'https://cdn.coinranking.com/mDTK5qrmq/binance.svg',
        numberOfMarkets: 3,
        Volume24h: '776337030.2052088',
        rank: 1,
        marketShare: '12.22',
        verified: true,
        recommended: true,
    },
]

const { Text } = Typography
const { Panel } = Collapse

const Exchanges = () => {
    return (
        <>
            <Row style={{ padding: '20px' }}>
                <Col span={6}>Exchanges</Col>
                <Col span={6}>24h Trade Volume</Col>
                <Col span={6}>Markets</Col>
                <Col span={6}>Change</Col>
            </Row>
            {DUMMY_EXCHANGES.map((exchange: any) => (
                <Col span={24} style={{ padding: '20px' }} key={exchange.uuid}>
                    <Collapse>
                        <Panel
                            key={exchange.uuid}
                            showArrow={false}
                            header={
                                <Row>
                                    <Col span={6}>
                                        <Text>
                                            <strong>{exchange.rank}.</strong>
                                        </Text>
                                        <Avatar
                                            className='exchange-image'
                                            src={exchange.iconUrl}
                                        />
                                        <Text>
                                            <strong>{exchange.name}</strong>
                                        </Text>
                                    </Col>
                                    <Col span={6}>
                                        ${millify(exchange.Volume24h)}
                                    </Col>
                                    <Col span={6}>
                                        {millify(exchange.numberOfMarkets)}
                                    </Col>
                                    <Col span={6}>
                                        {millify(exchange.marketShare)}%
                                    </Col>
                                </Row>
                            }
                        >
                            {HTMLReactParser(exchange.description || '')}
                        </Panel>
                    </Collapse>
                </Col>
            ))}
        </>
    )
}

export default Exchanges
