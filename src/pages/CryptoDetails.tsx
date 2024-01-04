import React, { FC, useState } from 'react'
import { useParams } from 'react-router-dom'
import millify from 'millify'
import HTMLReactParser from 'html-react-parser'
import { Col, Row, Typography, Select } from 'antd'
import {
    MoneyCollectOutlined,
    DollarCircleOutlined,
    FundOutlined,
    ExclamationCircleOutlined,
    StopOutlined,
    TrophyOutlined,
    CheckOutlined,
    NumberOutlined,
    ThunderboltOutlined,
} from '@ant-design/icons'

import {
    useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery,
} from '../services/cryptoApi'
import Loader from '../components/Loader'
import Chart from '../components/Chart'

const { Title, Text } = Typography
const { Option } = Select

const CryptoDetails = () => {
    const { coinId } = useParams<{ coinId: string }>()
    const [timePeriod, setTimePeriod] = useState('7d')

    const { data: cryptoDetails, isFetching } = useGetCryptoDetailsQuery({
        coinId: coinId as string,
    })

    const { data: coinHistory } = useGetCryptoHistoryQuery({
        coinId: coinId as string,
        timePeriod: timePeriod as string,
    })

    console.log(cryptoDetails)

    const handleTimePeriodChange = (value: string) => {
        setTimePeriod(value)
    }

    const time = ['3h', '24h', '7d', '30d', '3m', '1y', '3y', '5y']

    const stats = [
        {
            title: 'Price to USD',
            value: `$ ${
                cryptoDetails?.data.coin.price &&
                millify(cryptoDetails?.data.coin.price)
            }`,
            icon: <DollarCircleOutlined />,
        },
        {
            title: 'Rank',
            value: cryptoDetails?.data.coin.rank,
            icon: <NumberOutlined />,
        },
        {
            title: '24h Volume',
            value: `$ ${
                cryptoDetails?.data.coin['24hVolume'] &&
                millify(cryptoDetails?.data.coin['24hVolume'])
            }`,
            icon: <ThunderboltOutlined />,
        },
        {
            title: 'Market Cap',
            value: `$ ${
                cryptoDetails?.data.coin.marketCap &&
                millify(cryptoDetails?.data.coin.marketCap)
            }`,
            icon: <DollarCircleOutlined />,
        },
        {
            title: 'All-time-high(daily avg.)',
            value: `$ ${
                cryptoDetails?.data.coin.allTimeHigh?.price &&
                millify(cryptoDetails?.data.coin.allTimeHigh?.price)
            }`,
            icon: <TrophyOutlined />,
        },
    ]

    const genericStats = [
        {
            title: 'Number Of Markets',
            value: cryptoDetails?.data.coin.numberOfMarkets,
            icon: <FundOutlined />,
        },
        {
            title: 'Number Of Exchanges',
            value: cryptoDetails?.data.coin.numberOfExchanges,
            icon: <MoneyCollectOutlined />,
        },
        {
            title: 'Aprroved Supply',
            value: cryptoDetails?.data.coin.supply?.confirmed ? (
                <CheckOutlined />
            ) : (
                <StopOutlined />
            ),
            icon: <ExclamationCircleOutlined />,
        },
        {
            title: 'Total Supply',
            value: `$ ${
                cryptoDetails?.data.coin.supply?.total &&
                millify(cryptoDetails?.data.coin.supply?.total)
            }`,
            icon: <ExclamationCircleOutlined />,
        },
        {
            title: 'Circulating Supply',
            value: `$ ${
                cryptoDetails?.data.coin.supply?.circulating &&
                millify(cryptoDetails?.data.coin.supply?.circulating)
            }`,
            icon: <ExclamationCircleOutlined />,
        },
    ]
    console.log(coinHistory)

    return (
        <>
            <Col className='coin-detail-container'>
                <Col className='coin-heading-container'>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Title level={2} className='coin-name'>
                            {cryptoDetails?.data.coin.name}
                        </Title>
                        <img
                            src={cryptoDetails?.data.coin.iconUrl}
                            alt=''
                            width={50}
                            height={50}
                            style={{ marginLeft: '10px' }}
                        />
                    </div>

                    <p
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        {cryptoDetails?.data.coin.name} live price in US
                        dollars. View value statistics , market cap and supply.
                    </p>
                </Col>
                <Select
                    defaultValue='7d'
                    className='select-timeperiod'
                    placeholder='Select Time Period'
                    onChange={handleTimePeriodChange}
                >
                    {time.map((date) => (
                        <Option key={date}>{date}</Option>
                    ))}
                </Select>
                <Chart
                    coinHistory={coinHistory!}
                    currentPrice={millify(cryptoDetails?.data.coin.price)}
                    coinName={cryptoDetails?.data.coin.name}
                />
                <Col className='stats-container'>
                    <Col className='coin-value-statistics'>
                        <Col className='coin-value-statistics-heading'>
                            <Title
                                level={3}
                                className='coin-details-statistics'
                            >
                                {cryptoDetails?.data.coin.name} Value Statistics
                            </Title>
                            <p>
                                An overview showing the statistics of
                                {cryptoDetails?.data.coin.name}
                            </p>
                        </Col>

                        {stats.map((details, index) => (
                            <Col className='coin-stats' key={index}>
                                <Col className='coin-stats-name'>
                                    <Text>{details.icon}</Text>
                                    <Text>{details.title}</Text>
                                </Col>
                                <Text className='stats'>{details.value}</Text>
                            </Col>
                        ))}
                    </Col>
                    <Col className='other-stats-info'>
                        <Col className='coin-value-statistics-heading'>
                            <Title level={3} className='coin-details-heading'>
                                Other Stats Info
                            </Title>
                            <p>
                                An overview showing the statistics of{' '}
                                {cryptoDetails?.data.coin.name}, such as the
                                base and quote currency, the rank, and trading
                                volume.
                            </p>
                        </Col>
                        {genericStats.map(({ icon, title, value }, index) => (
                            <Col className='coin-stats' key={index}>
                                <Col className='coin-stats-name'>
                                    <Text>{icon}</Text>
                                    <Text>{title}</Text>
                                </Col>
                                <Text className='stats'>{value}</Text>
                            </Col>
                        ))}
                    </Col>
                </Col>
                <Col className='coin-desc-link'>
                    <Row className='coin-desc'>
                        <Title level={3} className='coin-details-heading'>
                            What is {cryptoDetails?.data.coin.name}?
                        </Title>
                        {typeof cryptoDetails?.data.coin.description ===
                        'string' ? (
                            HTMLReactParser(
                                cryptoDetails?.data.coin.description
                            )
                        ) : (
                            <p>Description not available</p>
                        )}{' '}
                    </Row>
                </Col>
                <Col className='coin-links'>
                    <Title level={3} className='coin-details-heading'>
                        {cryptoDetails?.data.coin.name} Links
                    </Title>
                    {cryptoDetails?.data.coin.links?.map(
                        (link: any, index: number) => (
                            <Row className='coin-link' key={index}>
                                <Title level={5} className='link-name'>
                                    {link.type}
                                </Title>
                                <a
                                    href={link.url}
                                    target='_blank'
                                    rel='noreferrer'
                                >
                                    {link.name}
                                </a>
                            </Row>
                        )
                    )}
                </Col>
            </Col>
        </>
    )
}
export default CryptoDetails
