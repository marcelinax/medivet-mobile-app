import {FC} from "react";
import {FlatList, ListRenderItem, View} from "react-native";
import {listStyles} from "components/List/utils/styles";
import colors from "themes/colors";
import {EmptyList} from "components/Composition/EmptyList";

interface Props {
    data: any[];
    renderItem: ListRenderItem<any>;
    separateOptions?: boolean;
}

export const SimpleList: FC<Props> = ({data, renderItem, separateOptions}) => {
    const itemSeparator = separateOptions ? () => <View style={listStyles.separator}/> : undefined;

    const emptyComponent: JSX.Element = data.length === 0 ? <EmptyList/> : <></>;

    return (
        <View style={[listStyles.container, {backgroundColor: colors.WHITE}]}>
            <FlatList data={data} renderItem={renderItem}
                      bounces={false}
                      ItemSeparatorComponent={itemSeparator}
                      keyExtractor={(item) => item.id}
                      ListEmptyComponent={emptyComponent}
                      showsVerticalScrollIndicator={false}
                      contentContainerStyle={{flexGrow: 1}}
                      style={listStyles.list}
            />
        </View>
    )
}
