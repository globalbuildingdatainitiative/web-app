import { Blockquote, Text, CloseButton } from '@mantine/core';

interface V2BannerProps {
  onClose?: () => void;
}

export const V2Banner = ({ onClose }: V2BannerProps) => {
  return (
    <Blockquote color="grape" pos="relative">
      <CloseButton
        size="md"
        variant="transparent"
        onClick={() => onClose?.()}
        aria-label="Close banner"
        pos="absolute"
        top={8}
        right={8}
      />
      <Text c="#5C5CAE" pr="xl" size='lg' fw={700}>
        🚀 Exciting News Ahead! We are developing a next-generation version of
        the OpenBDF data model, along with new platform features and updates!{' '}
        <br />
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
    </Blockquote>
  );
};