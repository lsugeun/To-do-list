import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const [task, setTask] = useState(''); // 할 일을 저장하는 상태 변수
  const [taskList, setTaskList] = useState([]); // 할 일 목록을 저장하는 상태 변수
  const [selectedDate, setSelectedDate] = useState(''); // 선택된 날짜를 저장하는 상태 변수
  const navigation = useNavigation(); // 네비게이션 훅을 사용하여 네비게이션 객체를 가져옴

  const handleAddTask = () => {
    if (task.length > 0 && selectedDate !== '') {
      // 할 일과 선택된 날짜가 입력되어 있는지 확인
      const newTask = { date: selectedDate, task, completed: false }; // 새로운 할 일 객체 생성
      setTaskList([...taskList, newTask]); // 할 일 목록에 새로운 할 일 추가
      setTask(''); // 할 일 입력 필드 초기화
      setSelectedDate(''); // 선택된 날짜 초기화
      navigation.navigate('List', { taskList: [...taskList, newTask] }); // ListScreen으로 이동하며 할 일 목록 전달
    }
  };

  const handleViewList = () => {
    navigation.navigate('List', { taskList }); // ListScreen으로 이동하며 전체 할 일 목록 전달
  };

  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        <Calendar
          onDayPress={(day) => setSelectedDate(day.dateString)} // 날짜를 선택할 때마다 선택된 날짜 변경
          markedDates={{ [selectedDate]: { selected: true } }} // 선택된 날짜에 표시되는 스타일 적용
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="할 일 입력"
          value={task}
          onChangeText={(text) => setTask(text)} // 할 일 입력 시 상태 변수 업데이트
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Text style={styles.addButtonText}>추가</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.viewListButton} onPress={handleViewList}>
        <Text style={styles.viewListButtonText}>목록 보기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  calendarContainer: {
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 4,
    padding: 10,
  },
  addButton: {
    backgroundColor: '#007AFF',
    marginLeft: 10,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  viewListButton: {
    backgroundColor: '#888',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 20,
  },
  viewListButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
