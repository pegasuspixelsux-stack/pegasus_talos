import { test, expect } from "@playwright/test";

test.describe("dashboard routes", () => {
  for (const path of ["/dashboard", "/dashboard/properties", "/dashboard/users", "/dashboard/leads", "/dashboard/settings"]) {
    test(`${path} redirects to login without a session`, async ({ page }) => {
      await page.goto(path);
      await expect(page).toHaveURL(/\/login\?next=/);
    });
  }
});
