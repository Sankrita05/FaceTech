import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column', // Needed for logout button above the main content
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#F4F7FF',
    padding: '20px',
  },
  logoutBox: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '10px',
  },
  logoutButton: {
    padding: '6px 16px',
    fontWeight: 600,
    fontSize: '14px',
    backgroundColor: '#FF4D4F',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#d9363e',
    },
  },
  paper: {
    backgroundColor: '#ffffff',
    padding: '40px',
    width: '100%',
    maxWidth: '600px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  title: {
    color: '#6B6BFF',
    fontWeight: '800',
    fontSize: '30px',
    marginBottom: '20px',
  },
  subtitle: {
    marginBottom: '30px',
    fontSize: '18px',
    color: '#666',
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    margin: '10px 0',
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: '600',
    borderRadius: '5px',
    width: '100%',
  },
}));

export default useStyles;
