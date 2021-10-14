import React, {useState} from 'react';
import { VStack, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { useMusic } from "../../providers";
import { getWheaterByCityId, searchPlaylists } from '../../services';   

export const FindByCityId = () => {

    const {setLastSearch} = useMusic();

    const [cityId, setCityId] = useState('');

    const handleSubmit = async (cityId) => {
        try {
            const wheaterData = await getWheaterByCityId(cityId);
            const {name: city} = wheaterData;
            const {temp} = wheaterData.main;
            const playlist = await searchPlaylists(temp);
            setLastSearch({
                searchDate: new Date().toISOString(),
                temp,
                city,
                ...playlist
            }); 
        } catch (error){
            console.log(error);
        }
    }

    return (
        <VStack spacing={4}>
            <FormControl id="city_id" isRequired>
                <FormLabel>ID da Cidade</FormLabel>
                <Input 
                    size="lg" type="text"
                    placeholder="Ex: 2172797"
                    value={cityId} onChange={e => setCityId(e.target.value)} 
                />
            </FormControl>
            <Button colorScheme="blue" width="100%" onClick={() => handleSubmit(cityId)}>
                Buscar
            </Button>
        </VStack>
    )
}