import { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const CompletedListScreen = ({ route }) => {
  const { taskList } = route.params;
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    // taskList이 업데이트될 때마다 완료된 할 일 목록을 업데이트하는 로직을 실행한다.
    if (taskList) {
      // taskList에서 completed가 true인 할 일만 필터링하여 완료된 할 일 목록을 생성한다.
      const updatedCompletedTasks = taskList.filter(task => task.completed);
      // 완료된 할 일 목록을 상태(completedTasks)에 업데이트한다.
      setCompletedTasks(updatedCompletedTasks);
    }
  }, [taskList]);

  return (
    <View style={styles.container}>
      {/* FlatList를 사용하여 완료된 할 일 목록을 렌더링한다. */}
      <FlatList
        data={completedTasks}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text style={styles.taskText}>
              {item.date} - {item.task}
            </Text>
          </View>
        )}
        keyExtractor={(_item, index) => index.toString()} // 각 항목의 고유 키를 설정한다.
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  taskContainer: {
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
  taskText: {
    fontSize: 16,
  },
});

export default CompletedListScreen;
