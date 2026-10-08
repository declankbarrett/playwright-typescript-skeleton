import { test, expect } from '../../fixtures/testFixtures';

test.describe('Functional: Add project', () => {
  test('a new project can be created and appears in the projects list', async ({
    page,
    projectsListPage,
    addProjectPage,
    addUsersToProjectPage,
    projects,
  }) => {
    const newProject = {
      ...projects.newProject,
      // Keep project names unique across test runs to avoid clashing with
      // previously created data in a shared environment.
      name: `${projects.newProject.name} ${Date.now()}`,
    };

    await addProjectPage.open();
    await addProjectPage.createProject(newProject);

    // Creating a project redirects to the "add users to project" screen.
    await expect(page).toHaveURL(/.*add-users-to-project\.html\?projectId=\d+/);
    expect(await addUsersToProjectPage.isDisplayed()).toBeTruthy();
    expect(await addUsersToProjectPage.getProjectName()).toBe(newProject.name);

    await addUsersToProjectPage.confirm();

    await expect(page).toHaveURL(/.*projects\.html/);
    expect(await projectsListPage.isProjectListed(newProject.name)).toBeTruthy();
  });

  test('submitting the form with missing fields shows a validation error', async ({
    addProjectPage,
  }) => {
    await addProjectPage.open();

    await addProjectPage.submit();

    expect(await addProjectPage.isValidationErrorVisible()).toBeTruthy();
  });
});
