import React, { FC, useState, useEffect } from 'react'
import { Select, Typography, Row, Col, Avatar, Card } from 'antd'
import moment, { Moment } from 'moment'

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi'

type CryptoNewsProps = {
    limit?: number | undefined
}

const { Text, Title } = Typography
const { Option } = Select

const News: FC<CryptoNewsProps> = ({ limit }) => {
    const { data: cryptoNews } = useGetCryptoNewsQuery({ limit })

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (cryptoNews) {
            setIsLoading(false)
        }
    }, [cryptoNews])

    return (
        <>
            {isLoading && 'Loading...'}
            <Row
                gutter={[24, 24]}
                style={{ paddingLeft: '40px', paddingRight: '40px' }}
            >
                {cryptoNews?.data.map((news: any) => (
                    <Col xs={24} sm={12} lg={8} key={news.createdAt}>
                        <Card hoverable className='news-card'>
                            <a href={news.url} target='_blank' rel='noreferrer'>
                                <div className='news-image-container'>
                                    <img
                                        style={{
                                            height: '100px',
                                            width: '100px',
                                        }}
                                        src={news.thumbnail}
                                        alt={news.title}
                                    />
                                </div>
                                <div className='news-details'>
                                    <Title level={4} className='news-title'>
                                        {news.title}
                                    </Title>
                                    <Text>{news.description}</Text>
                                </div>
                                <Text>
                                    {moment(news.createdAt)
                                        .startOf('seconds')
                                        .fromNow()}
                                </Text>
                            </a>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default News
