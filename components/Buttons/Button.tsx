import Ionicons from '@expo/vector-icons/Ionicons';
import React, { FC } from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import colors from 'themes/colors';
import { ButtonProps } from 'types/components/Buttons/types';
import { buttonStyles, getButtonBorderColor, getButtonBackgroundColor, getButtonTextColor } from './utils/styles';

export const Button: FC<ButtonProps> = ({
    title,
    icon,
    variant,
    disabled,
    color,
    leftIcon,
    rightIcon,
    ...props
}) => {

    return (
        //zamienic dla androida na native
        <TouchableHighlight {...props} onPress={() => console.log("saa")} disabled={disabled} underlayColor={colors.WHITE} >
            <View style={[
                {
                    backgroundColor: getButtonBackgroundColor(variant, color),
                    borderWidth: variant === 'outline' ? 1 : 0,
                    borderColor: variant === 'outline' ? getButtonBorderColor(color) : '',
                },
                buttonStyles.container,
                disabled ? buttonStyles.disabled : {},
                props.style,
            ]}>
                {leftIcon && <Ionicons
                    name={leftIcon} size={20}
                    color={getButtonTextColor(variant, color)} style={{ marginRight: 10 }} />}
                <Text style={[
                    { color: getButtonTextColor(variant, color) },
                    buttonStyles.text
                ]}>
                    {title}
                </Text>
                {rightIcon && <Ionicons
                    name={rightIcon} size={20}
                    color={getButtonTextColor(variant, color)} style={{ marginLeft: 10 }} />}
            </View>
        </TouchableHighlight>
    );
};