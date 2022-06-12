import { useEffect } from 'react';
import ReactDOM from 'react-dom';

const Modal = (props) => {
  useEffect(() => {
    (async () => {
      const readme = await fetch(
        `https://raw.githubusercontent.com/${props.info.full_name}/master/README.md`
      );

      const readmeformat = await readme.text();
      console.log(readmeformat);
    })();
  }, [props.info.full_name]);

  const Dateformat = () => {
    const newDate = new Date(props.info.pushed_at);
    return newDate.toString();
  };

  return ReactDOM.createPortal(
    <div className="ui" onClick={(e) => props.setOpenModal(false)}>
      <div className="box" onClick={(e) => e.stopPropagation()}>
        <span onClick={(e) => props.setOpenModal(false)} className="close">
          &times;
        </span>
        <div>Commit date {Dateformat()}</div>
        <div>Author: {props.info.full_name}</div>
        <div className="README">README</div>
        <div className="readbody">{props.info.message}</div>
      </div>
    </div>,
    document.querySelector('#modal')
  );
};

export default Modal;
