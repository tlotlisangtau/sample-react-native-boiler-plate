import React from 'react';
import {ScreenContainer} from "@/screens/Coomon/Common.styles";
import {useColorScheme} from "@/hooks/useColorScheme";
import {Typography} from "@/components/Typography/Typography.component";


export default function DashboardScreen() {
  const theme = useColorScheme() ?? 'light'; // move this to local storage
  return (
    <ScreenContainer theme={theme}>
      <Typography theme={theme} variant={"heading2"} weight={"regular"}>Home Screen</Typography>

    </ScreenContainer>
  );
}