import Ionicons from '@expo/vector-icons/Ionicons';
import React, { FC } from 'react';
import { ColorValue, Text, TouchableHighlight, View } from 'react-native';
import colors from 'themes/colors';
import { ButtonProps } from 'types/components/Buttons/types';
import { buttonStyles } from './utils/styles';

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

    const getTextColor = (): ColorValue => {
        switch (variant) {
            case 'link': {
                switch (color) {
                    case 'secondary':
                        return colors.SECONDARY;
                    case 'primary':
                    default:
                        return colors.PRIMARY;
                }
            }
            case 'solid':
                return colors.WHITE;
            case 'outline': {
                switch (color) {
                    case 'secondary':
                        return colors.SECONDARY;
                    case 'primary':
                    default:
                        return colors.PRIMARY;
                }
            };
            default:
                return colors.WHITE;
        };
    };

    const getBackgroundColor = (): ColorValue => {
        switch (variant) {
            case 'link':
            case 'outline':
                return 'transparent';
            case 'solid': {
                switch (color) {
                    case 'primary':
                    default:
                        return colors.PRIMARY;
                    case 'secondary':
                        return colors.SECONDARY;
                }
            }
            default:
                return colors.PRIMARY;
        }
    };

    const getBorderColor = (): ColorValue => {
        switch (color) {
            case 'primary':
            default:
                return colors.PRIMARY;
            case 'secondary':
                return colors.SECONDARY;
        }
    };

    return (
        //zamienic dla androida na native
        <TouchableHighlight {...props} onPress={() => console.log("saa")} disabled={disabled} underlayColor={colors.WHITE} >
            <View style={[
                {
                    backgroundColor: getBackgroundColor(),
                    borderWidth: variant === 'outline' ? 1 : 0,
                    borderColor: variant === 'outline' ? getBorderColor() : '',
                },
                buttonStyles.container,
                disabled ? buttonStyles.disabled : {},
                props.style,
            ]}>
                {leftIcon && <Ionicons
                    name={leftIcon} size={20}
                    color={getTextColor()} style={{ marginRight: 10 }} />}
                <Text style={[
                    { color: getTextColor() },
                    buttonStyles.text
                ]}>
                    {title}
                </Text>
                {rightIcon && <Ionicons
                    name={rightIcon} size={20}
                    color={getTextColor()} style={{ marginLeft: 10 }} />}
            </View>
        </TouchableHighlight>
    );
};