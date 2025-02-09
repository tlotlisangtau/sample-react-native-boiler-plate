import {Colors} from "@/constants/Colors";

type Theme = 'light' | 'dark';
type TypographyColor = keyof typeof Colors.light & keyof typeof Colors.dark;
type TypographyAlignment = 'left' | 'center' | 'right';
type TypographyVariant =
    | 'heading1'
    | 'heading2'
    | 'paragraph'
    | 'text1'
    | 'text2'
    | 'text3'
    | 'small';
type TypographyWeight = 'regular' | 'medium' | 'bold';
type TypographyTransform = 'uppercase' | 'lowercase' | 'capitalize';
type TypographyEllipsizeMode = 'head' | 'middle' | 'tail' | 'clip';

interface TypographyProps {
    transform?: TypographyTransform;
    width?: number;
    weight?: TypographyWeight;
    variant: TypographyVariant;
    children?: React.ReactNode;
    numberOfLines?: number;
    ellipsizeMode?: TypographyEllipsizeMode;
    align?: TypographyAlignment;
    theme?: Theme;
    color?: string
    underLine?: boolean;
}

export type {
    TypographyProps,
    TypographyVariant,
    TypographyWeight,
    TypographyTransform,
    Theme,
    TypographyAlignment,
    TypographyColor,
};