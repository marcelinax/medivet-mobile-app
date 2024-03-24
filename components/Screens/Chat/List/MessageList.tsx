import { ListRenderItem } from 'react-native';
import { List } from 'components/List/List';
import { ChatApi } from 'api/chat/chat.api';
import { Conversation } from 'types/api/chat/types';
import { MessageListItem } from 'components/Screens/Chat/List/MessageListItem';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { FilterId } from 'constants/enums/filterId.enum';
import { MessageListFilters } from 'components/Screens/Chat/List/MessageListFilters';

export const MessageList = () => {
  const { selectedFilters } = useSelector((state: RootState) => state.list);

  const renderConversation: ListRenderItem<Conversation> = ({ item }) => <MessageListItem conversation={item} />;

  const getParams = (params: Record<string, any>) => {
    const status = selectedFilters.find(
      (filter) => filter.id === FilterId.MESSAGE_STATUS,
    );

    if (status) {
      params = {
        ...params,
        status: status.value,
      };
    }

    return params;
  };
  return (
    <List
      onFetch={(params) => ChatApi.getConversations(getParams(params))}
      renderItem={renderConversation}
      withoutBackgroundColor
      itemFieldAsId="user.id"
      customStickyHeader={<MessageListFilters />}
      separateOptions
    />
  );
};
