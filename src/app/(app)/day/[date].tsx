import { getTodayString } from "@/utils/dates";
import { Text, View } from "react-native";

export default function DayScreen() {
    const today = getTodayString();
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Day</Text>
        <Text>{today}</Text>
        </View>
    );
}