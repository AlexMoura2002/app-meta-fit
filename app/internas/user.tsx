import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, TextInput, StyleSheet, FlatList, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const WorkoutPlanner = () => {
  const [activeWeek, setActiveWeek] = useState(0);
  const [activeDay, setActiveDay] = useState(0);
  const [workouts, setWorkouts] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [currentWorkout, setCurrentWorkout] = useState({});
  const [editMode, setEditMode] = useState(false);

  const semanas = ["Semana 1", "Semana 2", "Semana 3", "Semana 4"];
  const dias = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

  const abrirModal = (workout = null, dia = activeDay) => {
    setEditMode(!!workout);
    setCurrentWorkout(workout || { nome: "", series: "", observacao: "", dia });
    setModalVisible(true);
  };

  const salvarExercicio = () => {
    const { nome, series, observacao, dia } = currentWorkout;
    if (!nome || !series) return alert("Preencha os campos obrigatórios!");

    const updatedWorkouts = { ...workouts };
    if (!updatedWorkouts[activeWeek]) updatedWorkouts[activeWeek] = {};
    if (!updatedWorkouts[activeWeek][dia]) updatedWorkouts[activeWeek][dia] = [];

    if (editMode) {
      const index = updatedWorkouts[activeWeek][dia].findIndex((w) => w === currentWorkout);
      updatedWorkouts[activeWeek][dia][index] = { nome, series, observacao, dia };
    } else {
      updatedWorkouts[activeWeek][dia].push({ nome, series, observacao, dia });
    }

    setWorkouts(updatedWorkouts);
    setModalVisible(false);
  };

  const excluirExercicio = (dia, workout) => {
    const updatedWorkouts = { ...workouts };
    updatedWorkouts[activeWeek][dia] = updatedWorkouts[activeWeek][dia].filter((w) => w !== workout);
    setWorkouts(updatedWorkouts);
  };

  return (
    <View style={styles.container}>
      {/* Seletor de semanas */}
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

      {/* Seletor de dias */}
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

      {/* Lista de exercícios */}
      <FlatList
        data={workouts[activeWeek]?.[activeDay] || []}
        keyExtractor={(_, index) => index.toString()}
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

      {/* Botão para adicionar exercícios */}
      <TouchableOpacity style={styles.addButton} onPress={() => abrirModal()}>
        <Text style={styles.addButtonText}>Adicionar Exercício</Text>
      </TouchableOpacity>

      {/* Modal para adicionar/editar exercícios */}
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
