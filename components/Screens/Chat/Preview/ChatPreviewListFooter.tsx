import { StyleSheet, View } from 'react-native';
import colors from 'themes/colors';
import { TextInput } from 'components/Inputs/TextInput';
import { useState } from 'react';
import { useErrorAlert } from 'hooks/Alerts/useErrorAlert';
import { getRequestErrors } from 'utils/errors';
import { ChatApi } from 'api/chat/chat.api';
import { LoadingButton } from 'components/Buttons/LoadingButton';
import { Message } from 'types/api/chat/types';

interface Props {
  receiverId: number;
  setNewMessageSent: (value: boolean) => void;
  setNewMessages: (messages: Message[]) => void;
  newMessages: Message[];
}

export const ChatPreviewListFooter = ({
  receiverId, setNewMessageSent, setNewMessages, newMessages,
}: Props) => {
  const [ message, setMessage ] = useState('');
  const { handleErrorAlert } = useErrorAlert();
  const [ loading, setLoading ] = useState(false);

  const handleSendMessage = async () => {
    setLoading(true);
    try {
      const res = await ChatApi.createMessage({
        receiverId,
        message,
      });
      setMessage('');
      setNewMessages([ ...newMessages, res ]);
      setNewMessageSent(true);
    } catch (err: any) {
      const errors = getRequestErrors(err);
      handleErrorAlert(errors);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          variant="outline"
          value={message}
          onChangeText={setMessage}
          errors={[]}
        />
      </View>
      <LoadingButton
        title="Wyślij"
        variant="solid"
        disabled={!message}
        loading={loading}
        onPress={handleSendMessage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.WHITE,
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
    marginRight: 10,
  },
});
