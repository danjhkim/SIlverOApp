import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

const Modal = (props) => {
  const [marked, setMarked] = useState();

  useEffect(() => {
    (async () => {
      try {
        const readme = await fetch(
          `https://raw.githubusercontent.com/${props.info.full_name}/master/README.md`
        );

        const readmeformat = await readme.text();
        setMarked(readmeformat);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [props.info.full_name]);

  const Dateformat = () => {
    const newDate = new Date(props.info.pushed_at);
    return newDate.toString();
  };

  const renderMarkdown = () => {
    if (marked === '404: Not Found') {
      return null;
    } else {
      return (
        <>
          <div className="README">README</div>
          <div className="readbody">
            <ReactMarkdown children={marked} rehypePlugins={[rehypeRaw]} />
          </div>
        </>
      );
    }
  };

  return ReactDOM.createPortal(
    <div className="ui" onClick={(e) => props.setOpenModal(false)}>
      <div className="box" onClick={(e) => e.stopPropagation()}>
        <span onClick={(e) => props.setOpenModal(false)} className="close">
          &times;
        </span>
        <div>Commit date {Dateformat()}</div>
        <div>Author: {props.info.full_name}</div>
        {renderMarkdown()}
      </div>
    </div>,
    document.querySelector('#modal')
  );
};

export default Modal;
