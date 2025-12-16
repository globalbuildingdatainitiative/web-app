import { ActionIcon, Card, HoverCard, Text } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  hoverCardContent?: string;
}

export function StatsCard(props: StatsCardProps) {
  return (
    <Card style={{ minWidth: 100 }} shadow="xs" padding="xs" radius="md" withBorder>
      <div style={{ paddingInline: 6 }}>
        <div style={{ position: 'relative', paddingRight: props.hoverCardContent ? 24 : 0 }}>
          <Text size="sm" c="dimmed">
            {props.title}
          </Text>
          {props.hoverCardContent && (
            <div style={{ position: 'absolute', top: 0, right: 0, transform: 'translate(6px, -4px)' }}>
              <HoverCard width={300} shadow='xl'>
                <HoverCard.Target>
                  <ActionIcon variant='transparent' color='gray'>
                    <IconInfoCircle />
                  </ActionIcon>
                </HoverCard.Target>
                <HoverCard.Dropdown>
                  <Text size='sm'>
                    {props.hoverCardContent}
                  </Text>
                </HoverCard.Dropdown>
              </HoverCard>
            </div>
          )}
        </div>
        <Text size="xl">
          {props.value}
        </Text>
      </div>
    </Card>
  )
}