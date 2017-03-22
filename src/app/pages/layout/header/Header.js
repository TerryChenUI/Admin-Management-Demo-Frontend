import React from 'react';
import { Route, Link } from 'react-router';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#">React Redux Crud Demo</a>
                    </div>
                    <div id="navbar" className="navbar-collapse collapse">
                        <ul className="nav navbar-nav navbar-left">
                            <li><Link to='/home'>Home</Link></li>
                            <li><Link to='/category/list'>Category</Link></li>
                            <li><Link to='/article/list'>Article</Link></li>
                        </ul>
                        {/*<form className="navbar-form navbar-right">
                            <input type="text" className="form-control" placeholder="Search..." />
                        </form>*/}
                    </div>
                </div>
            </nav>
        );
    }
}

export default Header;