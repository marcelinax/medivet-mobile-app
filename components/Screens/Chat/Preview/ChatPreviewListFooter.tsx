import { StyleSheet, View } from 'react-native';
import colors from 'themes/colors';
import { TextInput } from 'components/Inputs/TextInput';
import { useState } from 'react';
import { Button } from 'components/Buttons/Button';
import { useWebSocket } from 'hooks/useWebSocket';

interface Props {
  receiverId: number;
}

export const ChatPreviewListFooter = ({ receiverId }: Props) => {
  const { socket } = useWebSocket();
  const [ message, setMessage ] = useState('');

  const handleSendMessage = () => {
    socket.emit('sendMessage', {
      message,
      receiverId,
    });
    setMessage('');
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
      <Button
        title="Wyślij"
        variant="solid"
        disabled={!message}
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
