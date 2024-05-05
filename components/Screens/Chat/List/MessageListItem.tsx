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
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from 'types/Navigation/types';
import { SwipeButtonActionProps } from 'types/components/Buttons/types';
import { MessageStatus } from 'constants/enums/enums';
import { ChatApi } from 'api/chat/chat.api';
import { getRequestErrors } from 'utils/errors';
import { useConfirmationAlert } from 'hooks/Alerts/useConfirmationAlert';
import { useErrorAlert } from 'hooks/Alerts/useErrorAlert';
import { useTranslation } from 'react-i18next';
import { SwipeButton } from 'components/Buttons/SwipeButton/SwipeButton';

interface Props {
  conversation: Conversation
  onChangeStatus: () => void;
}

export const MessageListItem = ({ conversation, onChangeStatus }: Props) => {
  const { messages, user } = conversation;
  const { currentUser } = useSelector((state: RootState) => state.user);
  const navigation = useNavigation<NavigationProps>();
  const confirmation = useConfirmationAlert();
  const { handleErrorAlert } = useErrorAlert();
  const { t } = useTranslation();

  const getParsedDate = () => {
    const date = messages[0].createdAt;
    const today = moment.utc().set({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    });
    const sevenDaysAgo = moment.utc().subtract(7, 'd').set({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    });
    const lastUpdateDate = moment.utc(date).set({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    });

    if (lastUpdateDate.isSame(today, 'date')) {
      return moment(date).format('HH:mm');
    }
    if (lastUpdateDate.isSameOrAfter(sevenDaysAgo)) {
      return moment(date).format('ddd');
    }
    return moment(date).format(lastUpdateDate.get('year') === today.get('year') ? 'DD.MM' : 'DD.MM.YYYY');
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

  const handleChangeStatus = async (status: MessageStatus) => {
    await confirmation({
      title: '',
      message: status === MessageStatus.REMOVED
        ? `${t('alerts.confirmation.remove.title')} ${t('alerts.confirmation.irreversible_action.title')}`
        : t('alerts.confirmation.message'),
    });
    try {
      await ChatApi.changeConversationStatus(status, user.id);
      onChangeStatus();
    } catch (err: any) {
      const errors = getRequestErrors(err);
      handleErrorAlert(errors);
    }
  };

  const rightActions: SwipeButtonActionProps[] = [
    {
      icon: icons.REFRESH_OUTLINE,
      color: colors.PRIMARY,
      onPress: () => handleChangeStatus(MessageStatus.ACTIVE),
      id: 'restore',
      backgroundColor: 'transparent',
      visible: conversation.status === MessageStatus.ARCHIVED,
    },
    {
      icon: icons.ARCHIVE_OUTLINE,
      color: colors.PRIMARY,
      onPress: () => handleChangeStatus(MessageStatus.ARCHIVED),
      id: 'archive',
      backgroundColor: 'transparent',
      visible: conversation.status === MessageStatus.ACTIVE,
    },
    {
      icon: icons.TRASH_OUTLINE,
      color: colors.DANGER,
      onPress: () => handleChangeStatus(MessageStatus.REMOVED),
      id: 'remove',
      backgroundColor: 'transparent',
      visible: conversation.status === MessageStatus.ARCHIVED,
    },
  ];

  return (
    <View style={listItemStyles.container}>
      <SwipeButton
        size="small"
        rightActions={rightActions}
      >
        <TouchableWithoutFeedback onPress={() => navigation.push(
          'Chat Preview',
          {
            correspondingUserId: user.id,
            user,
          },
        )}
        >
          <View style={{}}>
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
      </SwipeButton>
    </View>
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
