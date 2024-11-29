import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
  FlatList,
  Dimensions,
} from "react-native";
import { getAuth } from "firebase/auth";
import { ref, set, push, get, child, remove } from "firebase/database";
import { db } from "../../scripts/firebase-config";

const { width, height } = Dimensions.get("window");

const WorkoutPlanner = () => {
  const auth = getAuth();
  const userId = auth.currentUser?.uid; // ID do usuário autenticado

  const [activeWeek, setActiveWeek] = useState(0);
  const [activeDay, setActiveDay] = useState(0);
  const [workouts, setWorkouts] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [currentWorkout, setCurrentWorkout] = useState({});
  const [editMode, setEditMode] = useState(false);

  const semanas = ["Semana 1", "Semana 2", "Semana 3", "Semana 4"];
  const dias = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

  const fetchWorkouts = async () => {
    try {
      if (!userId) {
        alert("Usuário não autenticado!");
        return;
      }

      const workoutsRef = ref(db, `workouts/${userId}`);
      const snapshot = await get(workoutsRef);

      if (snapshot.exists()) {
        const data = snapshot.val();

        // Reorganizar dados para o formato necessário
        const workoutsData = {};
        for (const week in data) {
          if (!workoutsData[week]) workoutsData[week] = {};
          for (const day in data[week]) {
            workoutsData[week][day] = Object.values(data[week][day]); // Convertendo para array
          }
        }
        setWorkouts(workoutsData);
      } else {
        console.log("Nenhum dado encontrado.");
        setWorkouts({});
      }
    } catch (error) {
      alert("Erro ao carregar exercícios: " + error.message);
    }
  };

  useEffect(() => {
    fetchWorkouts(); // Carregar exercícios ao montar o componente
  }, []);

  const abrirModal = (workout = null, dia = activeDay) => {
    setEditMode(!!workout);
    setCurrentWorkout(workout || { nome: "", series: "", observacao: "", dia });
    setModalVisible(true);
  };

  const salvarExercicio = async () => {
    const { nome, series, observacao, dia } = currentWorkout;

    if (!nome || !series) {
      alert("Preencha os campos obrigatórios!");
      return;
    }

    try {
      if (!userId) {
        alert("Usuário não autenticado!");
        return;
      }

      const workoutsRef = ref(db, `workouts/${userId}/${activeWeek}/${dia}`);

      if (editMode) {
        // Atualizar exercício
        const exerciseRef = ref(db, `workouts/${userId}/${activeWeek}/${dia}/${currentWorkout.id}`);
        await set(exerciseRef, { nome, series, observacao, dia, week: activeWeek });
        alert("Exercício atualizado!");
      } else {
        // Adicionar novo exercício
        const newWorkoutRef = push(workoutsRef);
        await set(newWorkoutRef, { nome, series, observacao, dia, week: activeWeek });
        alert("Exercício salvo!");
      }

      setModalVisible(false);
      fetchWorkouts(); // Atualizar lista de exercícios
    } catch (error) {
      alert("Erro ao salvar o exercício: " + error.message);
    }
  };

  const excluirExercicio = async (dia, workout) => {
    try {
      const workoutRef = ref(db, `workouts/${userId}/${activeWeek}/${dia}/${workout.id}`);
      await remove(workoutRef);
      alert("Exercício excluído!");
      fetchWorkouts(); // Atualizar lista
    } catch (error) {
      alert("Erro ao excluir exercício: " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.weeks}>
        {semanas.map((semana, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.weekButton, activeWeek === index && styles.weekButtonActive]}
            onPress={() => setActiveWeek(index)}
          >
            <Text style={[styles.weekButtonText, activeWeek === index && styles.weekButtonTextActive]}>
              {semana}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.days}>
        {dias.map((dia, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.dayButton, activeDay === index && styles.dayButtonActive]}
            onPress={() => setActiveDay(index)}
          >
            <Text style={[styles.dayButtonText, activeDay === index && styles.dayButtonTextActive]}>
              {dia}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={workouts[activeWeek]?.[activeDay] || []}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum exercício adicionado.</Text>}
        renderItem={({ item }) => (
          <View style={styles.workoutItem}>
            <View style={styles.workoutText}>
              <Text style={styles.workoutName}>{item.nome}</Text>
              <Text style={styles.workoutDetails}>{item.series}</Text>
              <Text style={styles.workoutNotes}>{item.observacao}</Text>
            </View>
            <View style={styles.workoutActions}>
              <TouchableOpacity style={styles.editButton} onPress={() => abrirModal(item, activeDay)}>
                <Text style={styles.actionText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => excluirExercicio(activeDay, item)}>
                <Text style={styles.actionText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => abrirModal()}>
        <Text style={styles.addButtonText}>Adicionar Exercício</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{editMode ? "Editar Exercício" : "Adicionar Exercício"}</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome do exercício"
            value={currentWorkout.nome}
            onChangeText={(text) => setCurrentWorkout({ ...currentWorkout, nome: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Séries e repetições (ex: 3x10)"
            value={currentWorkout.series}
            onChangeText={(text) => setCurrentWorkout({ ...currentWorkout, series: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Observações (opcional)"
            value={currentWorkout.observacao}
            onChangeText={(text) => setCurrentWorkout({ ...currentWorkout, observacao: text })}
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.saveButton} onPress={salvarExercicio}>
              <Text style={styles.actionText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.actionText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#f9f9f9" },
  weeks: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  weekButton: { flex: 1, margin: 3, padding: 10, backgroundColor: "#ddd", borderRadius: 5 },
  weekButtonActive: { backgroundColor: "#007bff" },
  weekButtonText: { textAlign: "center", color: "#555", fontSize: 14 },
  weekButtonTextActive: { color: "#fff" },
  days: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  dayButton: { flex: 1, margin: 3, padding: 8, backgroundColor: "#eaeaea", borderRadius: 5 },
  dayButtonActive: { backgroundColor: "#007bff" },
  dayButtonText: { textAlign: "center", color: "#555", fontSize: 13 },
  dayButtonTextActive: { color: "#fff" },
  workoutItem: { flexDirection: "row", justifyContent: "space-between", padding: 12, backgroundColor: "#fff", marginVertical: 5, borderRadius: 8 },
  workoutText: { flex: 2 },
  workoutName: { fontSize: 16, fontWeight: "bold" },
  workoutDetails: { color: "#555", fontSize: 14 },
  workoutNotes: { color: "#888", fontSize: 12, fontStyle: "italic" },
  workoutActions: { flexDirection: "row", alignItems: "center" },
  editButton: { backgroundColor: "#007bff", padding: 8, borderRadius: 5, marginRight: 5 },
  deleteButton: { backgroundColor: "#dc3545", padding: 8, borderRadius: 5 },
  addButton: { padding: 15, backgroundColor: "#28a745", borderRadius: 5, alignItems: "center", marginTop: 20 },
  addButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalTitle: { fontSize: 20, color: "#fff", marginBottom: 20 },
  input: { width: "80%", padding: 10, backgroundColor: "#fff", borderRadius: 5, marginVertical: 10 },
  modalButtons: { flexDirection: "row", marginTop: 20 },
  saveButton: { backgroundColor: "#007bff", padding: 10, borderRadius: 5, marginRight: 10 },
  cancelButton: { backgroundColor: "#6c757d", padding: 10, borderRadius: 5 },
  emptyText: { textAlign: "center", color: "#888", fontStyle: "italic", marginTop: 20 },
  actionText: { color: "#fff", textAlign: "center" },
});

export default WorkoutPlanner;
