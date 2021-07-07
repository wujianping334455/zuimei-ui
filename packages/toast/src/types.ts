export interface MessageOpts {
    duration?: number;
    icon?: string;
    preicon?: string;
    message?: string;
    style?: object;
    iconColor?: string;
}

export type IMessageOpts = MessageOpts | string