// Complete the Index page component here
// Use chakra-ui
import { Box, Input, Button, List, ListItem, ListIcon, IconButton, useToast } from '@chakra-ui/react';
import { FaTrash, FaCheckCircle, FaPlus } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = React.useState([]);
  const [input, setInput] = React.useState('');
  const toast = useToast();

  const handleAddTask = () => {
    if (input.trim() === '') {
      toast({
        title: 'No task entered.',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: input, isCompleted: false }]);
    setInput('');
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
  };

  return (
    <Box p={5}>
      <Input
        placeholder="Add a new task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        size="lg"
        mb={3}
      />
      <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={handleAddTask}>
        Add Task
      </Button>
      <List spacing={3} mt={5}>
        {tasks.map(task => (
          <ListItem key={task.id} d="flex" alignItems="center" justifyContent="space-between">
            <Box as="span" textDecoration={task.isCompleted ? 'line-through' : 'none'}>
              {task.text}
            </Box>
            <Box>
              <IconButton
                icon={<FaCheckCircle />}
                onClick={() => handleToggleComplete(task.id)}
                colorScheme={task.isCompleted ? 'green' : 'gray'}
                aria-label="Complete Task"
                mr={2}
              />
              <IconButton
                icon={<FaTrash />}
                onClick={() => handleDeleteTask(task.id)}
                colorScheme="red"
                aria-label="Delete Task"
              />
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Index;