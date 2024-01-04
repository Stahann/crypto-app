import React, { FC } from 'react'
import { Line } from 'react-chartjs-2'
import { Col, Row, Typography } from 'antd'
import { ICryptosHistory } from '../types/cryptos/cryptos-history.types'
import {
    ChartOptions,
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title as ChartTitle,
} from 'chart.js'

const { Title } = Typography

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ChartTitle
)

type ChartProps = {
    coinHistory: ICryptosHistory
    currentPrice: string
    coinName: string
}

const Chart: FC<ChartProps> = ({
    coinHistory,
    currentPrice,
    coinName,
}: ChartProps) => {
    const coinPrice = []
    const coinTimestamp = []

    for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
        coinPrice.push(coinHistory?.data?.history[i].price)
    }

    for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
        coinTimestamp.push(
            new Date(
                coinHistory?.data?.history[i].timestamp
            ).toLocaleDateString()
        )
    }
    const data = {
        labels: coinTimestamp,
        datasets: [
            {
                label: 'Price In USD',
                data: coinPrice,
                fill: false,
                backgroundColor: '#0071bd',
                borderColor: '#0071bd',
            },
        ],
    }

    return (
        <>
            <Row className='chart-header'>
                <Title level={2} className='chart-title'>
                    {coinName} Price Chart
                </Title>
                <Col className='price-container'>
                    <Title level={5} className='price-change'>
                        {coinHistory?.data?.change} %
                    </Title>
                    <Title level={5} className='current-price'>
                        Current {coinName} Price : $ {currentPrice}
                    </Title>
                </Col>
            </Row>

            {data && <Line data={data} />}
        </>
    )
}

export default Chart
