import { test, expect } from "@playwright/test";

test.describe("landing page", () => {
  test("renders the four core sections", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1 })).toContainText("en la costa");
    await expect(page.locator("#properties")).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();
    await expect(page.getByRole("banner")).toBeVisible();
  });

  test("shows a property card per listing in the grid", async ({ page }) => {
    await page.goto("/");

    const cards = page.locator("#properties article");
    await expect(cards).toHaveCount(17);
  });

  test("newsletter input accepts an email and requires one", async ({ page }) => {
    await page.goto("/");

    const input = page.getByLabel("Correo electrónico");
    await expect(input).toHaveAttribute("type", "email");
    await expect(input).toHaveAttribute("required", "");
  });

  test("light is the default and the theme selector remembers a dark choice", async ({ page }) => {
    await page.goto("/");

    const html = page.locator("html");
    await expect(html).not.toHaveAttribute("data-theme", "dark");
    await expect(page.getByRole("radio", { name: "Claro" })).toHaveAttribute("aria-checked", "true");

    await page.getByRole("radio", { name: "Oscuro" }).click();
    await expect(html).toHaveAttribute("data-theme", "dark");
    await expect(page.getByRole("radio", { name: "Oscuro" })).toHaveAttribute("aria-checked", "true");

    await page.reload();
    await expect(html).toHaveAttribute("data-theme", "dark");

    await page.getByRole("radio", { name: "Claro" }).click();
    await expect(html).toHaveAttribute("data-theme", "light");
  });

  test("uses the Instrument Serif font variable for headlines", async ({ page }) => {
    await page.goto("/");

    const family = await page
      .getByRole("heading", { level: 1 })
      .evaluate((el) => getComputedStyle(el).fontFamily);
    expect(family.toLowerCase()).toContain("instrument serif");
  });
});
