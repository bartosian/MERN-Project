import React, { Component } from 'react';
import './Header.css';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import AuthService from '../../services/auth-service';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logoBg from '../../assets/images/bg2-main.png';

class Header extends Component {

    constructor(props) {
        super(props);
        this.service = new AuthService();
    }

    state = {
      search: ""
    };

    inputChangedHandler = (e) => {
        const { name, value } = e.target;

        this.setState({
            [name]: value
        });
    };

    render() {



        const { logout, history } = this.props;

        return (
            <div className="container">
                <div className="col-12 header-comp">
                    <div className="logo-bar">
                        <div className="logo">
                            <img className="logo-img" src={logoBg} alt="logo"/>
                        </div>
                        <Link to='/profile' className='navLink'><h1 className="main-logo--navbar">InTouch</h1></Link>
                    </div>
                    <nav className="main-nav">
                        <div className="search">
                            <Input
                                elementType="input"
                                elementConfig={{ placeholder: "Search", name: "search", type: "text" }}
                                value={ this.state.search }
                                changed={ (event) => this.inputChangedHandler(event) }
                            />
                            <div className="search-header-btn">
                                <i className="fa fa-search" aria-hidden="true"></i>
                            </div>
                        </div>
                        <div className="logout">
                            <Button clicked={ () => logout(history) } btnType="danger">Logout</Button>
                        </div>
                    </nav>

                </div>
            </div>
        );
    }
};

export default withRouter(Header);