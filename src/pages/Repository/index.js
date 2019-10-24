import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../services/api';

import {
  Loading,
  Owner,
  IssueList,
  FilterList,
  Button,
  Pagination,
  PaginationButton,
} from './styles';

import Container from '../../components/Container';

export default class Repoitory extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    filter: 'open',
    perPage: 5,
    page: 1,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { filter, page } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: filter,
          per_page: 5,
          page,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  handleFilterClick = async e => {
    await this.setState({ filter: e, page: 1 });
    this.loadIssues();
  };

  handlePageClick = async e => {
    const { page } = this.state;
    await this.setState({
      page: e === 'back' ? page - 1 : page + 1,
    });
    this.loadIssues();
  };

  async loadIssues() {
    const { match } = this.props;
    const { filter, perPage, page } = this.state;
    const repoName = decodeURIComponent(match.params.repository);

    const issues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: filter,
        per_page: filter !== 'all' && perPage,
        page,
      },
    });

    this.setState({
      issues: issues.data,
    });
  }

  render() {
    const { repository, issues, loading, filter, page } = this.state;

    if (loading) {
      return <Loading>Carregando...</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <FilterList>
          <Button
            filter="open"
            activatedFilter={filter}
            type="button"
            onClick={() => {
              this.handleFilterClick('open');
            }}
          >
            Opened
          </Button>
          <Button
            filter="closed"
            activatedFilter={filter}
            type="button"
            onClick={() => {
              this.handleFilterClick('closed');
            }}
          >
            Closed
          </Button>
          <Button
            filter="all"
            activatedFilter={filter}
            type="button"
            onClick={() => {
              this.handleFilterClick('all');
            }}
          >
            All
          </Button>
        </FilterList>

        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url} target="_blank">
                    {issue.title}
                  </a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>

        <Pagination>
          <PaginationButton
            disabled={page === 1}
            onClick={() => {
              this.handlePageClick('back');
            }}
          >
            Prev
          </PaginationButton>
          <PaginationButton
            disabled={
              (filter !== 'all' && issues.length !== 5) ||
              (filter === 'all' && issues.length !== 30)
            }
            onClick={() => {
              this.handlePageClick('forward');
            }}
          >
            Next
          </PaginationButton>
        </Pagination>
      </Container>
    );
  }
}
