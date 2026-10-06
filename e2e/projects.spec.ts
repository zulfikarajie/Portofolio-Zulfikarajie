import { test, expect } from "@playwright/test";

const PROJECT_SLUGS = [
  "hello-net-educational-game",
  "moninven-inventory-maintenance",
  "semodia-motorcycle-buddy",
  "selfuel-fuel-apps",
  "simple-mobile-painter",
  "property-management-system",
];

test("home shows 6 clickable project cards", async ({ page }) => {
  await page.goto("/");
  // Wait for client hydration + hero intro before scrolling (avoids
  // acting on server-rendered nodes that React is about to hydrate).
  await expect(page.locator("#hero h1")).not.toBeEmpty({ timeout: 15000 });
  // Desktop pinned crossfade: drive to the panel via the section rail.
  // Mobile stacked flow: rail is hidden, scroll to the section directly.
  const workRail = page.getByRole("button", { name: "Go to Work section" });
  if (await workRail.isVisible()) {
    await workRail.click();
  } else {
    await page.locator("#projects").scrollIntoViewIfNeeded();
  }
  for (const slug of PROJECT_SLUGS) {
    await expect(page.getByTestId(`project-card-${slug}`)).toBeVisible();
  }
});

test("project detail renders carousel + github button when repo exists", async ({
  page,
}) => {
  await page.goto("/projects/hello-net-educational-game");
  await expect(page.getByTestId("project-title")).toContainText("Hello Net");
  await expect(page.getByTestId("carousel")).toBeVisible();
  await expect(page.getByTestId("carousel-counter")).toContainText("1 / 1");
  const github = page.getByTestId("project-github");
  await expect(github).toBeVisible();
  await expect(github).toHaveAttribute("target", "_blank");
  await expect(github).toHaveAttribute(
    "href",
    "https://github.com/zulfikarajie/HelloNet---Game"
  );
});

test("project without repo hides github button but still shows single-image carousel", async ({
  page,
}) => {
  await page.goto("/projects/property-management-system");
  await expect(page.getByTestId("project-title")).toBeVisible();
  await expect(page.getByTestId("project-github")).toHaveCount(0);
  await expect(page.getByTestId("carousel")).toBeVisible();
  await expect(page.getByTestId("carousel-counter")).toContainText("1 / 1");
  await expect(page.getByTestId("carousel-prev")).toHaveCount(0);
  await expect(page.getByTestId("carousel-next")).toHaveCount(0);
});

test("project prev/next navigation works", async ({ page }) => {
  await page.goto("/projects/moninven-inventory-maintenance");
  await page.getByTestId("project-next").click();
  await expect(page).toHaveURL(/semodia-motorcycle-buddy/);
  await page.getByTestId("project-prev").click();
  await expect(page).toHaveURL(/moninven-inventory-maintenance/);
});

test("unknown project slug shows 404", async ({ page }) => {
  const res = await page.goto("/projects/does-not-exist");
  expect(res?.status()).toBe(404);
});
