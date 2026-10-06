import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";

const EXPERIENCE_SLUGS = [
  "it-intern-pdam-surya-sembada",
  "head-hr-hmif-upnvy",
  "senior-staff-hr-hmif-upnvy",
  "junior-staff-hr-hmif-upnvy",
];

/** Drive to the About section. Desktop uses the pinned section rail,
 *  mobile stacked flow scrolls directly (no tabs/accordion toggles). */
async function openAboutPanel(page: Page) {
  const aboutRail = page.getByRole("button", { name: "Go to About section" });
  if (await aboutRail.isVisible()) {
    await aboutRail.click();
  } else {
    // Mobile stacked flow: rail is hidden, scroll directly.
    await page.locator("#about").scrollIntoViewIfNeeded();
  }
  await page.waitForFunction(
    () => {
      const about = document.getElementById("about");
      if (!about) return false;
      const r = about.getBoundingClientRect();
      // Stacked mobile: about scrolls into view; pinned desktop: panel opacity 1.
      const panels = [...document.querySelectorAll("[data-crossfade-panel]")];
      const pinned = panels[1] && getComputedStyle(panels[1]).opacity === "1";
      return (r.top < window.innerHeight && r.bottom > 0) || !!pinned;
    },
    null,
    { timeout: 10000 }
  );
  // About content is always rendered (no tabs) — ensure it is in view.
  await page.locator("#about").scrollIntoViewIfNeeded();
}

test("home shows 4 clickable experience cards", async ({ page }) => {
  await page.goto("/");
  // Wait for client hydration + hero intro before scrolling (avoids
  // acting on server-rendered nodes that React is about to hydrate).
  await expect(page.locator("#hero h1")).not.toBeEmpty({ timeout: 15000 });
  // Pinned crossfade: drive to the panel via the section rail
  // (anchor scrollIntoView can't target panels inside a pin).
  await openAboutPanel(page);
  for (const slug of EXPERIENCE_SLUGS) {
    await expect(page.getByTestId(`experience-card-${slug}`)).toBeVisible();
  }
});

test("clicking a card opens its detail page with back navigation", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("#hero h1")).not.toBeEmpty({ timeout: 15000 });
  const card = page.getByTestId(
    "experience-card-it-intern-pdam-surya-sembada"
  );
  await openAboutPanel(page);
  await card.scrollIntoViewIfNeeded();
  await card.click();
  await expect(page).toHaveURL(/\/experience\/it-intern-pdam-surya-sembada/);
  await expect(page.getByTestId("experience-title")).toContainText(
    "IT Internship"
  );
  await expect(page.getByTestId("experience-company")).toContainText("PDAM");
  await page.getByRole("link", { name: /back to about/i }).click();
  await expect(page).toHaveURL(/\/#about$/);
});

test("each experience page renders with prev/next nav", async ({ page }) => {
  for (const slug of EXPERIENCE_SLUGS) {
    await page.goto(`/experience/${slug}`);
    await expect(page.getByTestId("experience-title")).toBeVisible();
  }
  await page.goto(`/experience/${EXPERIENCE_SLUGS[1]}`);
  await expect(page.getByTestId("experience-prev")).toBeVisible();
  await expect(page.getByTestId("experience-next")).toBeVisible();
});

test("unknown experience slug shows 404", async ({ page }) => {
  const res = await page.goto("/experience/does-not-exist");
  expect(res?.status()).toBe(404);
});
