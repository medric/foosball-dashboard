import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { lightGreen500 } from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: lightGreen500,
  },
  appBar: {
    height: 50,
  },
});

export default muiTheme;