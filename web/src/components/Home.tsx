import { FC, useEffect, useState } from 'react';
import { fetchJson } from '../lib/api';
const { REACT_APP_CMS_URL } = process.env;

const HOME: FC<unknown> = () => {
  const [info, setInfo] = useState<any[]>([]);

  const listSorter = (arr: any[]) => {
    arr.sort(function (a, b) {
      const keyA = new Date(a.created_at);
      const keyB = new Date(b.created_at);
      // Compare the 2 dates
      if (keyA < keyB) {
        return -1;
      }
      if (keyA > keyB) {
        return 1;
      }
      return 0;
    });
    setInfo(arr);
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchJson(`${REACT_APP_CMS_URL}/repos`);

        listSorter(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const renderList = () => {
    if (info) {
      return info.map((item) => {
        return (
          <div key={item.id} className="itembox">
            <div>
              <span className="head">Name:</span> {item.name}
            </div>
            <div>
              <span className="head">Description:</span> {item.description}
            </div>
            <div>
              <span className="head">Language:</span> {item.language}
            </div>
            <div>
              <span className="head">Fork Count:</span> {item.forks_count}
            </div>
            <div>
              <span className="head">Fork Count:</span> {item.created_at}
            </div>
          </div>
        );
      });
    }
  };

  return (
    <div>
      <h1>Home</h1>
      <div className="list">{renderList()}</div>
    </div>
  );
};

export default HOME;
