/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';

import { getReposAndDependencies } from '../utils/dependencies';

const REPOS = [
  {
    name: 'fuel-core',
    version: '0.20.8',
    isCorrect: true,
  },
  {
    name: 'sway',
    version: '0.46.1',
    dependencies: [
      {
        name: 'fuel-core',
      },
    ],
  },
  {
    name: 'fuels-ts',
    version: '0.67.0',
    dependencies: [
      {
        name: 'fuel-core',
      },
      {
        name: 'sway',
      },
    ],
  },
  {
    name: 'fuels-wallet',
    version: '0.13.10',
    dependencies: [
      {
        name: 'fuel-core',
      },
      {
        name: 'sway',
      },
      {
        name: 'fuels-ts',
      },
    ],
  },
  {
    name: 'fuel-bridge',
    version: '0.3.0',
    dependencies: [
      {
        name: 'fuel-core',
      },
      {
        name: 'fuels-ts',
      },
    ],
  },
  {
    name: 'fuels-portal',
    dependencies: [
      {
        name: 'fuel-core',
      },
      {
        name: 'fuels-ts',
      },
      {
        name: 'fuel-bridge',
      },
      {
        name: 'fuels-wallet',
      },
    ],
  },
];

export const useStableVersion = () => {
  const [repos, setRepos] = useState<any>([]);
  useEffect(() => {
    const getRepos = async () => {
      const analyzedRepos = await getReposAndDependencies(REPOS);

      setRepos(analyzedRepos);
    };

    getRepos();
  }, []);

  return { repos };
};
