
import { ReactNode } from 'react';
import {Colors} from "@/constants/Colors";

type Theme = 'light' | 'dark';
type TypographyWeight = 'regular' | 'medium' | 'bold';
type ButtonVariant = 'primary' | 'secondary' | 'link';
type TypographyColor = keyof typeof Colors.dark & keyof  typeof Colors.light;
interface ButtonProps {
    onPress?(payload: unknown): void;
    theme: Theme;
    outLine?: boolean;
    variant: ButtonVariant;
    icon?: string; // name of icon from getImage
    iconElement?: ReactNode;
    title: string;
    buttonTextColor?: TypographyColor;
    fontWeight?: TypographyWeight;
}

export type { ButtonProps, ButtonVariant };