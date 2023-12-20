import { Layout, Menu } from 'antd'
import { Outlet } from 'react-router-dom'

import Navbar from '../components/Navbar'
import { Content, Footer } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'

const Root = () => {
    return (
        <Layout>
            <Content>
                <Layout
                    style={{
                        padding: '24px 0',
                    }}
                >
                    <Sider width={200}>
                        <Navbar />
                    </Sider>
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>
                        <Outlet />
                    </Content>
                </Layout>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design</Footer>
        </Layout>
    )
}

export default Root

// <div className='app'>
//     <div className='navbar'>
//         <Navbar />
//     </div>
//     <div className='main'>
//         <Layout>
//             <div className='routes'>
//                 <Outlet />
//             </div>
//         </Layout>
//     </div>
//     <div className='footer'>

//     </div>
// </div>
