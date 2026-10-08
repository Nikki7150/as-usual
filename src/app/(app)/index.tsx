import { Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { Button, View } from "react-native";
import { useAuthStore } from "@/store/authStore";
import { addTask } from "@/services/tasks";

export default function Index() {
  const user = useAuthStore((s) => s.user);

  const handleTest = async () => {
    if (!user) return;
    try {
      const id = await addTask({
        title: "Test task",
        sourceTemplateId: null, // one-off, not from a template
        userId: user.uid,
        minutesBefore: null,
        taskTime: "08:00",
        date: new Date().toLocaleDateString("en-CA"), // "YYYY-MM-DD" in YOUR timezone
      });
      console.log("Saved task:", id);
    } catch (err) {
      console.error("addTask failed:", err);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Button title="Add test task" onPress={handleTest} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
});
