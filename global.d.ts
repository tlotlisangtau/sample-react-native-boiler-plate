declare module 'react-native-bcrypt' {
    export function genSaltSync(rounds: number): string;
    export function hashSync(password: string, salt: string): string;
    export function compareSync(password: string, hash: string): boolean;
  }
  