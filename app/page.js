import CreateTodoList from '@/components/CreateTodoList'
import TodoList from '@/components/TodoList'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="p-24 ">
      <h1 className="text-6xl text-shadow font-bold text-center text-warning ">Hello World</h1>
      <div className= "flex place-content-center ">
        <CreateTodoList />
        <TodoList />
      </div>
    </main>
  )
}
