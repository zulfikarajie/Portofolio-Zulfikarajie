import { test, expect } from "@playwright/test";

test("single-image carousel hides arrows and stays on 1 / 1", async ({ page }) => {
  await page.goto("/projects/hello-net-educational-game");
  const counter = page.getByTestId("carousel-counter");
  await expect(page.getByTestId("carousel")).toBeVisible();
  await expect(counter).toContainText("1 / 1");

  // Arrows hidden when only one photo
  await expect(page.getByTestId("carousel-prev")).toHaveCount(0);
  await expect(page.getByTestId("carousel-next")).toHaveCount(0);

  // Single dot only
  await expect(page.getByTestId("carousel-dot-0")).toBeVisible();
  await expect(page.getByTestId("carousel-dot-1")).toHaveCount(0);

  // Keyboard navigation is a no-op for a single image
  await page.getByTestId("carousel").focus();
  await page.keyboard.press("ArrowRight");
  await expect(counter).toContainText("1 / 1");
  await page.keyboard.press("ArrowLeft");
  await expect(counter).toContainText("1 / 1");
});

test("carousel lightbox opens and closes", async ({ page }) => {
  await page.goto("/projects/hello-net-educational-game");
  await page.getByTestId("carousel-slide-active").click();
  const lightbox = page.getByTestId("carousel-lightbox");
  await expect(lightbox).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(lightbox).toHaveCount(0);

  // reopen, close via button
  await page.getByTestId("carousel-slide-active").click();
  await expect(page.getByTestId("carousel-lightbox")).toBeVisible();
  await page.getByTestId("carousel-lightbox-close").click();
  await expect(page.getByTestId("carousel-lightbox")).toHaveCount(0);
});

test("experience page without images shows empty state", async ({ page }) => {
  await page.goto("/experience/it-intern-pdam-surya-sembada");
  await expect(page.getByTestId("carousel-empty")).toBeVisible();
});
