import { API_URL } from "@/components/config/api";
import CustomModal from "@/components/custom-modal";
import { Task } from "@/types";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

export default function ViewDetails() {
  const { id } = useLocalSearchParams();
  const [allNotes, setAllNotes] = useState<Task[]>([]);
  const numericId = id ? Number(id) : undefined;
  // const notess = allNotes.find((note) => note.id === numericId);
  const [modalVisible, setModalVisible] = useState(false);
  const route = useRouter();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");

  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, []),
  );

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${API_URL}/tasks/${id}`);
      console.log(response);
    } catch (error) {
      console.log("Error", error);
    } finally {
      fetchTasks();
      setModalVisible(false);
    }
    // setAllNotes(allNotes.filter((prev) => prev.id !== selectedId));
    // setModalVisible(false);
  };

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/tasks/${id}`);
      setTitle(response.data.data.title);
      setNotes(response.data.data.notes);
    } catch (err) {
      console.log("Error in getting task", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator
          size="large"
          color="#3b82f6" // Tailwind blue-500
        />
      </View>
    );
  }

  return (
    <View className="flex-1 p-5 gap-3 pb-safe">
      <View>
        <Text className="text-5xl pb-2">{title}</Text>
      </View>
      <View className="flex-1">
        <Text className="text-gray-500">{notes}</Text>
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
