import { AddressApi } from 'types/api/types';
import { StyleProp, Text, TextStyle } from 'react-native';

interface Props {
  address: AddressApi;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
}

export const getAddressString = (address: AddressApi) => {
  let result: string = '';

  if (address.street) {
    result += address.street;
  }
  if (address.buildingNumber) {
    result += ` ${address.buildingNumber}`;
  }
  if (address.flatNumber) {
    result += `/${address.flatNumber}`;
  }
  if (address?.city || address?.zipCode) {
    result += ',';
  }
  if (address.zipCode) {
    result += ` ${address.zipCode}`;
  }
  if (address.city) {
    result += ` ${address.city}`;
  }

  return result;
};

export const FormatAddress = ({ address, style, numberOfLines }: Props) => (
  <Text
    style={style}
    numberOfLines={numberOfLines}
  >
    {getAddressString(address)}
  </Text>
);
