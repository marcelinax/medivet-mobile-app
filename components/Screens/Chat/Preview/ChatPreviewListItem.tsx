import { Message } from 'types/api/chat/types';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { User } from 'types/api/user/types';
import { useMemo } from 'react';
import { Card } from 'components/Composition/Card';
import colors from 'themes/colors';
import { Avatar } from 'components/Composition/Avatar';
import { ChatPreviewListItemDateSeparator } from 'components/Screens/Chat/Preview/ChatPreviewListItemDateSeparator';

interface Props {
  message: Message;
  forSameUser: boolean;
  containsSeparatorDate: boolean;
}

export const ChatPreviewListItem = ({ message, forSameUser, containsSeparatorDate }: Props) => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser) as User;
  const isLoggedUser = useMemo(() => message.issuer.id === currentUser.id, [ message.issuer.id ]);

  // Moje Wiadomości powinny mieć znaczek czy użytkownik odczytał
  // można z poziomu navigation header usunac zarchiwizować/przywrócić wiadomości

  const render = useMemo(() => (
    <View style={styles.container}>
      {containsSeparatorDate && (
        <ChatPreviewListItemDateSeparator date={message.createdAt} />
      )}
      <View style={[
        isLoggedUser
        && styles.loggedUserContainer,
        { marginBottom: forSameUser ? 10 : 5 },
      ]}
      >
        <View style={styles.innerContainer}>
          {!isLoggedUser && !forSameUser && (
            <View style={styles.avatarContainer}>
              <Avatar
                size="small"
                url={message.issuer.profilePhotoUrl}
              />
            </View>
          )}
          <Card style={[
            styles.card,
            {
              backgroundColor: isLoggedUser ? colors.PRIMARY : colors.GRAY_LIGHT,
              marginLeft: forSameUser && !isLoggedUser ? 60 : 0,
            },
          ]}
          >
            <Text style={[
              styles.message,
              { color: isLoggedUser ? colors.WHITE : colors.BLACK },
            ]}
            >
              {message.message}
            </Text>
          </Card>
        </View>
      </View>
    </View>
  ), [ JSON.stringify(message), forSameUser, containsSeparatorDate ]);

  return render;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  innerContainer: {
    maxWidth: '85%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  card: {
    minWidth: 'auto',
    maxWidth: '85%',
    width: 'auto',
    justifyContent: 'center',
  },
  avatarContainer: {
    marginRight: 10,
  },
  loggedUserContainer: {
    alignItems: 'flex-end',
  },
  message: {
    fontWeight: '500',
  },
});
