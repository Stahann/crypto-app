import millify from 'millify'
import { Typography, Row, Col, Statistic } from 'antd'
import { Link } from 'react-router-dom'
import { useGetCryptosQuery } from '../services/cryptoApi'

import Cryptocurrencies from './Cryptocurrencies'
import News from './News'

const { Title } = Typography

const HomePage = () => {
    const { data: cryptosList, isFetching } = useGetCryptosQuery({ limit: 10 })
    console.log('data', cryptosList?.data)

    const globalStats = cryptosList?.data?.stats

    if (isFetching) {
        return <p>Loading...</p>
    }

    return (
        <>
            <Title
                level={2}
                style={{
                    fontSize: '30px',
                    fontWeight: '350',
                    padding: '0px 40px',
                }}
                className='heading'
            >
                Global Crypto Stats
            </Title>
            <Row style={{ padding: '0px 40px' }}>
                <Col span={12}>
                    <Statistic
                        title='Total Cryptocurrencies'
                        value={globalStats.total}
                    />
                </Col>
                <Col span={12}>
                    <Statistic
                        title='Total Exchanges'
                        value={millify(globalStats.totalExchanges)}
                    />
                </Col>
                <Col span={12}>
                    <Statistic
                        title='Total Market Cap'
                        value={millify(globalStats.totalMarketCap)}
                    />
                </Col>
                <Col span={12}>
                    <Statistic
                        title='Total 24h Volume'
                        value={millify(globalStats.total24hVolume)}
                    />
                </Col>
                <Col span={12}>
                    <Statistic
                        title='Total Markets'
                        value={millify(globalStats.totalMarkets)}
                    />
                </Col>
            </Row>
            <div className='home-heading-container'>
                <Title level={2} className='home-title'>
                    Top 10 Cryptocurrencies in the world
                </Title>
                <Title level={3} className='show-more'>
                    <Link to='cryptocurrencies'>Show More</Link>
                </Title>
            </div>
            <Cryptocurrencies limit={10} />

            <div
                className='home-heading-container'
                style={{ padding: '0px 40px' }}
            >
                <Title level={2} className='home-title'>
                    Latest Crypto News
                </Title>
                <Title level={3} className='show-more'>
                    <Link to='news'>Show More</Link>
                </Title>
            </div>
            <News />
        </>
    )
}

export default HomePage
