import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#F4F7FF',
  },
  paper: {
    backgroundColor: '#ffffff',
    padding: '40px',
    width: '100%',
    maxWidth: '600px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  title: {
    color: '#6B6BFF',
    fontWeight: '800',
    fontSize: '30px',
    textAlign: 'center',
    marginBottom: '20px',
  },
  uploadButton: {
    display: 'block',
    margin: '20px auto',
    backgroundColor: '#6B6BFF',
    padding: '10px 20px',
    color: '#fff',
    borderRadius: '5px',
    fontWeight: '600',
    marginBottom: '20px',
  },
  imagePreview: {
    maxWidth: '100%',
    marginTop: '20px',
    borderRadius: '5px',
  },
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: '600',
    borderRadius: '5px',
    width: '100%',
    backgroundColor: '#6B6BFF',
  },
  leftPane: {
    flex: 1,
    padding: '20px',
    borderRight: '2px solid #ddd',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflowY: 'auto',
  },
  rightPane: {
    flex: 1,
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflowY: 'auto',
  },
   videoPreview: {
    maxWidth: '100%',
    borderRadius: '5px',
    marginBottom: '20px',
  },
  webcamFeed: {
    borderRadius: '10px',
    width: '100%',
    maxWidth: '500px',
  },
}));

export default useStyles;
