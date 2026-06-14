import {
  MouseEvent,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';

function GuideWindowMessage(props: {
  counter: number;
  messageList: string[];
  navigate: MouseEventHandler;
}) {
  const { counter: initCounter, messageList, navigate } = props;
  const [counter, setCounter] = useState(initCounter);
  const [displayedText, setDisplayedText] = useState('');
  const intervalRef = useRef<number>();

  useEffect(() => {
    const message = messageList[counter];
    if (intervalRef.current !== undefined) {
      window.clearInterval(intervalRef.current);
    }

    setDisplayedText('');

    if (message.length === 0) {
      return undefined;
    }

    let nextLength = 0;
    intervalRef.current = window.setInterval(() => {
      nextLength += 1;
      setDisplayedText(message.slice(0, nextLength));

      if (nextLength >= message.length) {
        if (intervalRef.current !== undefined) {
          window.clearInterval(intervalRef.current);
          intervalRef.current = undefined;
        }
      }
    }, 15);

    return () => {
      if (intervalRef.current !== undefined) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = undefined;
      }
    };
  }, [counter, messageList]);

  const increment: MouseEventHandler = (e: MouseEvent) => {
    if (displayedText !== messageList[counter]) {
      if (intervalRef.current !== undefined) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = undefined;
      }
      setDisplayedText(messageList[counter]);
      return;
    }

    if (counter + 1 < messageList.length) setCounter(counter + 1);
    else {
      navigate(e);
    }
  };

  return (
    <div>
      <div
        style={{
          position: 'relative',
          display: 'flex',
          whiteSpace: 'pre-line',
          width: '780px',
          height: '110px',
          color: '#71FF2F',
          fontFamily: 'SairaCondensed',
          fontSize: '26px',
          fontStyle: 'normal',
          lineHeight: '110%' /* 39.6px */,
          letterSpacing: '0.25px',
        }}
      >
        {displayedText}
      </div>

      <div
        style={{
          position: 'relative',
          display: 'flex',
          top: '30px',
          whiteSpace: 'pre-line',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <button
          type='button'
          style={{
            width: '100px',
            height: '45px',
            color: '#341948',
            backgroundColor: '#71FF2F',
            fontFamily: 'SairaCondensed',
            fontSize: '26px',
            fontStyle: 'normal',
            lineHeight: '110%' /* 39.6px */,
            letterSpacing: '0.25px',
          }}
          onClick={increment}
        >
          OK
        </button>
      </div>
    </div>
  );
}

export default GuideWindowMessage;
