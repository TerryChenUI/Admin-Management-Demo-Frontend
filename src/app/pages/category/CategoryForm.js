import React from 'react';
import { connect } from 'react-redux';

class CategoryForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            name: '',
            enabled: true,
            isFetching: false
        };
    }

    componentWillReceiveProps(nextProps) {
        nextProps.data && this.initialValues(nextProps.data);
    }

    initialValues(data) {
        this.setState({
            id: data.id,
            name: data.name,
            enabled: data.enabled
        });
    }

    handleNameChange(e) {
        this.setState({ name: e.target.value });
    }

    handleEnabledChange(e) {
        this.setState({ enabled: e.target.checked });
    }

    handleSubmit() {
        this.setState({
            isFetching: true
        });
        this.props.onSubmit(this.state);
    }

    render() {
        return (
            <form name="form">
                <div className="form-group">
                    <label htmlFor="name">类别</label>
                    <input type="text" className="form-control" id="name" value={this.state.name} onChange={(e) => this.handleNameChange(e)} />
                </div>
                <div className="checkbox">
                    <label>
                        <input type="checkbox" checked={this.state.enabled} onChange={(e) => this.handleEnabledChange(e)} /> 启用
                    </label>
                </div>
                <button type="submit" className="btn btn-default" disabled={this.state.isFetching} onClick={() => this.handleSubmit()}>{this.state.isFetching ? '正在保存' : '保存'}</button>
            </form>
        );
    }
}
export default CategoryForm;