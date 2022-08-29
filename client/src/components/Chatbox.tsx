import { FC, ReactElement } from 'react';

// = types =
interface ChatboxProps {
  messages: [];
};

/* @ts-ignore */
const Chatbox: FC<ChatboxProps> = ({ messages }): ReactElement => {
  return (
    <ul>
      {messages.map(({ self, message }, i) => (
        < li
          key={i}
          className={self ? 'right' : 'left'}
        >
          {message}
        </li>
      ))
      }
    </ul >
  );
};

export default Chatbox;