import { listNotesAtom } from "@/atoms/atom";
import { useLocalSearchParams, usePathname, useRouter } from "expo-router";
import { useAtom } from "jotai";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function CreateEditTodo() {
  const { id } = useLocalSearchParams();
  const [allNotes, setAllNotes] = useAtom(listNotesAtom);
  const numericId = id ? Number(id) : undefined;
  const notess = allNotes.find((note) => note.id === numericId);
  const [title, setTitle] = useState(notess?.title || "");
  const [notes, setNotes] = useState(notess?.notes || "");
  const pathName = usePathname();
  // const isEmpty = notes !== "" && title !== "";
  // const isEmpty = notess?.title !== title || notess?.notes !== notes;
  const isEmpty = pathName.endsWith("/edit")
    ? notess?.title !== title || notess?.notes !== notes
    : notes !== "" && title !== "";
  const route = useRouter();

  const handleSave = () => {
    setAllNotes((prevNotes) => {
      if (id) {
        return prevNotes.map((note) =>
          note.id === numericId ? { ...note, title, notes } : note,
        );
      }
      return [
        ...prevNotes,
        {
          id: prevNotes.length + 1,
          title: title,
          notes: notes,
        },
      ];
    });
    setTitle("");
    setNotes("");
    route.back();
  };

  return (
    <View
      className={pathName ? "flex-1 p-3 pb-safe" : "flex-1 pt-safe pb-safe p-3"}
    >
      <View className="mt-5">
        <Text className="font-bold text-xl mb-1">Title</Text>
        <TextInput
          placeholder="Task Title"
          value={title}
          onChangeText={setTitle}
          className="bg-gray-200 rounded-lg p-1.5 px-2.5 text-lg"
        />
      </View>

      <View className="flex-1 mb-1 mt-5">
        <Text className="font-bold text-xl mb-1">Notes</Text>
        <TextInput
          placeholder="Enter task"
          value={notes}
          multiline
          numberOfLines={4}
          onChangeText={setNotes}
          textAlignVertical="top"
          className="bg-gray-200 rounded-lg p-1.5 px-2.5 flex-1 text-lg"
        />
      </View>
      {/* bg-blue-400 p-4 rounded-xl elevation-lg */}

      <View
        className={`p-4 rounded-xl elevation-lg ${!isEmpty ? "bg-gray-400" : "bg-blue-400"}`}
      >
        <TouchableOpacity
          className="justify-center items-center"
          disabled={!isEmpty}
          onPress={() => handleSave()}
        >
          <Text className="text-white font-medium text-lg">Save Task</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
