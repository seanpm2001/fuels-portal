import { cssObj } from '@fuel-ui/css';
import { Box, Card, Button, Text } from '@fuel-ui/react';
import { motion } from 'framer-motion';
import { type FC } from 'react';
import { animations } from '~/systems/Core';

import type { Project } from '../../types';
import { ProjecImage } from '../ProjectImage';

import { ProjectItemLoader } from './ProjectItemLoader';

const MotionCard = motion(Card);

export type ProjectItemProps = Project & {
  onPress?: () => void;
  onSelect?: (project: Project) => void;
};

type ProjectItemComponent = FC<ProjectItemProps> & {
  Loader: typeof ProjectItemLoader;
};

export const ProjectItem: ProjectItemComponent = ({
  name,
  description,
  image,
  url,
  twitter,
  discord,
  github,
  isLive,
  onSelect,
  tags,
}: ProjectItemProps) => {
  const onCardPress = () => {
    if (onSelect) {
      onSelect({
        name,
        description,
        image,
        url,
        twitter,
        discord,
        github,
        isLive,
        tags,
      });
    }
  };

  return (
    <MotionCard
      withDividers
      {...animations.appearIn({
        transition: { type: 'spring' },
      })}
      onClick={onCardPress}
      variant="outlined"
      css={styles.card}
    >
      <Card.Body css={styles.body}>
        <Box css={styles.image}>
          <ProjecImage name={name} image={image} />
        </Box>
        <Box.Stack gap="$2" justify="space-between" css={styles.details}>
          <Box.Stack align="flex-start" gap="$1">
            <Box.Flex
              align="flex-start"
              justify="space-between"
              css={styles.title}
            >
              <Text fontSize="base" color="intentsBase12">
                {name}
              </Text>
            </Box.Flex>
            <Text fontSize="sm"> {description}</Text>
          </Box.Stack>
        </Box.Stack>
      </Card.Body>
      <Card.Footer css={styles.cardFooter} gap="$3" direction="row-reverse">
        {isLive ? (
          <Button intent="base" size="xs" variant="outlined">
            <Box css={styles.dot} />
            {'Live on Testnet'}
          </Button>
        ) : (
          <Button intent="base" size="xs" variant="outlined">
            <Box css={styles.dotBuilding} />
            {'Building'}
          </Button>
        )}
        <Box
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '10px',
            marginLeft: 'auto',
          }}
        >
          {twitter && (
            <Button
              href={twitter}
              size="xs"
              intent="error"
              variant="ghost"
              leftIcon={'BrandX'}
            ></Button>
          )}
          {github && (
            <Button
              href={github}
              size="xs"
              leftIcon={'BrandGithub'}
              variant="ghost"
            ></Button>
          )}
          {discord && (
            <Button
              href={discord}
              size="xs"
              intent="info"
              leftIcon={'BrandDiscord'}
              variant="ghost"
            ></Button>
          )}
          <Button
            size="xs"
            variant="outlined"
            intent="base"
            leftIcon={'ExternalLink'}
          ></Button>
        </Box>
      </Card.Footer>
    </MotionCard>
  );
};

const styles = {
  card: cssObj({
    transition: 'transform 0.2s ease-in-out, border 0.2s ease-in-out',
    '&:hover': {
      textDecoration: 'none !important',
      border: '1px solid $intentsBase8',
      backgroundImage:
        'linear-gradient($transparent, rgb(15, 15, 15)) !important',
      'html[class="fuel_light-theme"] &': {
        backgroundImage:
          'linear-gradient($transparent, rgb(245, 245, 245)) !important',
      },
    },
  }),
  image: cssObj({
    height: '40px',
    width: '40px',
    border: '1px solid #2E2E2E',
    borderRadius: '$sm',
    overflow: 'hidden',
  }),
  cardFooter: cssObj({
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  }),
  details: cssObj({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  }),

  link: cssObj({
    textDecoration: 'underline',
    padding: '0',
    pointerEvents: 'none',
  }),
  dot: cssObj({
    width: '$1',
    height: '$1',
    borderRadius: '50%',
    border: '1px solid #A9F6D5',
    background: '#00F58C',
    boxShadow: '0px 0px 4px 0px #00F58C',
  }),
  dotBuilding: cssObj({
    width: '$1',
    height: '$1',
    borderRadius: '50%',
    border: '1px solid #E5C06F',
    background: '#F3B42C',
    boxShadow: '0px 0px 4px 0px #F3B42C',
  }),
  tag: cssObj({
    color: '$intentsBase12',
    borderRadius: '$sm',
    padding: '0 $1',
    backgroundColor: '$gray5',
    marginRight: '8px',
  }),
  title: cssObj({
    width: '100%',
    fontWeight: 'bold',
  }),
  body: cssObj({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: '$4',
    justifyContent: 'flex-start',
    padding: '$6',
    flex: '1 1 auto',
    minHeight: '95px',
  }),
  statusContainer: cssObj({
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    marginTop: 'auto',
  }),
};

ProjectItem.Loader = ProjectItemLoader;
