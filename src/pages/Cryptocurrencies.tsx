import React, { FC, useState } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Input } from 'antd'

import { useGetCryptosQuery } from '../services/cryptoApi'

type CryptocurrenciesProps = {
    limit?: number
}

const Cryptocurrencies: FC<CryptocurrenciesProps> = ({ limit = 50 }) => {
    const { data: cryptosList, isFetching } = useGetCryptosQuery({ limit })
    // const [cryptos, setCryptos] = useState(cryptosList?.data?.coins || [])

    console.log('dawdawdaw', limit)

    return (
        <>
            <Row
                gutter={[32, 32]}
                className='crypto-card-container'
                style={{ padding: '0px 40px' }}
            >
                {cryptosList?.data?.coins.map((currency: any) => (
                    <Col
                        xs={24}
                        sm={12}
                        lg={6}
                        className='crypto-card'
                        key={currency.id}
                    >
                        <Link to={`crypto/${currency.id}`}>
                            <Card
                                title={`${currency.rank}. ${currency.name}`}
                                extra={
                                    <img
                                        className='crypto-image'
                                        src={currency.iconUrl}
                                    />
                                }
                                hoverable
                            >
                                <p>Price: {millify(currency.price)}</p>
                                <p>Market Cap: {millify(currency.marketCap)}</p>
                                <p>
                                    Daily Change: {millify(currency.change)} %
                                </p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default Cryptocurrencies
