<template>
  <div
    v-if="store.boards.length !== 0"
    class="board__detail__container"
    :style="board.imageUrl.downloadUrl ? `background: url(${board.imageUrl.downloadUrl}); background-repeat: no-repeat; background-size: cover; background-position: center;` : `background-image: -webkit-linear-gradient(-85deg, rgba(${hexToRgb(board.color)}, 0.5), rgba(${hexToRgb(board.color)}, 0.1))` "
  >
    <!-- metatags -->
    <Head>
      <Title>ProGrest - {{ board.title }}</Title>
      <Meta name="description" :content="board.description" />
    </Head>

    <!-- main section -->
    <div class="board__detail__heading">
      <div class="btn">
        <button @click="goBack" class="back__btn">&lt;</button>
      </div>
      <div class="board__title">
        <h4>{{ board.title }}</h4>
      </div>
    </div>
    <div class="list__container">
      <board-drag-and-drop
        :board="board"
        :tasks="tasks"
        @update="updateLocalBoard"
        @tasksUpdate="updateTasks"
        @taskUpdate="updateSingleTask"
      />
    </div>
  </div>
</template>

<script setup>
  import { useBoardStore } from '~/stores/boardStore'
  import { storeToRefs } from 'pinia'
  
  definePageMeta({
    layout: 'boards',
  })
  
  const route = useRoute()
  const store = useBoardStore()

  const { createTask, updateBoard, updateTask } = store
  const { boards, tasks } = storeToRefs(store)
  
  const board = ref(store.getBoard(route.params.id)[0])

  onMounted(() => {
    if(tasks.value.length === 0) {
      getAllDocs('task').then(res => {
        tasks.value = res
      })
    }
    if(boards.value.length === 0) {
      getAllDocs('board').then(res => boards.value = res)
    }
  })

  // useHead({
  //   title: `ProGrest - ${board.title}`,
  //   meta: [
  //     { name: 'description', content: `The description of the board/project provided if any` }
  //   ]
  // })

  // convert hex color code to rgba color code
  function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
      : "0, 0, 0"
  }

  const updateLocalBoard = (b) => {
    board.value = b
    
    // call a board update store action here
    updateBoard(b)
  }

  const updateTasks = (t) => {
    createTask(t)
  }

  const updateSingleTask = (t) => {
    updateTask(t)
  }

  const router = useRouter()

  const goBack = () => router.back()

</script>

<style lang="scss" scoped>
  @import '../../assets/styles/base';

  .board__detail__container {
    position: relative;
    // background: -webkit-linear-gradient(-85deg, rgba(#15616d, 1.0), rgba(#15616d, 0.1));
    background-repeat: no-repeat;
    background-size: cover;
    padding: 5rem 2rem 3rem 2rem;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;

    & .board__detail__heading {
      display: flex;
      gap: 0.2rem;

      & .btn button, & .board__title {
        padding: 0.2rem 0.8rem;
        color: color('white');
        background-color: color(secondary);
        border-radius: 0.2rem;
        overflow: hidden;
      }

      & .btn {
        & button {
          // background-color: transparent;
          outline: none;
          border: none;
          color: color('white');
          font-size: medium;
          font-weight: font-weight(medium);
          transition: color 0.2s, text-shadow 0.2s;

          @include transition-ease();
          @include hover-active-states {
            cursor: pointer;
            background-color: color(text-hover);
          }
        }
      }
      
      & .board__title {
        text-align: start;
      }
    }

    & .list__container {
      overflow-x: scroll;
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */
      height: 95%;

      &::-webkit-scrollbar {
        display: none;
      }
      // @include container();
    }
  }

</style>
