import Button from '@material-ui/core/Button';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  &.MuiButton-root {
    background: linear-gradient(90deg, #4b418c 0%, #8d4041 100%);
    color: white;
    padding: 10px 50px;
  }
`;

export default StyledButton;
