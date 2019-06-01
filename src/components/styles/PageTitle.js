import styled from 'styled-components';

const PageTitle = styled.h1`
  font-size: 34px;
  line-height: 40px;
  font-family: Ubuntu;
  font-weight: 300;
  text-align: center;
  margin-top: 0px;
  @media (min-width: 600px) {
    margin-top: 10px;
    font-size: 38px;
    line-height: 44px;
  }
  @media (min-width: 960px) {
    font-size: 42px;
    line-height: 48px;
  }
`;

export default PageTitle;