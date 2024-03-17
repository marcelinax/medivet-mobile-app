import {
  StyleSheet, Text, TouchableWithoutFeedback, View,
} from 'react-native';
import { Conversation } from 'types/api/chat/types';
import { Avatar } from 'components/Composition/Avatar';
import { listItemStyles, simpleListItemStyles } from 'screens/utils/styles';
import { Card } from 'components/Composition/Card';
import moment from 'moment';
import colors from 'themes/colors';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { Ionicons } from '@expo/vector-icons';
import icons from 'themes/icons';

interface Props {
  conversation: Conversation
}

export const MessageListItem = ({ conversation }: Props) => {
  const { messages, user, lastUpdate } = conversation;
  const { currentUser } = useSelector((state: RootState) => state.user);

  const getParsedDate = () => {
    const today = moment().set({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    });
    const sevenDaysAgo = moment().subtract(7, 'd').set({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    });
    const lastUpdateDate = moment(lastUpdate).set({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    });

    if (lastUpdateDate.isSame(today)) {
      return moment(lastUpdate).format('HH:mm');
    }
    if (lastUpdateDate.isSameOrAfter(sevenDaysAgo)) {
      return moment(lastUpdate).format('ddd');
    }
    return moment(lastUpdate).format(lastUpdateDate.get('year') === moment().get('year') ? 'DD.MM' : 'DD.MM.YYYY');
  };

  const drawReadConversationStatus = () => {
    const newestMessage = messages[0];
    if (newestMessage.issuer.id === currentUser!.id) {
      return (
        <Ionicons
          name={icons.CHECKMARK_OUTLINE}
          size={20}
          color={newestMessage.read ? colors.PRIMARY : colors.GRAY_DARK}
        />
      );
    }
    const unreadMessagesAmount = messages.filter((message) => message.receiver.id === currentUser!.id
      && !message.read).length;

    if (unreadMessagesAmount > 0) {
      const title = unreadMessagesAmount > 99 ? '+99' : unreadMessagesAmount;
      return (
        <View style={styles.unreadMessageContainer}>
          <Text
            style={styles.unreadMessageText}
          >
            {title}
          </Text>
        </View>
      );
    }

    return <></>;
  };

  return (
    <TouchableWithoutFeedback>
      <View style={listItemStyles.container}>
        <Card>
          <View style={listItemStyles.innerContainer}>
            <Avatar
              size="small"
              url={user.profilePhotoUrl}
            />
            <View style={[ simpleListItemStyles.nameContainer, styles.nameContainer ]}>
              <View style={styles.nameContainerRow}>
                <Text
                  style={styles.name}
                  numberOfLines={1}
                >
                  {user.name}
                </Text>
                <Text
                  style={styles.date}
                  numberOfLines={1}
                >
                  {getParsedDate()}
                </Text>
              </View>
              <View style={[ styles.nameContainerRow, styles.messageContainer ]}>
                <Text
                  numberOfLines={1}
                  style={styles.message}
                >
                  {messages[0].message}
                </Text>
                <View style={styles.messageInfoContainer}>{drawReadConversationStatus()}</View>
              </View>
            </View>
          </View>
        </Card>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row' },
  nameContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  name: {
    fontWeight: '500',
    fontSize: 16,
    flex: 0.8,
  },
  date: {
    flex: 0.2,
    marginLeft: 10,
    textAlign: 'right',
    color: colors.GRAY_DARK,
  },
  message: {
    color: colors.GRAY_DARK,
    fontSize: 15,
    flex: 0.8,
  },
  messageContainer: {
    marginTop: 3,
  },
  unreadMessageContainer: {
    minWidth: 27,
    maxWidth: 27,
    minHeight: 20,
    maxHeight: 20,
    borderRadius: 20,
    backgroundColor: colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadMessageText: {
    fontWeight: '500',
    color: colors.WHITE,
    fontSize: 12,
  },
  messageInfoContainer: {
    flex: 0.2,
    alignItems: 'flex-end',
  },
  nameContainer: {
    width: '100%',
    flex: 1,
  },
});
