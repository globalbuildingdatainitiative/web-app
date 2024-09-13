import { Button, Text } from '@mantine/core'
import { IconLogout } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'supertokens-auth-react/recipe/emailpassword'
import { useUserContext } from '@context'
import { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/client'

export const SignOut = () => {
  const navigate = useNavigate();
  const { user, refetchUser } = useUserContext();
  const client = useApolloClient();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Refetch user data when the component mounts
    refetchUser();
  }, [refetchUser]);

  async function onLogout() {
    await client.resetStore();
    await signOut();
    localStorage.removeItem('userId');
    navigate('/auth');
  }

  console.log("Current user in SignOut:", user);

  if (!user) {
    return <Button variant="outline" c="gray" size="lg" radius="lg" disabled>Loading...</Button>;
  }

  const displayName = user.firstName || user.email || "Sign Out";
  const organizationName = user.organization?.name || 'Unknown';

  return (
    <Button
      variant="outline"
      c="gray"
      size="lg"
      radius="lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onLogout}
    >
      {isHovered ? (
        <>
          <IconLogout size={16} />
          <Text style={{ marginLeft: 8 }}>Sign Out</Text>
        </>
      ) : (
        <Text
          style={{
            whiteSpace: 'normal',
            width: '200px',
          }}
        >
          {displayName} from {organizationName}
        </Text>
      )}
    </Button>
  );
};