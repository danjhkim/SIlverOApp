import { FC, useEffect, useState } from 'react';
import { fetchJson } from '../lib/api';
import Modal from './Modal';
const { REACT_APP_CMS_URL } = process.env;

const HOME: FC<unknown> = () => {
  const [openModal, setOpenModal] = useState(false);
  const [info, setInfo] = useState<any[]>([]);
  const [filteredLang, setFilteredLang] = useState<any[]>([]);
  const [details, setDetails] = useState<object>();

  //initial api call for data
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

  //Open Modal for detailed info
  const openDetails = (e: React.MouseEvent<HTMLDivElement>, item: object) => {
    e.stopPropagation();
    setOpenModal(true);
    setDetails(item);
  };

  //language filter
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

  //date sorter
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

  const renderList = () => {
    if (filteredLang) {
      return filteredLang.map((item, index) => {
        return (
          <div
            key={item.id}
            className="itembox"
            onClick={(e) => openDetails(e, item)}
          >
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

  if (openModal && details) {
    return <Modal info={details} setOpenModal={setOpenModal} />;
  }

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
