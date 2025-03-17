import { test } from '@playwright/test'
import { TodoPage } from '../page-objects/pages/todo-page'

test.describe('Todo App tests', async () => {
  test('TL-19 common checks', async ({ page }) => {
    const todoPage = new TodoPage(page)
    await todoPage.open()
    await todoPage.createTask('Task 1')
    await todoPage.createTask('Task 2')
    await todoPage.createTask('Task 3')
    await todoPage.checkTaskCount(3)
    await todoPage.tasks.removeTask('Task 1')
    await todoPage.tasks.completeTask('Task 2')
    await todoPage.tasks.checkTaskCompleted('Task 2')
  })

  test('TL-19-1 Test that "Clear completed" button deletes only all completed tasks', async ({
    page,
  }) => {
    const todoPage = new TodoPage(page)
    await todoPage.open()
    await todoPage.createTask('Task 1')
    await todoPage.createTask('Task 2')
    await todoPage.createTask('Task 3')
    await todoPage.tasks.completeTask('Task 1')
    await todoPage.tasks.completeTask('Task 2')
    await todoPage.checkCompletedDeleted()
    await todoPage.checkActiveCount(1)
  })

  test('TL-19-2 Test that buttons "All", "Active" and "Completed" show actual tasks count', async ({
    page,
  }) => {
    const todoPage = new TodoPage(page)
    await todoPage.open()
    await todoPage.createTask('Task 1')
    await todoPage.createTask('Task 2')
    await todoPage.createTask('Task 3')
    await todoPage.tasks.completeTask('Task 1')
    await todoPage.tasks.completeTask('Task 2')
    await todoPage.checkAllCount(3)
    await todoPage.checkActiveCount(1)
    await todoPage.checkCompletedCount(2)
  })

  test('TL-19-3 Test that "Toggle all" button marks all tasks as completed', async ({
    page,
  }) => {
    const todoPage = new TodoPage(page)
    await todoPage.open()
    await todoPage.createTask('Task 1')
    await todoPage.createTask('Task 2')
    await todoPage.createTask('Task 3')
    await todoPage.toggleAllTasks()
    await todoPage.checkCompletedCount(3)
  })
})
