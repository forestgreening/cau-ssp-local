import styled from 'styled-components';

const AppTitle = styled.div`
  width: 100%;
  color: #b153be;
  font-size: 30px;
  text-align: center;
  padding-top : 5vh;
  margin-bottom: 5vh;
`;

const Title = () => {
  return (
    <AppTitle>Social Safety<br />Platform</AppTitle>
  );
};

export default Title;
