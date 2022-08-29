import { FC } from 'react';

interface ChatboxProps {

  messages: { self: boolean, message: string }[];
};

const Chatbox: FC<ChatboxProps> = ({ messages }) => {
  return messages.map(({ self, message }, i) => (
    <p
      key={message.split(' ')[0] + i}
      className={self ? 'right' : 'left'}
    >
      {message}
    </p>
  ));
};

export default Chatbox;