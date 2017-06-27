import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Radio } from 'antd';

import { config } from '../../../utils';

const FormItem = Form.Item;
let tid = null;

class ArticleSearch extends React.Component {
    constructor(props) {
        super(props);
    }

    handleStateChange = (e) => {
        this.handleSearch(e.target.value);
    }

    handleKeywordChange = (e) => {
        clearTimeout(tid);
        tid = setTimeout(this.handleSearch, 300);
    }

    handleSearch = (state) => {
        let values = this.props.form.getFieldsValue();
        if (state) values.state = state;
        if (values.state === "-1") {
            delete values.state;
        }
        if (!values.keyword) {
            delete values.keyword;
        }
        this.props.onSearch(values);
    }

    render() {
        const { filter, form } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Form className="search-form" layout="inline">
                <FormItem>
                    {
                        getFieldDecorator('state', { initialValue: filter.state })(
                            <Radio.Group onChange={this.handleStateChange}>
                                <Radio.Button value="-1">全部</Radio.Button>
                                <Radio.Button value="1">已发布</Radio.Button>
                                <Radio.Button value="0">草稿</Radio.Button>
                                <Radio.Button value="2">回收站</Radio.Button>
                            </Radio.Group>
                        )
                    }
                </FormItem>
                <FormItem label="关键字">
                    {
                        getFieldDecorator('keyword')(
                            <Input placeholder="标题，描述" onChange={this.handleKeywordChange} style={{ width: 300 }} />
                        )
                    }
                </FormItem>
            </Form>
        )
    }
}

ArticleSearch.propTypes = {
    filter: PropTypes.object,
    onSearch: PropTypes.func
}

export default Form.create()(ArticleSearch);