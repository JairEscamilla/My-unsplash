import styled from 'styled-components';

export const StyledLogin = styled.section `
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & .main-content {
    width: 80%;
    max-width: 450px;
  }
`;

export const GoogleAuthWrapper = styled.div `
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 30px 0;
`;

export const OrWrapper = styled.div ` 
  text-align: center;
`

export const SignUpWrapper = styled.div `
  text-align: center;
  margin-top: 25px;
  & .link {
    color: #3DB46D;
    margin-left: 10px;
  }
`;

export const HeaderWrapper = styled.div `
  text-align: center;

  & span {
    display: block;
    margin-top: 20px;
    font-size: 1rem;
  }

  & img {
    display: block;
    width: 250px;
    margin: 0 auto 20px auto;
  }
`;