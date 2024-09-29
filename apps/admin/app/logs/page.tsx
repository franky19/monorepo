'use client';

import ApiList from '@/helpers/api';
import {fetchApi} from '@/hooks/useFetch';
import moment from 'moment';
import {isEmpty} from 'ramda';
import {useCallback, useEffect, useState} from 'react';
import {JSONTree} from 'react-json-tree';
import withRedux from '@/helpers/withRedux';
import URL from '@/api/config';
import {FaSpinner} from 'react-icons/fa';
import debounce from '@/helpers/debounceText';
import {LogsResponse} from '@/api/logs/route';
import VersionPage from '@/components/VersionPage';
import {getCurl} from '@/helpers/curlBuilder';

const DEBOUNCE_DELAY = 500;
const queueTimeout = {
  current: undefined,
};

const LogsPage = () => {
  const [secretWord, setSecretWord] = useState('');
  const [dataLog, setDataLog] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [lastItemKey, setLastItemKey] = useState('');
  const [lastUpdate, setLastUpdate] = useState('--');
  const [searchResult, setSearchResult] = useState({});
  const [isLoading, setLoading] = useState<boolean>(undefined);
  const isSwitchableEnv = process?.env?.['IS_SWITCHABLE_ENV'] === 'true';

  const translateEndpoint = urlEndpoint => {
    if (urlEndpoint.includes('marketplace/api/v1/orders/ppob')) {
      return 'ucmsPpobStatus';
    }
    const nameEndpoint = Object.keys(URL).find(name =>
      URL?.[name].includes(urlEndpoint.split('?')[0]),
    );
    return nameEndpoint;
  };

  const setData = useCallback(
    (result: LogsResponse, isNotPageOne?: boolean) => {
      if (isNotPageOne) {
        setDataLog(state => ({
          ...result,
          ...state,
        }));
        setSearchResult(state => ({
          ...result,
          ...state,
        }));
      } else {
        setDataLog(result);
        setSearchResult(result);
      }
      const timestamp = moment().format('HH:mm:ss:SSS');
      setLastUpdate(timestamp);
      const lastDataLogItem = Object.keys(result)[0];
      setLastItemKey(lastDataLogItem);
    },
    [],
  );

  const fetchFirebase = useCallback(
    async (lastKey?: string) => {
      try {
        setLoading(true);
        const response = await fetchApi<LogsResponse>({
          url: ApiList.logs,
          method: 'POST',
          body: {
            lastItemKey: lastKey,
          },
        });
        const isNotPageOne = lastKey ? true : false;

        setData(response.data, isNotPageOne);
      } catch (err) {
        // TODO
      } finally {
        setLoading(false);
      }
    },
    [setData],
  );

  useEffect(() => {
    if (isSwitchableEnv) {
      fetchFirebase();
    }
  }, [fetchFirebase, isSwitchableEnv]);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };
  const handleSecretWord = event => {
    setSecretWord(event.target.value);
  };

  const searchNow = () => {
    if (searchTerm && dataLog) {
      const _searchResult = {};
      Object.keys(dataLog).forEach(dataKeyLog => {
        const isMatch = JSON.stringify(dataLog[dataKeyLog])
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        if (isMatch) {
          _searchResult[dataKeyLog] = dataLog[dataKeyLog];
        }
      });
      setSearchResult(_searchResult);
    } else {
      setSearchResult(dataLog);
    }

    if (searchTerm === '') {
      fetchFirebase();
    }
  };

  const keyUpHandler = e => {
    if (e.key === 'Enter' || e.keyCode === 13 || e.keyCode === 8) {
      searchNow();
    }
  };

  const onCopy = (text: string) => {
    const copyToClipboardOldBrowser = (content: string) => {
      try {
        const el = document.createElement('textarea');
        el.value = content;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
      } catch (error) {
        // Err cannot copy
      }
    };

    if (navigator?.clipboard) {
      navigator?.clipboard?.writeText(text ?? '');
    } else {
      copyToClipboardOldBrowser(text);
    }
  };

  const handleScroll = useCallback(() => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight;
    if (bottom && !searchTerm) {
      if (!isLoading) {
        setLoading(true);
        // debounce
        const callFetch = debounce(
          () => {
            fetchFirebase(lastItemKey);
          },
          DEBOUNCE_DELAY,
          queueTimeout,
        );
        callFetch();
      }
    }
  }, [fetchFirebase, isLoading, lastItemKey, searchTerm]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  if (!isSwitchableEnv) {
    return <VersionPage />;
  }

  if (secretWord !== 'sfwow') {
    return (
      <div className="h-full">
        <input
          type="text"
          value={secretWord}
          onChange={handleSecretWord}
          className="w-[100px] border-0 focus:ring-white"
        />
      </div>
    );
  }

  return (
    <div className="m-2 text-sm">
      <div className="flex items-center">
        <p className="mr-1">Last Update: </p>
        {isLoading ? <FaSpinner /> : <p>{lastUpdate}</p>}
      </div>
      <div className="flex mt-2 mb-4 mr-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          onKeyUp={keyUpHandler}
          className="w-full"
        />
        <button onClick={searchNow} className="ml-2">
          SEARCH
        </button>
      </div>
      {!isEmpty(searchResult) &&
        Object.keys(searchResult)
          .reverse()
          .map(dataKey => {
            const timestamp = moment(searchResult?.[dataKey]?.id).format(
              'HH:mm:ss:SSS',
            );
            const endpointName = translateEndpoint(
              searchResult?.[dataKey]?.config?.url ?? '',
            );
            const curlText = getCurl({
              method: searchResult[dataKey].config.method,
              url: searchResult[dataKey].config.url,
              payload: searchResult[dataKey].config.data,
              headers: searchResult[dataKey].config.headers,
            });
            return (
              <div key={dataKey} className="mb-2">
                <details>
                  <summary>
                    {timestamp} {endpointName}
                  </summary>
                  <div className="mb-2">
                    <div className="flex justify-between w-full">Endpoint</div>
                    <p className="font-secondary">
                      {searchResult[dataKey].config.url}
                    </p>
                  </div>
                  <div className="mb-2">
                    Request Body
                    <JSONTree data={searchResult[dataKey].config.data} />
                  </div>
                  <div className="mb-2">
                    Response
                    <JSONTree data={searchResult[dataKey].response} />
                  </div>
                  <div className="mb-2">
                    Request Headers
                    <JSONTree data={searchResult[dataKey].config.headers} />
                  </div>
                  <div className="mb-2">
                    <div className="flex justify-between w-full mb-2">
                      CURL
                      <button
                        className="px-2 text-xs border font-secondary"
                        onClick={() => onCopy(curlText)}>
                        COPY
                      </button>
                    </div>

                    <p className="bg-[#002B36] p-4">
                      <code className="text-[#859901] font-medium">
                        {curlText}
                      </code>
                    </p>
                  </div>
                </details>
              </div>
            );
          })}
      {isLoading === true && (
        <div>
          <h1>Loading....</h1>
        </div>
      )}
      {isLoading === false && isEmpty(searchResult) && (
        <div>
          <h1>No Data :(</h1>
        </div>
      )}
    </div>
  );
};

export default withRedux(LogsPage);
