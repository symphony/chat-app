import { FC, ReactElement } from 'react';

// = types =
interface ChatboxProps {
  messages: { self: boolean, message: string }[];
};

const Chatbox: FC<ChatboxProps> = ({ messages }): ReactElement => {
  return (
    <ul>
      {messages.map(({ self, message }, i) => (
        <li
          key={message.split(' ')[0] + i}
          className={self ? 'right' : 'left'}
        >
          {message}
        </li>
      ))}
    </ul>
  );
};

export default Chatbox;