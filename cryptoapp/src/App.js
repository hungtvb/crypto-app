import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import { Layout, Typography, Space } from 'antd'
import {Navbar, HomePage, Exchanges, CryptoDetails, Cryptocurrencies, News} from './components'

import './App.css'

const App = () => {
    return (
        <div className="app">
            <div className="navbar">
                <Navbar/>
            </div>
            <div className="main">
                <Layout>
                    <div className="routers">
                        <Switch>
                            <Route exact path="/">
                                <HomePage/>
                            </Route>
                            <Route path="/exchanges">
                                <Exchanges/>
                            </Route>
                            <Route exact path="/cryptocurrencies">
                                <Cryptocurrencies/>
                            </Route>
                            <Route path="/crypto/:coinId">
                                <CryptoDetails/>
                            </Route>
                            <Route exact path="/news">
                                <News/>
                            </Route>
                        </Switch>
                    </div>
                </Layout>
                <div className="footer" level>
                    <Typography.Title level={5} style={{color: 'white'}}>
                        Crypto <br/>
                        All rights reserverd
                    </Typography.Title>
                    <Space>
                        <Link to="/">Home</Link>
                        <Link to="/exchanges">Exchanges</Link>
                        <Link to="/news">News</Link>
                    </Space>
                </div>
            </div>
        </div>
    )
}

export default App

