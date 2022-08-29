import { useState, FC, ReactElement, FormEventHandler } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

interface ChatFormProps {
  username: string;
  onSend: (message: string) => void;
};

// = styles =
const buttonStyle = { color: 'white', backgroundColor: 'secondary.dark', '&:hover': { backgroundColor: 'secondary.light', } }

const ChatForm: FC<ChatFormProps> = ({ username, onSend }): ReactElement => {
  const [message, setMessage] = useState('');

  const handleSend: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!message) return;

    onSend(message);
    setMessage('');
  };
  return (
    <Box sx={{ display: 'flex', }} >
      <form className='connect' onSubmit={handleSend}>
        <TextField
          label='Chat'
          value={message}
          onChange={((e) => { setMessage(e.target.value) })}
          variant='filled'
          color='secondary'
          sx={{ backgroundColor: 'primary.dark', }} />

        <Button variant='contained' type='submit' sx={buttonStyle} >Connect</Button>
      </form>
    </Box>
  )
};

export default ChatForm;