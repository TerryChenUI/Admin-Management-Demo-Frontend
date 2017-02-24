import React from 'react';

class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
             <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
                {this.props.children}
            </div>
        );
    }
}

export default Main;