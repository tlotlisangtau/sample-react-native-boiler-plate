import React from 'react';
import {ScreenContainer} from "@/screens/Coomon/Common.styles";
import {useColorScheme} from "@/hooks/useColorScheme";
import {Colors} from "@/constants/Colors";
import {Button} from "@/components/Button/Button.component";
import {Linking, Text} from "react-native";
import {Typography} from "@/components/Typography/Typography.component";


export default function SampleScreen() {
    const theme = useColorScheme() ?? 'light'; // move this to local storage
    return (
        <ScreenContainer theme={theme}>
            <Typography theme={theme} variant={"heading1"} weight={"regular"}>H1 styled Typography </Typography>
            <Typography theme={theme} variant={"heading2"} weight={"regular"}>H2 Styled Typography </Typography>
            <Typography theme={theme} variant={"text1"} weight={"regular"}>text1 Styled Typography </Typography>
            <Typography theme={theme} variant={"text2"} weight={"regular"}>text2 Styled Typography </Typography>
            <Typography theme={theme} variant={"text3"} weight={"regular"}>text3 Styled Typography </Typography>
            <Typography theme={theme} variant={"paragraph"} weight={"regular"}>paragraph Styled Typography </Typography>
            <Typography color={Colors[theme].teal950} variant={"text1"} weight={"regular"}>Styled Typography </Typography>
            <Typography
                color={Colors[theme].white}  theme={theme} variant={'text2'}>
            </Typography>
            <Button
                onPress={() => {}}
                theme={theme}
                title={'Solid'}
                variant={'primary'}>
            </Button>
            <Text></Text>
            <Button
                onPress={() => {}}
                theme={theme}
                outLine={true}
                title={'Outline'}
                variant={'primary'}>
            </Button>
            <Text></Text>
            <Button
                onPress={async () => await Linking.openURL('https://uicolors.app/create')}
                theme={'light'}
                variant={'link'}
                title={'click me'}>
            </Button>

        </ScreenContainer>
    );
}