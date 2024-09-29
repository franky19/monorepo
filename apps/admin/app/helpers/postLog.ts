import axios from 'axios';

const databaseSecret = 'JN5ep511HjzycXISjnCEXyyDOJ7kX0PUDNUTHWCk';

export const postLog = async ({
  functionName,
  config,
  response,
  jsonId,
}: {
  functionName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  response: any;
  jsonId: string;
}) => {
  const payload = {
    id: new Date(),
    functionName,
    config,
    response,
  };

  const body = JSON.stringify(payload);

  const axiosConfig = {
    method: 'POST',
    url:
      `https://mysmartfren-1049.firebaseio.com/${jsonId}.json?auth=` +
      databaseSecret,
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    data: body,
  };

  axios
    .request(axiosConfig)
    .then(() => {})
    .catch(() => {});
};
