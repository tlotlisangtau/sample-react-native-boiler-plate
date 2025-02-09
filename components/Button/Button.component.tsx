
import React from 'react';
import { StyledButton } from './Button.styles';
import { ButtonProps, ButtonVariant } from './Button.types';
import {Typography} from "@/components/Typography/Typography.component";
import {Colors} from "@/constants/Colors";

const variantFontColor: { [key in ButtonVariant]: keyof typeof Colors.dark }= {
    primary: 'teal500',
    secondary: 'teal100',
    link: 'blue600',
};


const Button: React.FC<ButtonProps> = ({ ...props }) => {
    return (
        <StyledButton {...props}>
            <Typography
                color={
                    props.variant === 'link'? Colors[props.theme].blue600 :
                        props.outLine ? Colors[props.theme][variantFontColor[props.variant]] :
                            Colors[props.theme].white
                }
                theme={props.theme}
                weight={props.fontWeight}
                variant={props.variant === 'link' ? 'text2' : 'text1'}
                underLine={props.variant === 'link' ? true : false}>
                {props.title}
            </Typography>
        </StyledButton>
    );
};

export { Button };