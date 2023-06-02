import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';

export default function ListScreen({ route, navigation }) {
  const { taskList } = route.params; // 라우트 매개변수에서 taskList를 가져옴
  const [selectedTasks, setSelectedTasks] = useState([]); // 선택된 할 일의 인덱스를 저장하는 상태 변수

  const handleToggleSelect = (index) => {
    const isSelected = selectedTasks.includes(index);
    if (isSelected) {
      setSelectedTasks(selectedTasks.filter((taskIndex) => taskIndex !== index)); // 선택이 해제된 경우 해당 인덱스를 선택된 목록에서 제거
    } else {
      setSelectedTasks([...selectedTasks, index]); // 선택된 경우 해당 인덱스를 선택된 목록에 추가
    }
  };

  const handleDeleteSelectedTasks = () => {
    const newTaskList = taskList.filter((_item, index) => !selectedTasks.includes(index)); // 선택된 할 일을 제외한 새로운 할 일 목록 생성
    navigation.setParams({ taskList: newTaskList }); // 라우트 매개변수에 새로운 할 일 목록 설정
    setSelectedTasks([]); // 선택된 할 일 초기화
  };

const renderTask = ({ item, index }) => (
  // 할 일을 누르면 선택/해제를 토글하는 함수(handleToggleSelect)를 호출하는 TouchableOpacity로 감싼다.
  <TouchableOpacity onPress={() => handleToggleSelect(index)}>
    <View style={styles.taskContainer}>
      <TouchableOpacity
        style={[
          styles.checkbox,
          selectedTasks.includes(index) ? styles.selectedCheckbox : null,
        ]}
        onPress={() => handleToggleSelect(index)}
      />
      <Text style={[styles.taskText, item.completed && styles.checkedTask]}>
        {item.date} - {item.task}
      </Text>
    </View>
  </TouchableOpacity>
);

  const handleCompleteSelectedTasks = () => {
    const newTaskList = taskList.map((task, index) => {
      if (selectedTasks.includes(index)) {
        return { ...task, completed: true }; // 선택된 할 일을 완료 상태로 변경
      }
      return task;
    });
    navigation.setParams({ taskList: newTaskList }); // 라우트 매개변수에 새로운 할 일 목록 설정
    setSelectedTasks([]); // 선택된 할 일 초기화
    navigation.navigate('CompletedList', { taskList: newTaskList }); // CompletedList로 이동하며 새로운 할 일 목록 전달
  };

return (
  <View style={styles.container}>
    {/* FlatList를 사용하여 할 일 목록을 렌더링한다. */}
    <FlatList
      data={taskList}
      renderItem={renderTask} // 각 항목을 렌더링하는 함수를 지정한다.
      keyExtractor={(_item, index) => index.toString()} // 각 항목의 고유 키를 설정한다.
    />
    {/* 선택된 할 일이 있을 경우에만 액션 버튼을 표시한다. */}
    {selectedTasks.length > 0 && (
      <View style={styles.actionContainer}>
        {/* 선택된 할 일을 완료 처리하는 버튼 */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleCompleteSelectedTasks}
        >
          <Text style={styles.actionButtonText}>할일 완료</Text>
        </TouchableOpacity>
        {/* 선택된 할 일을 삭제하는 버튼 */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleDeleteSelectedTasks}
        >
          <Text style={styles.actionButtonText}>삭제하기</Text>
        </TouchableOpacity>
      </View>
    )}
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#888',
    marginRight: 10,
  },
  selectedCheckbox: {
    backgroundColor: 'blue',
  },
  taskText: {
    flex: 1,
    fontSize: 16,
  },
  checkedTask: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  actionButton: {
    padding: 10,
    backgroundColor: '#888',
    borderRadius: 4,
  },
  actionButtonText: {
    color: '#fff',
  },
});
