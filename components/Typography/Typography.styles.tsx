import styled from 'styled-components/native';
import {
    TypographyProps,
    TypographyAlignment,
    TypographyWeight,
    TypographyVariant,
    Theme, TypographyColor,
} from './Typography.types';
import {Colors} from "@/constants/Colors";

export const variantFontSizes: Record<TypographyVariant, number> = {
    heading1: 48,
    heading2: 30,
    text1: 20,
    text2: 16,
    text3: 14,
    paragraph: 12,
    small: 10,
};

export const weightFontFamily: Record<TypographyWeight, string> = {
    regular: 'DMSans-Regular',
    bold: 'DMSans-Bold',
    medium: 'DMSans-Medium',
};

const alignment: Record<TypographyAlignment, string> = {
    left: 'left',
    center: 'center',
    right: 'right',
};

export const StyledTypography = styled.Text<TypographyProps>`
  text-align: ${({ align }: {align: TypographyAlignment}) => alignment[align ?? 'left']};
  font-size: ${({ variant }: { variant: TypographyVariant}) => variantFontSizes[variant]}px;
  font-weight: ${({ weight }: { weight: TypographyWeight }) => weightFontFamily[weight ?? 'regular']};
  color: ${({ theme, color }: {theme: Theme, color: TypographyColor}) => color ? color : 
          Colors[theme]?.text || Colors.dark.text
  };
  width: ${({ width }: { width: number }) => (width ? width + 'px' : 'auto')};
  text-decoration-line: ${({ underLine }: { underLine: boolean }) => (underLine ? 'underline' : 'none')};
`;