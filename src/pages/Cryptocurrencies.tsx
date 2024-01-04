import React, { FC, useEffect, useState } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Input } from 'antd'

import { useGetCryptosQuery } from '../services/cryptoApi'

type CryptocurrenciesProps = {
    limit?: number
}

const Cryptocurrencies: FC<CryptocurrenciesProps> = ({ limit = 100 }) => {
    const { data: cryptosList, isFetching } = useGetCryptosQuery({ limit })
    const [searchTerm, setSearchTerm] = useState('')
    const [cryptos, setCryptos] = useState([])

    useEffect(() => {
        const filteredData = cryptosList?.data?.coins?.filter((coin: any) =>
            coin.name.toLowerCase().includes(searchTerm.toLowerCase())
        )

        setCryptos(filteredData || [])
    }, [cryptosList, searchTerm])

    console.log(cryptos)

    return (
        <>
            <div className='search-crypto'>
                <Input
                    placeholder='Search Cryptocurrency'
                    onChange={(event) => setSearchTerm(event.target.value)}
                />
            </div>

            {isFetching && <p>Loading...</p>}
            <Row
                gutter={[32, 32]}
                className='crypto-card-container'
                style={{ padding: '0px 40px' }}
            >
                {cryptos.map((currency: any) => (
                    <Col
                        key={currency.uuid}
                        xs={24}
                        sm={12}
                        lg={6}
                        className='crypto-card'
                    >
                        <Link to={`/cryptocurrencies/${currency.uuid}`}>
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
