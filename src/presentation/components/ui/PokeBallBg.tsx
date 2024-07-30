import React, { useContext } from 'react'
import { Image, ImageStyle, StyleProp } from 'react-native'
import { ThemeContext } from '../../context/ThemeContext';

interface Props {
    style?: StyleProp<ImageStyle>;
}

export default function PokeBallBg({ style }: Props) {

    const { isDark } = useContext (ThemeContext);

    const pokeBallImg = isDark 
    ? require('../../../assets/pokeball-dark.png')
    : require('../../../assets/pokeball-light.png')

    return (
        <Image source={ pokeBallImg } style={[
            {
                width: 300,
                height: 300,
                opacity: 0.3
            },
            style,
        ]} />
    )
}
