import CustomModal from "@/components/custom-modal";
import { useDeleteTask, useTask } from "@/hooks/tasks";
import { Task } from "@/types";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

export default function ViewDetails() {
  const { id } = useLocalSearchParams();
  const taskId = Array.isArray(id) ? id[0] : id;
  const [allNotes, setAllNotes] = useState<Task[]>([]);
  const numericId = id ? Number(id) : undefined;
  // const notess = allNotes.find((note) => note.id === numericId);
  const [modalVisible, setModalVisible] = useState(false);
  const route = useRouter();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const { data, isLoading, isFetching, isError, isSuccess } = useTask(taskId);
  const deleteTask = useDeleteTask();

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator
          size="large"
          color="#3b82f6" // Tailwind blue-500
        />
      </View>
    );
  }

  if (isError || !data) {
    return (
      <View className="flex justify-center items-center h-64">
        <Text>Error loading task</Text>
      </View>
    );
  }

  const handleDelete = async () => {
    deleteTask.mutate(taskId, {
      onError: (err) => console.log("Error deleting task", err),
      onSuccess: () => setModalVisible(false),
    });
  };

  return (
    <View className="flex-1 p-5 gap-3 pb-safe">
      <View>
        <Text className="text-5xl pb-2">{data.data.title}</Text>
      </View>
      <View className="flex-1">
        <Text className="text-gray-500">{data.data.notes}</Text>
      </View>
      <View className="p-4">
        <TouchableOpacity
          className="justify-center items-center"
          onPress={() => setModalVisible(true)}
        >
          <Text className="text-red-500 font-medium text-2xl">Delete Task</Text>
        </TouchableOpacity>
      </View>

      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onDelete={() => {
          // delete logic here
          handleDelete();
        }}
      />
    </View>
  );
}
