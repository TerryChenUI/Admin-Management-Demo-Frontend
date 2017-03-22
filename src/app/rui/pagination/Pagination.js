import React from 'react';

class Pagination extends React.Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        pageSize: 1,
        pageCount: 3,
        total: 0
    };

    static propTypes = {
        pageSize: React.PropTypes.number,
        pageCount: React.PropTypes.number,
        total: React.PropTypes.number,
        onChange: React.PropTypes.func,
    };

    renderRow(numberOfPage) {
        const rows = [];
        for (let page = 1; page <= numberOfPage; page++) {
            rows.push(
                <li key={page} className={this.props.pageSize === page ? 'active' : ''}>
                    <a href="javascript:void(0)" onClick={() => this.props.onChange(page)}>{page}</a>
                </li>
            );
        }
        return rows;
    }

    render() {
        const numberOfPage = Math.ceil(this.props.total / this.props.pageCount);
        const isFirstPage = this.props.pageSize === 1;
        const isLastPage = this.props.pageSize === numberOfPage;

        return (
            <nav aria-label="navigation" className="text-center">
                <ul className="pagination">
                    <li className={isFirstPage ? 'disabled' : ''}>
                        <a href="javascript:void(0)" aria-label="Previous" onClick={!isFirstPage ? () => this.props.onChange(1) : null}>
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    {this.renderRow(numberOfPage)}
                    <li className={isLastPage ? 'disabled' : ''}>
                        <a href="javascript:void(0)" aria-label="Next" onClick={!isLastPage ? () => this.props.onChange(numberOfPage) : null}>
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Pagination;