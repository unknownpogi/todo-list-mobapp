import { isContainerGrid } from "@/atoms/atom";
import { API_URL } from "@/components/config/api";
import CustomModal from "@/components/custom-modal";
import { Task } from "@/types";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { useRouter } from "expo-router";
import { useAtom } from "jotai";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function LisView() {
  const [allNotes, setAllNotes] = useState<Task[]>([]);
  const [isGrid, setIsGrid] = useAtom(isContainerGrid);
  const [selectedId, setSelectedId] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, []),
  );

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${API_URL}/tasks/${selectedId}`);
      console.log(response);
    } catch (error) {
      console.log("Error", error);
    } finally {
      fetchTasks();
      setModalVisible(false);
    }
  };

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/tasks`);
      setAllNotes(response.data.data);
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
    <View className="flex-1 px-1">
      <FlatList
        key={isGrid ? "grid" : "list"}
        data={allNotes}
        numColumns={isGrid ? 2 : 1}
        keyExtractor={(item) => item.documentId.toString()}
        renderItem={({ item }) => (
          <View
            className={`
         flex-1 flex-row justify-between p-3 ${isGrid ? "border m-1 rounded-xl bg-gray-200 elevation-sm" : "border-b"} border-gray-300
      `}
            style={
              isGrid
                ? { flexBasis: "48%", maxWidth: "48%", minHeight: 90 }
                : { flex: 1 }
            }
          >
            <TouchableOpacity
              className="flex-1"
              onPress={() => router.push(`/${item.documentId}/view-details`)}
            >
              <Text className="text-xl" numberOfLines={2}>
                {item.title}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setSelectedId(item.documentId);
                setModalVisible(true);
              }}
              z-10
              className={isGrid ? "absolute top-2 right-2 z-10" : ""}
            >
              <MaterialIcons name="delete-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )}
      />

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
