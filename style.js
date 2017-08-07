import { create } from 'jss'
import preset from 'jss-preset-default'
import createGenerateClassName from 'material-ui/styles/createGenerateClassName';
import { createMuiTheme } from 'material-ui/styles'
import createPalette from 'material-ui/styles/palette'
import { red, blue } from 'material-ui/colors'

export function theme() {
	return createMuiTheme({
	  palette: createPalette({
	    primary: blue,
	    accent: red,
	    type: 'light',
	    overrides: {
	      MuiCircularProgress: {
	        primaryColor: {
	          color: 'white',
	        },
	      },
	    },
	  }),
	})
}

// Server side only
export function configureJss() {

   // Configure JSS
  const jss = create(preset());
  jss.options.createGenerateClassName = createGenerateClassName;

  return jss
}
