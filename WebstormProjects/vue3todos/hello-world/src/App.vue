<template>
    <section id="app" class="todoapp">
        <header class="header">
            <h1>todos</h1>
            <input
                    class="new-todo"
                    placeholder="What needs to be done?"
                    autocomplete="off"
                    autofocus
                    v-model="input"
                    @keyup.enter="addTodo"
            >
        </header>
        <section class="main">
            <input id="toggle-all" class="toggle-all" type="checkbox">
            <label for="toggle-all">Mark all as complete</label>
            <ul class="todo-list">
                <li
                        v-for="(todo,index) in todos"
                        :key="todo"
                >
                    <div class="view">
                        <input class="toggle" type="checkbox">
                        <label>{{todo.text}}</label>
                        <button class="destroy" @click="removeId(index)"></button>
                    </div>
                    <input
                            class="edit"
                            type="text"
                    >
                </li>
            </ul>
        </section>
        <footer class="footer">
      <span class="todo-count">
        <strong>1</strong> item left
      </span>
            <ul class="filters">
                <li><a href="#/all">All</a></li>
                <li><a href="#/active">Active</a></li>
                <li><a href="#/completed">Completed</a></li>
            </ul>
            <button class="clear-completed">
                Clear completed
            </button>
        </footer>
    </section>
    <footer class="info">
        <p>Double-click to edit a todo</p>
        <!-- Remove the below line ↓ -->
        <p>Template by <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
        <!-- Change this out with your name and url ↓ -->
        <p>Created by <a href="https://www.lagou.com">教瘦</a></p>
        <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
    </footer>
</template>

<script>
  import './assets/index.css'
  import {ref} from 'vue'
  //1、添加待办事项
  const useAdd = toDos => {
    const input = ref('')
    const addTodo = () => {
      const text = input.value && input.value.trim()
      if (text.length === 0) return
      toDos.value.unshift({
        text,
        completed: false
      })
      input.value = ''

    }
    return {
      input,
      addTodo
    }
  }
  //删除待办事项
  const useRemove = todos => {
    const removeId = index => {
      console.log(index)
      todos.value.splice(index, 1)
    }
    return {
      removeId
    }

  }
  export default {
    name: 'App',
    setup() {
      const todos = ref([])
      return {
        ...useAdd(todos),
        todos,
        ...useRemove(todos)
      }
    }
  }
</script>

<style>

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
