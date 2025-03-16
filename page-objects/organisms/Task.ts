import {expect, Locator} from "@playwright/test";

export class Task {
    readonly outerContainer: Locator
    readonly taskLocator: Locator;
    readonly removeButton: Locator;

    constructor(outerContainer: Locator) {
        this.outerContainer = outerContainer;
        this.taskLocator = outerContainer.getByTestId("todo-item");
        this.removeButton = outerContainer.getByTestId("todo-item-button");
    }

    async removeTask(innerText: string): Promise<void> {
        await this.outerContainer.locator("li", {hasText: innerText}).hover();
        await this.outerContainer.locator("li", {hasText: innerText}).locator("button").click();
    }

    async completeTask(innerText: string): Promise<void> {
        await this.outerContainer.locator("li", {hasText: innerText}).locator("input").check();
    }

    async checkTaskCompleted(innerText: string): Promise<void> {
        const locator = this.outerContainer.locator("li", {hasText: innerText});
        await expect(locator).toHaveClass("completed");
    }
}
