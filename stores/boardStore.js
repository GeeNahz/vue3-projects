import { defineStore } from 'pinia'
import { updateDoc, saveDoc } from '~~/composables/firebase'

export const useBoardStore = defineStore('board', {
  state: () => (
    {
      // boards: [
      //   {
      //     id: 'a24f1kb0-5889-480f-abe3-9ae99afe216e',
      //     title: 'Making landing page',
      //     description: 'A very brief description here',
      //     order: JSON.stringify([
      //       { id: 1, title: 'Banking', taskIds: [1, 2] },
      //       { id: 2, title: 'Hike', taskIds: [3, 4, 5] }
      //     ]),
      //     color: '#15616d',
      //     imageUrl: {
      //       downloadUrl: ''
      //     }
      //   },
      //   {
      //     id: 'a24f1bb0-4989-480f-aae3-0ae99afe616e',
      //     title: 'Build Porfolio',
      //     description: 'A very brief description here',
      //     order: JSON.stringify([
      //       { id: 1, title: 'Planned', taskIds: [6, 7] },
      //       { id: 2, title: 'In Progress', taskIds: [8, 11, 12] },
      //       { id: 3, title: 'Done', taskIds: [9, 10] }
      //     ]),
      //     color: '#2a9d8f',
      //     imageUrl: {
      //       downloadUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cG9ydGZvbGlvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
      //     }
      //   },
      //   {
      //     id: 'bbf5af9a-162e-46c8-8481-30ac1a35b25d',
      //     title: 'Break the streaks now',
      //     description: 'A very brief description here',
      //     order: JSON.stringify([
      //       { id: 1, title: 'Planned', taskIds: [6, 7] },
      //       { id: 2, title: 'In Progress', taskIds: [8] },
      //       { id: 3, title: 'Done', taskIds: [9] }
      //     ]),
      //     color: '#e9c46a',
      //     imageUrl: {
      //       downloadUrl: ''
      //     }
      //   },
      //   {
      //     id: '7a4608c3-487a-4cf4-8a8b-b381328ec602',
      //     title: 'Clean the code',
      //     description: 'A very brief description here',
      //     order: JSON.stringify([
      //       { id: 1, title: 'research', taskIds: [11] },
      //       { id: 2, title: 'Design', taskIds: [12] },
      //       { id: 3, title: 'Deploy', taskIds: [10] },
      //       { id: 4, title: 'Decommission', taskIds: [13] }
      //     ]),
      //     color: '#f4a261',
      //     imageUrl: {
      //       downloadUrl: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
      //     }
      //   },
      //   {
      //     id: 'f2b97e7b-6592-4690-b0d4-c74760178ab4',
      //     title: 'Make Lunch',
      //     description: 'A very brief description here',
      //     order: JSON.stringify([
      //       { id: 1, title: 'Planned', taskIds: [10] },
      //       { id: 2, title: 'In Progress', taskIds: [11, 12] },
      //       { id: 3, title: 'Completed', taskIds: [13] },
      //       { id: 4, title: 'Closed', taskIds: [9] }
      //     ]),
      //     color: '#f4acb7',
      //     imageUrl: {
      //       downloadUrl: ''
      //     }
      //   }
      // ],
      boards: [],
      tasks: [],
      toggleMenu: false
    }
  ),
  getters: {
    getBoard: (state) => {
      return (id) => {
        const board = state.boards.filter(board => board.id === id)
        return board
      }
    },
    getListsFromBoards: (state) => {
      return (boardId) => {
        const id = parseInt(boardId)
        const currentBoard = state.boards.filter((board) => board.id === id)
        return currentBoard[0].orders.flatMap((order) => state.lists.filter((list) => list.id === order))
      }
    },
    getTasks: (state) => state.tasks,
  },
  actions: {
    createBoard(board) {
      // save new board to fireStore
      saveDoc('board', board)
      .then(res => {
        // when saving on firebase is complete then save to pinia store
        this.boards.push(board)
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    },
    updateBoard(board) {
      // update board on fireStore
      updateDoc('board', board.id, board)
      .then(res => {
        // when saving on firebase is complete then save to pinia store
        let boardIndex = this.boards.findIndex(currboard => currboard.id === board.id)
        this.boards[boardIndex] = board

        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    },
    deleteBoard() {},

    createTask(task) {
      // this.tasks.push(task)
      // let id = ''

      // save new task to fireStore
      saveDoc('task', task)
      .then(res => {
        // when saving on firebase is complete then save to pinia store
        this.tasks.push({
          ...task
        })
        console.log(res)
      })
      .catch(err => {
        console.log('Error: ', err)
      })
    },
    updateTask(task) {
      // update task on fireStore
      console.log(task.id)
      updateDoc('task', task.id, task)
      .then(res => {
        // when saving on firebase is complete then save to pinia store
        let taskIndex = this.tasks.findIndex(currtask => currtask.id === task.id)
        this.tasks[taskIndex] = task

        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    },
    deleteTask() {},

    toggleCreateBoard() {
      this.toggleMenu = !this.toggleMenu
    }
  }
})
