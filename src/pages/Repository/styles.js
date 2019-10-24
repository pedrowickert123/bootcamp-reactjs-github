import styled from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueList = styled.ul`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #7159c1;
          }
        }

        span {
          background: #eee;
          color: #333;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          line-height: 15px;
          padding: 3px 4px;
          margin-left: 10px;
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;

export const FilterList = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

export const Button = styled.button`
  border: 0;
  background: ${props =>
    props.filter === props.activatedFilter ? '#7159c1' : '#eee'};
  padding: 10px 5px;
  border-radius: 4px;
  width: 100%;
  color: ${props =>
    props.filter === props.activatedFilter ? '#eee' : '#7159c1'};
  font-weight: bold;

  & + button {
    margin-left: 20px;
  }

  &:hover {
    color: #eee;
    background: #7159c1;
    transition: 0.3s;
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const PaginationButton = styled.button.attrs(props => ({
  disabled: props.disabled,
}))`
  border: 0;
  background: #eee;
  margin-top: 30px;
  padding: 10px 5px;
  border-radius: 4px;
  width: 100px;
  color: #7159c1;
  font-weight: bold;

  &:hover {
    color: #eee;
    background: #7159c1;
    transition: 0.3s;
  }

  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
