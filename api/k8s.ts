import { APIOptions } from '~/api/types';
import { handleRestFailures } from '~/api/errorUtils';
import { isModelRegistryResponse, restGET } from '~/api/apiUtils';
import { BFF_API_VERSION } from '~/utilities/const';
import { URL_PREFIX } from '~/utilities/const';
import { Namespace, UserSettings } from '~/types';


export const getUser =
  (hostPath: string) =>
  (opts: APIOptions): Promise<UserSettings> =>
    handleRestFailures(
      restGET(hostPath, `${URL_PREFIX}/api/${BFF_API_VERSION}/user`, {}, opts),
    ).then((response) => {
      if (isModelRegistryResponse<UserSettings>(response)) {
        return response.data;
      }
      throw new Error('Invalid response format');
    });

export const getNamespaces =
  (hostPath: string) =>
  (opts: APIOptions): Promise<Namespace[]> =>
    handleRestFailures(
      restGET(hostPath, `${URL_PREFIX}/api/${BFF_API_VERSION}/namespaces`, {}, opts),
    ).then((response) => {
      if (isModelRegistryResponse<Namespace[]>(response)) {
        return response.data;
      }
      throw new Error('Invalid response format');
    });
