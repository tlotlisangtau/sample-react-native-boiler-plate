import styled from 'styled-components/native';
import {Colors} from "@/constants/Colors";

type Theme = 'light' | 'dark';
export const ScreenContainer = styled.SafeAreaView<{theme: Theme}>`
    flex: 1;
    background-color: ${({ theme }: {theme: Theme}) => 
            Colors[theme]?.background || Colors.light.background
    };
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 30px;
`;