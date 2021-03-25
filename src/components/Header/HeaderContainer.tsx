import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getIsAuth, getLogin } from '../../redux/auth-selectors';
import { Layout, Menu, Row, Col, Avatar, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { logout } from '../../redux/auth-reducer';
const { Header } = Layout;

const HeaderContainer: React.FC = (props) => {
    const isAuth = useSelector(getIsAuth);
    const login = useSelector(getLogin);
    const dispatch = useDispatch();
    return (
        <Header className="header">
            <Row justify="start">
                <Col span={18}>
                    <Menu theme="dark" mode="horizontal">
                        <Menu.Item key="1">
                            <Link to="/users">Users</Link>
                        </Menu.Item>
                    </Menu>
                </Col>

                {isAuth ? (
                    <>
                        <Col span={1}>
                            <Avatar
                                alt={login || ''}
                                style={{ backgroundColor: '#87d068' }}
                                icon={<UserOutlined />}
                            />
                        </Col>
                        <Col span={5}>
                            <Button onClick={() => dispatch(logout())}>Logout</Button>
                        </Col>
                    </>
                ) : (
                    <Col span={6}>
                        <Button>
                            <Link to={'/login'}>Login</Link>
                        </Button>
                    </Col>
                )}
            </Row>
        </Header>
    );
};

export default HeaderContainer;
