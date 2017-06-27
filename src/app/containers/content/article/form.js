import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Form, Button, Input, Switch, InputNumber } from 'antd';

import { time, config } from '../../../utils';
import { ArticleService } from '../../../services';

const FormItem = Form.Item;
let tid = null;

class ArticleForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false
        };
    }

    checkExist = (rule, value, callback) => {
        const { initialValue } = this.props;
        if (value === "" || (initialValue && value === initialValue.slug)) {
            clearTimeout(tid);
            callback();
        }
        if (value !== "") {
            tid = setTimeout(() => {
                const param = `slug=${value.trim()}`;
                ArticleService.checkExist(param).then(() => {
                    callback();
                }, (error) => {
                    callback(error.response.message)
                });
            }, 300);
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let data = this.props.form.getFieldsValue();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (this.props.initialValue) {
                    data._id = this.props.initialValue._id;
                }
                this.setState({ loading: true });
                this.props.onSubmit(data);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { initialValue } = this.props;
        const { formItemLayout, tailFormItemLayout } = config.editForm;
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="标签"
                >
                    {getFieldDecorator('name', {
                        rules: [{
                            required: true, message: '必填'
                        }],
                        initialValue: initialValue && initialValue.name
                    })(
                        <Input placeholder="文章标签" />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Slug"
                >
                    {getFieldDecorator('slug', {
                        rules: [{
                            required: true, message: '必填'
                        }, {
                            validator: this.checkExist,
                        }],
                        initialValue: initialValue && initialValue.slug
                    })(
                        <Input placeholder="在URL中使用的别称，建议小写，字母、数字、连字符（-）" />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="描述"
                >
                    {getFieldDecorator('description', {
                        initialValue: initialValue && initialValue.description
                    })(
                        <Input type="textarea" rows={4} placeholder="描述" />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="排序"
                >
                    {getFieldDecorator('displayOrder', {
                        rules: [{
                            required: true, message: '必填'
                        }],
                        initialValue: initialValue ? initialValue.displayOrder : 1
                    })(
                        <InputNumber min={1} />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="可见"
                >
                    {getFieldDecorator('visible', {
                        valuePropName: 'checked',
                        initialValue: initialValue ? initialValue.visible : false
                    })(
                        <Switch />
                        )}
                </FormItem>
                {initialValue && initialValue.create_time &&
                    <FormItem
                        {...formItemLayout}
                        label="创建时间"
                    >
                        <span className="ant-form-text">
                            {time.convert(initialValue.create_time)}
                        </span>
                    </FormItem>
                }
                {initialValue && initialValue.create_time &&
                    <FormItem
                        {...formItemLayout}
                        label="更新时间"
                    >
                        <span className="ant-form-text">
                            {time.convert(initialValue.update_time)}
                        </span>
                    </FormItem>
                }
                <FormItem className="form-action" {...tailFormItemLayout}>
                    <Link to='/articles'><Button size="large">取消</Button></Link>
                    <Button type="primary" htmlType="submit" size="large" loading={this.state.loading}>保存</Button>
                </FormItem>
            </Form>
        );
    }
}

export default Form.create()(ArticleForm);