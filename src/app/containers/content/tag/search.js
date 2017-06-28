import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Radio } from 'antd';

import { config } from '../../../utils';

const FormItem = Form.Item;
let tid = null;

class TagSearch extends React.Component {
    constructor(props) {
        super(props);
    }

    handleVisibleChange = (e) => {
        const visible = e.target.value;
        this.handleSearch({ visible });
    }

    handleKeywordChange = (e) => {
        clearTimeout(tid);
        const keyword = e.target.value;
        tid = setTimeout(this.handleSearch({ keyword }), 300);
    }

    handleSearch = (params) => {
        this.props.onSearch(params);
    }

    render() {
        const { filter, form } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Form className="search-form" layout="inline">
                <FormItem>
                    {
                        getFieldDecorator('visible', { initialValue: filter.visible })(
                            <Radio.Group onChange={this.handleVisibleChange}>
                                <Radio.Button value="-1">全部</Radio.Button>
                                <Radio.Button value="1">可见</Radio.Button>
                                <Radio.Button value="0">隐藏</Radio.Button>
                            </Radio.Group>
                        )
                    }
                </FormItem>
                <FormItem label="关键字">
                    {
                        getFieldDecorator('keyword')(
                            <Input placeholder="标签，Slug，描述" onChange={this.handleKeywordChange} />
                        )
                    }
                </FormItem>
            </Form>
        )
    }
}

TagSearch.propTypes = {
    filter: PropTypes.object,
    onSearch: PropTypes.func
}

export default Form.create()(TagSearch);