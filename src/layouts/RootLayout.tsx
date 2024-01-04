import { Layout, Menu, Typography, Space, Grid } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Content, Footer } from 'antd/es/layout/layout'
import { Outlet, Link } from 'react-router-dom'

import Navbar from '../components/Navbar'
import '../App.css'

const { useBreakpoint } = Grid

const RootLayout = () => {
    const screens = useBreakpoint()

    return (
        <Layout className='app'>
            <div className='main'>
                <Content>
                    <Layout>
                        {screens.xs && <Navbar />}
                        <Sider
                            style={{ display: screens.xs ? 'none' : 'unset' }}
                        >
                            <Navbar />
                        </Sider>
                        <Content style={{ minHeight: 280 }}>
                            <div style={{ padding: '24px' }}>
                                <Outlet />
                            </div>

                            <div
                                className='footer'
                                style={{
                                    textAlign: 'center',
                                    backgroundColor: 'rgb(0, 21, 41)',
                                }}
                            >
                                <Typography.Title style={{ color: 'white' }}>
                                    Cryptoverse <br />
                                    All rights reserverd
                                </Typography.Title>
                                <Space>
                                    <Link to='/'>Home</Link>
                                    <Link to='/exchanges'>Exchanges</Link>
                                    <Link to='/news'>News</Link>
                                </Space>
                            </div>
                        </Content>
                    </Layout>
                </Content>
            </div>
        </Layout>
    )
}

export default RootLayout
