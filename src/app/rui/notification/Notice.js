import React, { Component, PropTypes } from 'react';

class Notice extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        duration: PropTypes.number
    }

    componentDidMount() {
        if (this.props.duration) {
            this.closeTimer = setTimeout(() => {
                this.close();
            }, this.props.duration * 1000);
        }
    }

    componentWillUnmount() {
        this.clearCloseTimer();
    }

    clearCloseTimer() {
        if (this.closeTimer) {
            clearTimeout(this.closeTimer);
            this.closeTimer = null;
        }
    }

    close() {
        this.clearCloseTimer();
        this.props.onClose();
    }

    render() {
        const props = this.props;
        const prefixCls = props.prefixCls;
        return (
            <div className={prefixCls}>
                <div className={`${prefixCls}-content`}>
                    {props.children}
                </div>
                <a className={`${prefixCls}-close`} onClick={() => this.close()}>
                    <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                </a>
            </div>
        );
    }
}

export default Notice;
