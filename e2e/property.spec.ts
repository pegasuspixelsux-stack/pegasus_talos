import { test, expect } from "@playwright/test";

test.describe("property detail page", () => {
  test("renders a listing with specs, amenities and the contact card", async ({ page }) => {
    await page.goto("/properties/villa-atlantica");

    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Villa Atlántica");
    await expect(page.getByRole("heading", { name: "Amenities" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Consultar por WhatsApp" })).toBeVisible();
  });

  test("gallery counter starts at 01 and advances", async ({ page }) => {
    await page.goto("/properties/villa-atlantica");

    const counter = page.getByText(/^01 \/ 04$/);
    await expect(counter).toBeVisible();
    await page.getByRole("button", { name: "Imagen siguiente" }).click();
    await expect(page.getByText(/^02 \/ 04$/)).toBeVisible();
  });

  test("unknown property id returns 404", async ({ page }) => {
    const response = await page.goto("/properties/does-not-exist");
    expect(response?.status()).toBe(404);
  });

  test("catalog lists every property and links to its detail page", async ({ page }) => {
    await page.goto("/properties");

    const cards = page.locator("main a[href^='/properties/']");
    await expect(cards).toHaveCount(17);
    await cards.first().click();
    await expect(page).toHaveURL(/\/properties\/villa-manantiales$/);
  });
});
