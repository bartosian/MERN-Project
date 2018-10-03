import React, { Component } from 'react';
import './Header.css';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';

class Header extends Component {

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
        return (
            <div className="container">
                <div className="col-12 header-comp">
                    <div className="logo-bar">
                        <div className="logo">
                            <img className="logo-img" src="http://www.broutinwebpublishing.com/wp-content/uploads/2016/04/social-media-local-1024x723.png" alt="logo"/>
                        </div>
                        <h1 className="main-logo--navbar">InTouch</h1>
                    </div>
                    <nav className="main-nav">
                        <div className="search">
                            <Input
                                elementType="input"
                                elementConfig={{ placeholder: "Search", name: "search", type: "text" }}
                                value={ this.state.search }
                                changed={ (event) => this.inputChangedHandler(event) }
                            />
                        </div>
                        <div className="logout">
                            <Button btnType="danger">Logout</Button>
                        </div>
                    </nav>

                </div>
            </div>
        );
    }
};

export default Header;