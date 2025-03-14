import React from 'react';
import { NamespaceSelectorContext } from '~/context/NamespaceSelectorContext';
import { useDeepCompareMemoize } from '~/utilities/useDeepCompareMemoize';

const useQueryParamNamespaces = (): Record<string, unknown> => {
  const { preferredNamespace: namespaceSelector } = React.useContext(NamespaceSelectorContext);
  const namespace = namespaceSelector?.name;

  return useDeepCompareMemoize({ namespace });
};

export default useQueryParamNamespaces;
