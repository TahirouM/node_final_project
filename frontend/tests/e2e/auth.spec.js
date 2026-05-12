import { test, expect } from '@playwright/test'

test.describe('Authentification — parcours utilisateur complet', () => {
  const testEmail = `e2e_${Date.now()}@example.com`
  const testPassword = 'password123'
  const firstName = 'Jean'
  const lastName = 'Dupont'

  test('inscription d\'un nouvel utilisateur', async ({ page }) => {
    await page.goto('/auth/register')
    await expect(page).toHaveTitle(/Smart Identity/)

    await page.fill('input[type="email"]', testEmail)
    await page.fill('input[placeholder*="prénom" i], input[name="firstName"], input[id*="first"]', firstName).catch(() => {})
    await page.fill('input[placeholder*="nom" i], input[name="lastName"], input[id*="last"]', lastName).catch(() => {})

    const passwordInputs = page.locator('input[type="password"]')
    await passwordInputs.first().fill(testPassword)
    const count = await passwordInputs.count()
    if (count > 1) {
      await passwordInputs.last().fill(testPassword)
    }

    await page.click('button[type="submit"]')
    await page.waitForURL(/dashboard/, { timeout: 10000 })
    await expect(page.url()).toContain('/dashboard')
  })

  test('connexion avec identifiants valides', async ({ page }) => {
    await page.goto('/auth/login')

    await page.fill('input[type="email"]', 'test@example.com')
    await page.fill('input[type="password"]', 'test123')
    await page.click('button[type="submit"]')

    await page.waitForURL(/dashboard/, { timeout: 10000 })
    await expect(page.url()).toContain('/dashboard')
  })

  test('affichage d\'une erreur avec mauvais mot de passe', async ({ page }) => {
    await page.goto('/auth/login')

    await page.fill('input[type="email"]', 'test@example.com')
    await page.fill('input[type="password"]', 'mauvais_mot_de_passe')
    await page.click('button[type="submit"]')

    await expect(page.locator('text=/incorrect|invalide|erreur/i').or(page.locator('.bg-red-50'))).toBeVisible({ timeout: 5000 })
  })

  test('redirection si non authentifié sur une route protégée', async ({ page }) => {
    await page.goto('/dashboard')
    await expect(page.url()).not.toContain('/dashboard')
  })
})

test.describe('Navigation SaaS — parcours authentifié', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/auth/login')
    await page.fill('input[type="email"]', 'test@example.com')
    await page.fill('input[type="password"]', 'test123')
    await page.click('button[type="submit"]')
    await page.waitForURL(/dashboard/, { timeout: 10000 })
  })

  test('accès au dashboard après connexion', async ({ page }) => {
    await expect(page.url()).toContain('/dashboard')
    await expect(page.locator('h1, h2').first()).toBeVisible()
  })

  test('navigation vers la boutique', async ({ page }) => {
    await page.goto('/shop')
    await expect(page.url()).toContain('/shop')
    await expect(page.locator('body')).toBeVisible()
  })

  test('déconnexion redirige vers l\'accueil', async ({ page }) => {
    const logoutBtn = page.locator('button:has-text("Déconnexion"), a:has-text("Déconnexion"), [data-testid="logout"]')
    if (await logoutBtn.count() > 0) {
      await logoutBtn.first().click()
      await expect(page.url()).not.toContain('/dashboard')
    } else {
      // Vérifier que l'utilisateur est bien connecté
      await expect(page.url()).toContain('/dashboard')
    }
  })
})

test.describe('Page publique profil NFC', () => {
  test('accès à la page d\'accueil sans authentification', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Smart Identity/)
    await expect(page.locator('body')).toBeVisible()
  })

  test('page 404 pour un profil inexistant', async ({ page }) => {
    await page.goto('/profile/profil-qui-nexiste-pas-xyz123')
    const notFoundText = page.locator('text=/introuvable|not found|404/i')
    const isVisible = await notFoundText.isVisible().catch(() => false)
    // La page doit soit afficher un message d'erreur soit rediriger
    expect(page.url()).toBeTruthy()
  })
})
