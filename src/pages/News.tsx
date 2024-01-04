import React, { FC, useState, useEffect } from 'react'
import { Select, Typography, Row, Col, Avatar, Card } from 'antd'
import moment, { Moment } from 'moment'

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi'

const DUMMY_NEWS = [
    {
        label: 'Coindesk',
        value: '/coindesk',
    },
    {
        label: 'Cointelegraph',
        value: '/cointelegraph',
    },
    {
        label: 'Bitcoinist',
        value: '/bitcoinist',
    },
    {
        label: 'Decrypt',
        value: '/decrypt',
    },
    {
        label: 'BSC',
        value: '/bsc',
    },
    {
        label: 'The Guardian',
        value: '/theguardian',
    },
]

type CryptosProps = {
    limit?: number
}

type CryptoNewsProps = {
    limit?: number
}

const { Text, Title } = Typography
const { Option } = Select

const News: FC<CryptoNewsProps> = ({ limit }) => {
    const [newsUrl, setNewsUrl] = useState('/coindesk')

    const { data: cryptoNews, refetch } = useGetCryptoNewsQuery({
        limit,
        url: newsUrl,
    })

    const handleSelectChange = (value: string) => {
        console.log('value', value)

        setNewsUrl(value)
    }

    useEffect(() => {
        refetch()
    }, [newsUrl])

    return (
        <>
            {/* {isLoading && 'Loading...'} */}
            <Row
                gutter={[24, 24]}
                style={{ paddingLeft: '40px', paddingRight: '40px' }}
            >
                <Col span={24}>
                    <Select
                        showSearch
                        className='select-news'
                        placeholder='Select a Crypto'
                        optionFilterProp='children'
                        onChange={handleSelectChange}
                        defaultValue={'/coindesk'}
                        filterOption={(input, option) =>
                            option?.children
                                ? (option.children as any)
                                      .toLowerCase()
                                      .indexOf(input.toLowerCase()) >= 0
                                : false
                        }
                    >
                        {DUMMY_NEWS.map((news, index: number) => (
                            <Option value={news.value} key={index}>
                                {news.label}
                            </Option>
                        ))}
                    </Select>
                </Col>
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
