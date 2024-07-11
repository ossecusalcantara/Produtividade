import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CheckBox } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Dados mocados com nova categoria
const initialTasks = [
    { id: '1', label: 'Tarefa 1', completed: false, category: 'Urgente e importante' },
    { id: '2', label: 'Tarefa 2', completed: false, category: 'Não urgente e importante' },
    { id: '3', label: 'Tarefa 3', completed: false, category: 'Urgente e não importante' },
    { id: '4', label: 'Tarefa 4', completed: false, category: 'Não urgente e não importante' },
];

// Dados mocados com hábitos e quantidade de vezes realizados
const initialHabits = [
    { id: '1', label: 'Hábito 1', timesCompleted: 0 },
    { id: '2', label: 'Hábito 2', timesCompleted: 0 },
    { id: '3', label: 'Hábito 3', timesCompleted: 0 },
    { id: '4', label: 'Hábito 4', timesCompleted: 0 },
];

function HomeScreen() {
    const [tasks, setTasks] = useState(initialTasks);

    const toggleTaskCompletion = (taskId: string) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
            ).sort((a, b) => Number(a.completed) - Number(b.completed))
        );
    };

    return (
        <View style={styles.screen}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={true}>
                <FlatList
                    data={tasks}
                    renderItem={({ item }) => (
                        <CheckBox
                            title={item.label}
                            checked={item.completed}
                            onPress={() => toggleTaskCompletion(item.id)}
                            containerStyle={styles.checkboxContainer}
                            textStyle={item.completed ? styles.completedText : styles.uncompletedText}
                        />
                    )}
                    keyExtractor={item => item.id}
                />
            </ScrollView>
        </View>
    );
}

function HabitsScreen() {
    const [habits, setHabits] = useState(initialHabits);

    const toggleHabitCompletion = (habitId: string) => {
        setHabits(prevHabits =>
            prevHabits.map(habit =>
                habit.id === habitId ? { ...habit, timesCompleted: habit.timesCompleted + 1 } : habit
            )
        );
    };

    return (
        <View style={styles.screen}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={true}>
                <Text style={styles.label}>Hábitos</Text>
                {habits.map(habit => (
                    <TouchableOpacity
                        key={habit.id}
                        style={styles.habitContainer}
                        onPress={() => toggleHabitCompletion(habit.id)}
                    >
                        <Text style={styles.habitLabel}>{habit.label}</Text>
                        <Text style={styles.timesCompletedText}> - Realizado {habit.timesCompleted} vezes</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}


function ImportantScreen() {
    const [tasks, setTasks] = useState(initialTasks);

    const renderCategory = (category: string, style: object) => {
        return (
            <View style={[styles.categoryContainer, style]}>
                <Text style={styles.categoryTitle}>{category}</Text>
                <FlatList
                    data={tasks.filter(task => task.category === category)}
                    renderItem={({ item }) => (
                        <CheckBox
                            title={item.label}
                            checked={item.completed}
                            onPress={() => toggleTaskCompletion(item.id)}
                            containerStyle={styles.checkboxContainer}
                            textStyle={item.completed ? styles.completedText : styles.uncompletedText}
                        />
                    )}
                    keyExtractor={item => item.id}
                />
            </View>
        );
    };

    const toggleTaskCompletion = (taskId: string) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
            ).sort((a, b) => Number(a.completed) - Number(b.completed))
        );
    };

    return (
        <View style={styles.screen}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={true}>
                {renderCategory('Urgente e importante', styles.urgentImportant)}
                {renderCategory('Não urgente e importante', styles.notUrgentImportant)}
                {renderCategory('Urgente e não importante', styles.urgentNotImportant)}
                {renderCategory('Não urgente e não importante', styles.notUrgentNotImportant)}
            </ScrollView>
        </View>
    );
}

function  CadastrarScreen() {
    const navigation = useNavigation();

    return (
        <View style={styles.buttonContainer}>
            <Button
                title="Nova Tarefa"
                
            />
            <Button
                title="Novo Hábito"
                
            />
        </View>
    );
}

// Telas adicionais
function ScreenA() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Screen A</Text>
        </View>
    );
}

function ScreenB() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Screen B</Text>
        </View>
    );
}
    

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer theme={MyTheme}>
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <Text style={styles.label}>Produtividade</Text>
                </View>

                <View style={styles.content}>
                    <Tab.Navigator
                        screenOptions={{
                            tabBarStyle: {
                                backgroundColor: '#333',
                            },
                            tabBarActiveTintColor: 'tomato',
                            tabBarInactiveTintColor: 'gray',
                            tabBarLabelStyle: {
                                fontSize: 12,
                            },
                        }}
                    >
                        <Tab.Screen
                            name="Tarefas"
                            component={HomeScreen}
                            options={{
                                tabBarLabel: 'Tarefas',
                                tabBarIcon: ({ color, size }) => (
                                    <Ionicons name="ios-checkmark-circle" color={color} size={size} />
                                ),
                            }}
                        />
                        <Tab.Screen
                            name="Importância"
                            component={ImportantScreen}
                            options={{
                                tabBarLabel: 'Importância',
                                tabBarIcon: ({ color, size }) => (
                                    <Ionicons name="ios-star" color={color} size={size} />
                                ),
                            }}
                        />
                        <Tab.Screen
                            name="Hábitos"
                            component={HabitsScreen}
                            options={{
                                tabBarLabel: 'Hábitos',
                                tabBarIcon: ({ color, size }) => (
                                    <Ionicons name="ios-list" color={color} size={size} />
                                ),
                            }}
                        />
                        <Tab.Screen
                            name="Cadastrar"
                            component={CadastrarScreen}
                            options={{
                                tabBarLabel: 'Cadastrar',
                                tabBarIcon: ({ color, size }) => (
                                    <Ionicons name="ios-list" color={color} size={size} />
                                ),
                            }}
                        />
                    </Tab.Navigator>
                </View>

                <View style={styles.bottomBar}>
                    <Text style={styles.bottomText}>© 2024 My Company</Text>
                </View>

                <StatusBar style="auto" />
            </View>
        </NavigationContainer>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    topBar: {
        backgroundColor: '#222',
        padding: 15,
        alignItems: 'center',
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    content: {
        flex: 1,
    },
    bottomBar: {
        backgroundColor: '#444',
        padding: 10,
        alignItems: 'center',
    },
    bottomText: {
        color: '#ccc',
    },
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollView: {
        width: '100%',
    },
    checkboxContainer: {
        alignSelf: 'flex-start',
        backgroundColor: 'transparent',
        borderWidth: 0,
    },
    completedText: {
        color: 'gray',
        textDecorationLine: 'line-through',
    },
    uncompletedText: {
        color: 'black',
    },
    categoryContainer: {
        marginBottom: 20,
        width: '90%',
        padding: 10,
        borderRadius: 5,
        marginLeft: 10,
    },
    categoryTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    urgentImportant: {
        backgroundColor: '#ffcccc',
    },
    notUrgentImportant: {
        backgroundColor: '#ccffcc',
    },
    urgentNotImportant: {
        backgroundColor: '#ffcc99',
    },
    notUrgentNotImportant: {
        backgroundColor: '#ccccff',
    },
    
    habitContainer: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: 15,
        marginBottom: 10,
        marginLeft: 10,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        width: '90%',
    },

    habitLabel: {
        fontSize: 16,
        fontWeight: 'bold',
    },

    timesCompletedText: {
        fontSize: 14,
        color: '#666',
    },

    buttonContainer: {
        width: '100%',
        marginBottom: 10,
    },
    button: {
        alignItems: 'flex-start',
    },
});

const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: '#fff',
    },
};
