import request, { stringifyBody } from 'utils/request';
import {
  UploadRequest,
  InlineResponse200,
  StatusResponse,
  UnfurlURL,
  UnfurlRequest,
} from 'interfaces';

const requestOptions = (param: any, method = 'POST') => ({
  method,
  body: stringifyBody(param),
});

/**
 * Upload file to CDN
 */
export const uploadFile = (param: UploadRequest) => {
  const form = new FormData();
  form.append('f', param.f);
  if (param.path) form.append('path', param.path);

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
    },
    body: form,
  };

  return request<InlineResponse200>('/upload', options);
};

/**
 * Delete a uploaded file
 */
export const deleteFile = (file: string) => {
  return request<StatusResponse>(`/upload?file=${file}`, {
    method: 'DELETE',
  });
};

/**
 * Unfurl url
 */
export const unfurlUrl = (param: UnfurlRequest) => {
  return request<UnfurlURL>(`/unfurl`, requestOptions(param));
};
