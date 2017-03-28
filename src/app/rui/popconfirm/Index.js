import React, { Component, PropTypes } from 'react';
import ReactDom from 'react-dom';
import './style.scss';

class Popconfirm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true
        };
    }

    static defaultProTypes = {
        okText: '确定',
        cancelText: '取消'
    }

    static propTypes = {
        title: PropTypes.string,
        okText: PropTypes.string,
        cancelText: PropTypes.string,
        onConfirm: PropTypes.func,
        onCancel: PropTypes.func
    }

    setVisible(visible) {
        this.setState({ visible: visible });
    }

    onConfirm() {
        this.setVisible(false);
        this.props.onConfirm && this.props.onConfirm();
    }

    onCancel() {
        this.setVisible(false);
        this.props.onCancel && this.props.onCancel();
    }

    confirmContent() {
        const { title, okText, cancelText } = this.props;
        return (
            <div className="rui-popover-content">
                <div className="rui-popover-inner">
                    <div className="rui-popover-message">
                        {title}
                    </div>
                    <div className="rui-popover-buttons">
                        <button type="button" className="btn btn-primary btn-xs"><span>{okText}</span></button>
                        <button type="button" className="btn btn-default btn-xs"><span>{cancelText}</span></button>
                    </div>
                </div>
            </div>
        );
    }


    openConfirmPop(e) {
        const rect = e.target.getBoundingClientRect();
        const styles = {
            top: rect.top,
            left: rect.left,
            display: this.state.visible
        };

        const div = document.createElement('div');
        div.setAttribute('class', 'pop-confirm-panel');
        document.body.appendChild(div);

        ReactDom.render(<div className="rui-popover rui-popover-placement-top" style={styles}>{this.confirmContent()}</div>, div);
    }

    render() {
        return (
            <span onClick={e => this.openConfirmPop(e)}>
                {this.props.children}
            </span>
        );
    }
}

export default Popconfirm;