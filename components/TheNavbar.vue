<template>
  <nav class="navbar">
    <div class="nav__logo">
      <nuxt-link :to="{ name: 'boards' }">
        <img src="https://media.istockphoto.com/vectors/ecology-t-letter-logo-with-green-leaf-vector-id1257067010?k=20&m=1257067010&s=612x612&w=0&h=kKQ1fG-rQJDZOixiSei0L3vhZtEzt7X0KRihKC9j8MY=" alt="myLogo">
        <h2>ProGrest</h2>
      </nuxt-link>
    </div>
    <div class="nav__links__wrapper">
      <form @submit="handleSearchSubmit">
        <input type="search" placeholder="Search" v-model="searchItem" />
      </form>
      <!-- <ul class="nav__links">
        <li>
          <nuxt-link :to="{ name: 'boards'}">
            sign in
          </nuxt-link>
        </li>
        <li>
          <nuxt-link class="sign-up" :to="{ name: 'boards' }">
            sign up
          </nuxt-link>
        </li>
      </ul> -->
      <div class="nav__new-board-menu">
        <button @click="toggleMenuDropdown" @blur="toggleMenuDropdown" class="nav__new-board">+</button>

        <transition>
          <div v-if="showMenu" class="nav__new-board-menu__dropdown">
            <div class="header">
              <h4>Create</h4>
            </div>
            <div class="options">
              <div @click="toggleCreateBoardModal" class="option">
                <h5>Create New Board</h5>
                <p>With a board, you can organize your workflow and be more productive. Create a new board and make it private or invite others to join you.</p>
              </div>
              <div class="option">
                <h5>Create New Team</h5>
                <p>A team can be your small team or an organization. It's really all up to you. Create new team and add boards and team members parculiar to your team members so as to have a well organized workflow within your team or organization</p>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <div class="user-img" style="background-color: #9e9e9e; height: 40px; width: 40px; border-radius: 100%; overflow: hidden;">
        <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" style="height: 100%; width: 100%;">
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useBoardStore } from '~/stores/boardStore.js'

defineComponent({
  name: 'TheNavbar'
})

const store = useBoardStore()
const { toggleCreateBoard } = store

const showMenu = ref(false)
const toggleMenuDropdown = () => {
  showMenu.value = !showMenu.value
}

const toggleCreateBoardModal = () => {
  toggleCreateBoard()
  // toggleMenuDropdown()
}

const searchItem = ref('')
const handleSearchSubmit = () => {
  console.log('Search initiated!')
  console.log('Search for:', searchItem.value)
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/base';

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  background: #fff;
  padding: 12px 56px;
  margin: 0;
  z-index: 1;

  & a {
    text-decoration: none;
    color: #1f1f1f;
  }

  & .nav__logo {
    & a {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 12px;
      height: 40px;
    }

    & img {
      width: 40px;
      height: 100%;
    }

    & h2 {
      font-size: 18px;
      font-weight: 800;
    }
  }

  & .nav__links__wrapper {
    display: flex;
    align-items: center;
    gap: 24px;

    @include slide-fade();

    & .nav__new-board-menu {
      position: relative;

      & .nav__new-board {
        @include button-fill() {
          font-size: x-large;
          padding: 0.05rem 0.8rem;
          font-weight: font-weight(normal);
        }
      }

      & .nav__new-board-menu__dropdown {
        position: absolute;
        top: 3.5rem;
        right: 0rem;
        background-color: color(primary);
        border-radius: 0.3rem;
        box-shadow: 0 0 8px 0px rgba(#000000, 0.1), 0 0 25px 0px rgba(#000000, 0.1);
        width: 30rem;
        height: max-content;
        padding: 1rem;

        & .header {
          text-align: center;
          margin-bottom: 0.8rem;
          padding-bottom: 0.8rem;
          border-bottom: 0.1rem solid rgba(#303030, 0.2);
        }

        & .options {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;

          & .option {
            padding: 0.1rem 0.3rem;
            border-radius: 0.2rem;
  
            @include transition-ease;
            @include hover-active-states {
              background-color: #dfe9db;
              cursor: pointer;
            }

            & p {
              font-size: x-small;
              font-weight: font-weight(light);
              color: color(text-hover)
            }
          }
        }
      }
    }

    & form input {
      height: 40px;
      padding: 0 1rem;
      border-radius: 0.2rem;
      outline: none;
      background-color: none;
      border: 0.1rem solid #939393;
      color: #939393;
    }

    & .nav__links {
      display: flex;
      gap: 24px;
    
      & li {
        text-transform: capitalize;
        height: 100%;

        @include unstyled-list();
    
        & a {
          @include button-outline();
          padding: auto 1.25rem;
          font-size: medium;
        }
        
        & a.sign-up {
          @include button-fill() {
            padding: auto 1.25rem;
            font-size: medium;
          }
        }
      }
    }
  }
}
</style>
