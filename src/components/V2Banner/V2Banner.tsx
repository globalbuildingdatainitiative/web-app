import { useState } from 'react';
import { Blockquote, Text, CloseButton, Group } from '@mantine/core';

export const V2Banner = () => {
  const [opened, setOpened] = useState(true);

  if (!opened) {
    return null;
  }

  return (
    <Blockquote color="grape">
      <Group justify="space-between" align="flex-start" wrap="nowrap">
        <Text c="#5C5CAE">
          🚀 Exciting News Ahead! We are developing a next-generation version of
          the OpenBDF data model, along with new platform features and updates! <br />
          Apply to join the Gen 2 Beta Testing via this{' '}
          <a
            href="https://forms.gle/AN8RFNNneRTcs5zv9"
            target="_blank"
            rel="noopener noreferrer"
          >
            form
          </a>
          !
        </Text>
        <CloseButton
          size="sm"
          variant="transparent"
          onClick={() => setOpened(false)}
          aria-label="Close banner"
        />
      </Group>
    </Blockquote>
  );
};