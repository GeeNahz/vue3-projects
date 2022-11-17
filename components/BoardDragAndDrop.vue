<template>
  <div class="draggable__container">
    <draggable
      :list="columns"
      group="columns"
      item-key="id"
      :component-data="{ class: 'flex_container' }"
    >
      <template #item="{ element: column }">
        <div class="draggable__item ">
          <div class="draggable__heading">
            <board-drag-and-drop-title-field v-model="column.title" />
          </div>
          <draggable
            :list="column.taskIds"
            group="tasks"
            :animation="200"
            item-key="uid"
          >
            <template #item="{ element: taskId }">
              <board-drag-and-drop-list-item
                v-if="tasks.find((t) => t.id === taskId)"
                :task="tasks.find((t) => t.id === taskId)"
                @updateTask="updateTask"
                class="draggable__content"
              />
            </template>
          </draggable>
          <board-drag-and-drop-new-task
            @create-new-task="addTask(column.id)"
            v-model="newTaskDisplayText"
          />
        </div>
      </template>
    </draggable>
    <div class="btn">
      <div class="draggable__item">
        <div class="draggable__heading">
          <h5 v-if="!editableNewColumn" @click="toggleEditableNewColumn">Add title</h5>
          <input
            v-else
            @keyup.enter="addColumn"
            autofocus
            type="text"
            placeholder="Add title"
            v-model="newColumnTitle"
          />
          <p v-if="!editableNewColumn" @click="toggleEditableNewColumn">+ New</p>
          <p v-else @click="addColumn">+ Add</p>
        </div>
      </div>
      <!-- <button @click="addColumn">+ New Column</button> -->
    </div>
  </div>
</template>

<script setup>
  import draggable from 'vuedraggable'
  import { cloneDeep } from 'lodash-es'
  import { v4 as uuidv4 } from 'uuid'

  const props = defineProps({
    board: Object,
    tasks: Array
  })

  const emit = defineEmits(['update', 'taskUpdate', 'tasksUpdate'])
  
  const editableNewColumn = ref(false)
  const toggleEditableNewColumn = () => editableNewColumn.value = !editableNewColumn.value
  const newColumnTitle = ref('')

  const newTaskDisplayText = ref('')
  
  const tasks = reactive(cloneDeep(props.tasks))
  const board = reactive(cloneDeep(props.board))
  const columns = reactive(JSON.parse(board.order))

  const addColumn = () => {
    columns.push({ id: uuidv4(), title: newColumnTitle.value, taskIds: [] })
    
    newColumnTitle.value = ''
    editableNewColumn.value = false
  }

  let taskRef = null
  const addTask = (columnId) => {
    taskRef = {
      isNew: true,
      data: {
        id: uuidv4(),
        title: newTaskDisplayText.value
      }
    }
    let column = columns.find(column => column.id === columnId)
    column.taskIds.push(taskRef.data.id)
    tasks.push(taskRef.data)

    newTaskDisplayText.value = ''
  }

  const updateTask = (taskId, data) => {
    let currTaskIndex = tasks.findIndex(task => task.id == taskId)
    taskRef = {
      isNew: false,
      data: {
        ...tasks[currTaskIndex],
        title: data
      }
    }
    tasks[currTaskIndex] = {
      ...taskRef.data
    }
  }

  watch(columns, () => {
    console.log(tasks)
    emit('update', cloneDeep({
    ...props.board, order: JSON.stringify(toRaw(columns))
  }))})

  watch(tasks, () => {
    if(taskRef.isNew) {
      emit('tasksUpdate', taskRef.data)
    } else {
      emit('taskUpdate', taskRef.data)
    }
    taskRef = null
  })

</script>

<style lang="scss" scoped>
  @import '../assets/styles/base';
  .flex_container {
    display: flex;
    gap: 1rem;
    height: 100%;
  }
  .draggable__item {
    display: flex;
    flex-direction: column;
    max-width: 340px;
    width: 340px;
    height: max-content;
    padding: 0.5rem 0.8rem;
    border-radius: 0.3rem;
    background-color: color(text-secondary);
    color: #1f1f1f;

    & .draggable__heading {
      display: flex;
      justify-content: space-between;
      align-items: center;
  
      & p {
        @include button-fill() {
          font-size: medium;
          padding: 0.16rem 0.6rem;
          border-radius: 0.2rem;
          white-space: nowrap;
        }
        @include center-items();
      }

      & h5 {
        font-size: 14px;
        font-weight: font-weight(normal);
        color: color(text-primary);
        width: 15rem;
        white-space: no-wrap;

        @include hover-active-states {
          cursor: pointer;
        }
      }

      & input {
        outline: none;
        border: none;
        background: none;

        &:focus {
          outline: none;
        }
      }
    }

    & .draggable__content {
      margin: 0.5rem 0;
      cursor: move;
    }
  }

  .draggable__container {
    display: flex;
    gap: 1rem;
    margin-top: 0.5rem;

    & .btn {
      // padding: 0 0.2rem;
  
      & button {
        /* filter: invert(1); */
        mix-blend-mode: difference;
        color: #fff;
        background-color: transparent;
        outline: none;
        font-size: larger;
        font-weight: 600;
        border: none;
  
        @include hover-active-states {
          color: #e76f51;
        }
      }
    }
  }
</style>
