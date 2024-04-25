import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../routes/stackNavigator";
import { View } from "react-native";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Login">;

interface Props {
    navigation: HomeScreenNavigationProp;
}

export default function Login({ navigation }: Props){

    return(
        <View>

        </View>
    )
    
}