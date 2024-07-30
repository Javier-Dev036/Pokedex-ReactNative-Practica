import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { getPokemons } from '../../../actions/pokemons/Get-Pokemons';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import PokeBallBg from '../../components/ui/PokeBallBg';
import { globalTheme } from '../../../config/theme/Global-Theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PokemonCard from '../../components/pokemons/PokemonCard';

export default function HomeScreen() {
    const insets = useSafeAreaInsets();

    //const { isLoading, data: pokemons = [] } = useQuery({
        //queryKey: ['pokemons'],
        //queryFn: () => getPokemons(0),
        //staleTime: 1000 * 60 * 60,
    //});

    const { isLoading, data, fetchNextPage } = useInfiniteQuery({
        queryKey: ['pokemons', 'infinite'],
        initialPageParam: 0,
        queryFn: ( params ) => getPokemons(params.pageParam),
        getNextPageParam: (lastPage, pages) => pages.length,
        staleTime: 1000 * 60 * 60,
    });

    return (
        <View style={[globalTheme.globalMargin, { marginTop: insets.top + 20 }]}>
            <PokeBallBg style={styles.imgPosition} />
            <FlatList 
                data={data?.pages.flat() ?? []} 
                keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
                numColumns={2}
                ListHeaderComponent={ () => (
                    <Text variant='displayMedium'> Pokedex </Text>
                )}
                ListEmptyComponent={() => (
                    isLoading ? <ActivityIndicator animating={true} /> : <Text>No data available</Text>
                )}
                renderItem={({ item }) => <PokemonCard pokemon={item} />}
                onEndReachedThreshold={0.6}
                onEndReached={() => fetchNextPage()}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    imgPosition: {
        position: 'absolute',
        top: -100,
        right: -100
    }
});
