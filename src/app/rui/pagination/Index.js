import React, { Component, PropTypes } from 'react';

class Pagination extends React.Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        currentPage: 1,
        perPage: 3,
        total: 0,
        totalPage: 0
    };

    static propTypes = {
        currentPage: PropTypes.number,
        perPage: PropTypes.number,
        total: PropTypes.number,
        onPageChange: PropTypes.func,
    };

    renderRow(numberOfPage) {
        const rows = [];
        for (let page = 1; page <= numberOfPage; page++) {
            rows.push(
                <li key={page} className={this.props.currentPage === page ? 'active' : ''}>
                    <a href="javascript:void(0)" onClick={() => this.props.onChange(page)}>{page}</a>
                </li>
            );
        }
        return rows;
    }

    render() {
        const numberOfPage = this.props.totalPage;
        const isFirstPage = this.props.currentPage === 1;
        const isLastPage = this.props.currentPage === numberOfPage;

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