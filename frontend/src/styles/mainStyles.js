import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  container: {
    backgroundColor: '#F4F7FF',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
    
  },
  paper: {
    backgroundColor: '#ffffff',
    padding: '32px',
    maxWidth: '400px',
    width: '100%',
    borderRadius: '16px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '24px',
  },
  title: {
    color: '#6416d0',
    fontWeight: '700!important',
    fontSize: '20px !important',
    fontFamily: 'Inter, sans-serif',
  },
  heading: {
    fontWeight: 700,
    fontSize: '24px',
    marginBottom: '10px',
    color:'#391d85',
    textAlign: 'center',
  },
  subText: {
    fontSize: '14px',
    color: '#555',
    marginBottom: '16px',
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  optionsRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '16px',
    marginBottom: '24px',
  },
  forgot: {
    color: '#391d85',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  button: {
    backgroundColor: '#6B6BFF',
    color: '#fff',
    fontWeight: 600,
    padding: '10px',
    borderRadius: '8px',
    marginTop: '8px',
    '&:hover': {
      backgroundColor: '#5757d1',
    },
  },
  footer: {
    textAlign: 'center',
  },
  link: {
    color: '#6B6BFF',
    fontWeight: 500,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
    otpInput: {
    width: '100%',
    marginBottom: '20px',
  },
  },
}));

export default useStyles;
