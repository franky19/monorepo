/* eslint-disable @typescript-eslint/no-explicit-any */
export const getCurl = ({
  method,
  url,
  headers,
  payload,
}: {
  method: string;
  url: string;
  headers: any;
  payload: any;
}) => {
  let curlCommand = `curl -X ${method} "${url}"`;

  // Add headers
  for (const header in headers) {
    curlCommand += ` -H "${header}: ${headers[header]}"`;
  }

  // Add payload if exists and method is not GET
  if (method !== 'GET' && payload) {
    curlCommand += ` -d '${JSON.stringify(payload)}'`;
  }

  return curlCommand;
};
