import { expect, Locator, Page } from '@playwright/test'
import { Task } from '../organisms/Task'

export class TodoPage {
  private readonly url = 'https://todo-app.tallinn-learning.ee'
  readonly page: Page
  readonly newTaskInputField: Locator
  readonly footer: Locator
  readonly todoList: Locator
  readonly tasks: Task
  readonly clearCompletedButton: Locator
  readonly allButton: Locator
  readonly activeButton: Locator
  readonly completedButton: Locator
  readonly toggleAllButton: Locator

  constructor(page: Page) {
    this.page = page
    this.newTaskInputField = page.getByTestId('text-input')
    this.footer = page.getByTestId('footer')
    this.todoList = page.getByTestId('todo-list')
    this.tasks = new Task(this.todoList)
    this.clearCompletedButton = page.locator('.clear-completed')
    this.allButton = page.locator('.selected')
    this.activeButton = page.locator('[href="#/active"]')
    this.completedButton = page.locator('[href="#/completed"]')
    this.toggleAllButton = page.getByTestId('toggle-all')
  }

  async open(): Promise<void> {
    await this.page.goto(this.url)
  }

  async createTask(text: string): Promise<void> {
    await this.newTaskInputField.fill(text)
    await this.newTaskInputField.press('Enter')
  }

  async checkTaskCount(expected_count: number): Promise<void> {
    const count = await this.tasks.taskLocator.count()
    expect(count).toBe(expected_count)
  }

  async checkCompletedDeleted(): Promise<void> {
    await this.clearCompletedButton.click()
    const locator = this.tasks.outerContainer.locator('li')
    await expect(locator).not.toHaveClass('completed')
  }

  async checkAllCount(expected_count: number): Promise<void> {
    await this.allButton.click()
    const count = await this.tasks.taskLocator.count()
    expect(count).toBe(expected_count)
  }

  async checkActiveCount(expected_count: number): Promise<void> {
    await this.activeButton.click()
    const count = await this.tasks.taskLocator.count()
    expect(count).toBe(expected_count)
  }

  async checkCompletedCount(expected_count: number): Promise<void> {
    await this.completedButton.click()
    const count = await this.tasks.taskLocator.count()
    expect(count).toBe(expected_count)
  }
  async toggleAllTasks(): Promise<void> {
    await this.toggleAllButton.click()
  }
}
