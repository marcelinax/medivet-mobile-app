export interface ActionsSheetButtonProps {
    onPress: () => void;
    title: string;
    variant: 'danger' | 'primary';
    visible?: boolean;
}
