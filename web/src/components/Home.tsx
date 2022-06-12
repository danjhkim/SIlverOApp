import { FC, useEffect, useState } from 'react';
import { fetchJson } from '../lib/api';
const { REACT_APP_CMS_URL } = process.env;

const HOME: FC<unknown> = () => {
  console.log(REACT_APP_CMS_URL);
  const [info, setInfo] = useState();

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchJson(`${REACT_APP_CMS_URL}/repos`);
        setInfo(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return <div>Home</div>;
};

export default HOME;
