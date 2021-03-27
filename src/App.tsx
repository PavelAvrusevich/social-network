import React from 'react';
import { BrowserRouter, Link, Redirect, Route, withRouter } from 'react-router-dom';
import { initialize } from './redux/app-reducer';
import { connect, Provider } from 'react-redux';
import { compose } from 'redux';
import Preloader from './components/common/Preloader/Preloader';
import store, { AppStateType } from './redux/redux-store';
import { withSuspense } from './HOC/withSuspense';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { UsersPage } from './components/Users/UsersPage';
import { LoginPage } from './components/Login/LoginPage';
import HeaderContainer from './components/Header/HeaderContainer';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const ChatPage = React.lazy(() => import('./components/Pages/ChatPage/ChatPage'));

type PropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
    initialize: () => void;
};

const SuspendedDialogs = withSuspense(DialogsContainer);
const SuspendedProfile = withSuspense(ProfileContainer);
const SuspendedChatPage = withSuspense(ChatPage);

class App extends React.Component<PropsType & DispatchPropsType> {
    componentDidMount() {
        this.props.initialize();
    }
    render() {
        if (!this.props.initialized) {
            return <Preloader />;
        }
        return (
            <Layout>
                <HeaderContainer />
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
                        <Sider className="site-layout-background" width={200}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{ height: '100%' }}
                            >
                                <SubMenu key="sub1" icon={<UserOutlined />} title="profile">
                                    <Menu.Item key="1">
                                        <Link to="/profile">Profile</Link>
                                    </Menu.Item>
                                    <Menu.Item key="2">
                                        <Link to="/dialogs">Messages</Link>
                                    </Menu.Item>
                                    <Menu.Item key="3">
                                        <Link to="/Music">Music</Link>
                                    </Menu.Item>
                                </SubMenu>
                                <Menu.Item key="5">
                                    <Link to="/users">Users</Link>
                                </Menu.Item>
                                <Menu.Item key="6">
                                    <Link to="/chat">Chat</Link>
                                </Menu.Item>
                                <Menu.Item key="7">
                                    <Link to="/News">News</Link>
                                </Menu.Item>
                                <Menu.Item key="8">
                                    <Link to="/Settings">Settings</Link>
                                </Menu.Item>
                            </Menu>
                        </Sider>
                        <Content style={{ padding: '0 24px', minHeight: 280 }}>
                            <Route exact path="/">
                                <Redirect to="/profile" />
                            </Route>
                            <Route path="/dialogs" render={() => <SuspendedDialogs />} />
                            <Route path="/profile/:userId?" render={() => <SuspendedProfile />} />
                            <Route path="/users" render={() => <UsersPage />} />
                            <Route path="/login" render={() => <LoginPage />} />
                            <Route path="/chat" render={() => <SuspendedChatPage />} />
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{ textAlign: 'center' }}>©2021</Footer>
            </Layout>
            // <div className="app-wrapper">
            //     <HeaderContainer />
            //
            //     <div className="app-wrapper-content">
            //         <Route exact path="/">
            //             <Redirect to="/profile" />
            //         </Route>
            //         <Route path="/dialogs" render={() => <SuspendedDialogs />} />
            //         <Route path="/profile/:userId?" render={() => <SuspendedProfile />} />
            //         <Route path="/users" render={() => <UsersPage />} />
            //         <Route path="/login" render={() => <LoginPage />} />
            //     </div>
            // </div>
        );
    }
}
const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized,
});

const AppContainer = compose<React.ComponentType>(withRouter, connect(mapStateToProps, { initialize }))(App);

const AppWithProvider = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer />
            </Provider>
        </BrowserRouter>
    );
};

export default AppWithProvider;
