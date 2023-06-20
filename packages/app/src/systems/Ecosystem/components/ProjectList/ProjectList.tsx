import { cssObj } from '@fuel-ui/css';
import { Grid } from '@fuel-ui/react';

import { type Project } from '../../types';
import { ProjectItem } from '../ProjectItem';

import { ProjectListLoading } from './ProjectListLoading';

type ProjectListProps = {
  projects: Project[];
  isLoading?: boolean;
};

export const ProjectList = ({ projects, isLoading }: ProjectListProps) => {
  if (isLoading) return <ProjectList.Loading />;
  return (
    <Grid
      gap="$8"
      templateColumns="repeat(2, 1fr)"
      templateRows="repeat(2, 1fr)"
      css={styles.grid}
    >
      {projects.map((project) => (
        <ProjectItem {...project} key={project.url} />
      ))}
    </Grid>
  );
};

const styles = {
  grid: cssObj({
    /// show only 1 column on mobile
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
    },
  }),
};

ProjectList.Loading = ProjectListLoading;
