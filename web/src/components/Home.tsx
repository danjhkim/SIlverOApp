import { FC, useEffect, useState } from 'react';
import { fetchJson } from '../lib/api';
const { REACT_APP_CMS_URL } = process.env;

const HOME: FC<unknown> = () => {
  const [info, setInfo] = useState<any[]>([]);
  const [filteredLang, setFilteredLang] = useState<any[]>([]);

  const filterLang = (e: React.MouseEvent<HTMLButtonElement>, num: number) => {
    e.stopPropagation();
    if (num === 2) {
      const filteredphp = info.filter((item) => {
        return item.language === 'PHP';
      });
      setFilteredLang(filteredphp);
    } else if (num === 3) {
      const filteredtypescript = info.filter((item) => {
        return item.language === 'TypeScript';
      });
      setFilteredLang(filteredtypescript);
    } else {
      setFilteredLang(info);
    }
  };

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
    setFilteredLang(arr);
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchJson(`${REACT_APP_CMS_URL}/repos`);
        setInfo(data);
        listSorter(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const renderList = () => {
    if (filteredLang) {
      return filteredLang.map((item) => {
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
    <div className="Home">
      <h1>Home</h1>
      <button onClick={(e) => filterLang(e, 1)}>All</button>
      <button onClick={(e) => filterLang(e, 2)}>PHP</button>
      <button onClick={(e) => filterLang(e, 3)}>TypeScript</button>
      <div className="list">{renderList()}</div>
    </div>
  );
};

export default HOME;
