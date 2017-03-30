import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import './style.scss';

const nodeArray = [];

class ConfirmContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true
        };
    }

    setVisible(visible) {
        this.setState({ visible: visible });
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside.bind(this), true);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside.bind(this), true);
    }

    handleClickOutside(e) {
        const domNode = ReactDOM.findDOMNode(this);
        if (!domNode || !domNode.contains(e.target)) {
            this.setVisible(false);
        }
    }

    onConfirm(e) {
        this.setVisible(false);
        this.props.onConfirm && this.props.onConfirm.call(this, e);
    }

    onCancel(e) {
        this.setVisible(false);
        this.props.onCancel && this.props.onCancel.call(this, e);
    }

    render() {
        const { title, okText, cancelText, rect } = this.props;
        const styles = {
            top: rect.top,
            left: rect.left,
            display: this.state.visible ? null : 'none'
        };
        return (
            <div className="rui-popover" style={styles}>
                <div className="rui-popover-content">
                    <div className="rui-popover-inner">
                        <div className="rui-popover-message">
                            {title}
                        </div>
                        <div className="rui-popover-buttons">
                            <button type="button" className="btn btn-primary btn-xs" onClick={() => this.onConfirm()}><span>{okText}</span></button>
                            <button type="button" className="btn btn-default btn-xs" onClick={() => this.onCancel()}><span>{cancelText}</span></button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

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

    openConfirmPop(e) {
        const node = nodeArray.find(node => { return node.target === e.target });

        if (node) {
            // node.instance.render();
        } else {
            const rect = e.target.getBoundingClientRect()

            const div = document.createElement('div');
            div.setAttribute('class', 'pop-confirm-panel');
            document.body.appendChild(div);
            
            const instance = <ConfirmContainer {...this.props} rect={rect} />;
            ReactDOM.render(instance, div);
            nodeArray.push({
                target: e.target,
                instance: instance
            });
        }
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