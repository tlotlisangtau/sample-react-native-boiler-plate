import styled from 'styled-components/native';
import {Colors} from "@/constants/Colors";
import { ButtonProps, ButtonVariant } from './Button.types';

type Theme = 'light' | 'dark';
const variantColor: { [key in ButtonVariant]: string } = {
    primary: Colors.light.teal500,
    secondary: Colors.dark.text,
    link: 'transparent',
};

export const StyledButton = styled.TouchableOpacity<ButtonProps>`
  background: ${({ outLine, variant, theme }: {outLine: boolean, variant: ButtonVariant, theme: Theme}) =>{
    return outLine ? Colors[theme].background : variantColor[variant] }
};
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  padding: 10px 15px;
  border-width: 2px;
  border-radius: 5px;
  border-color: ${({ variant }: {variant: ButtonVariant}) => variantColor[variant]};
`;

export const StyledIconContainer = styled.View`
  padding-top: 10px;
  padding-left: 8px;
  align-items: center;
`;