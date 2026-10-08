import { test as base } from '@playwright/test';
import { UsersListPage } from '../pages/UsersListPage';
import { AddUserPage, NewUser } from '../pages/AddUserPage';
import { ViewUserPage } from '../pages/ViewUserPage';
import { ProjectsListPage } from '../pages/ProjectsListPage';
import { AddProjectPage, NewProject } from '../pages/AddProjectPage';
import { ViewProjectPage } from '../pages/ViewProjectPage';
import { AddUsersToProjectPage } from '../pages/AddUsersToProjectPage';
import { loadTestData } from '../utils/testDataLoader';
import { env } from '../config/env';

interface SeededUser {
  name: string;
  surname: string;
  email: string;
  position: string;
}

interface UserTestData {
  newUser: NewUser;
  seededUsers: {
    developer: SeededUser;
    businessAnalyst: SeededUser;
  };
}

interface ProjectTestData {
  newProject: NewProject;
  seededProject: {
    name: string;
    sector: string;
    technologies: string;
  };
}

/**
 * Custom fixtures extend Playwright's base test with:
 *  - Ready-to-use page objects for the Users and Projects flows
 *    (avoids repetitive instantiation per test)
 *  - Shared JSON test data
 *  - Common configuration access
 */
interface Fixtures {
  usersListPage: UsersListPage;
  addUserPage: AddUserPage;
  viewUserPage: ViewUserPage;
  projectsListPage: ProjectsListPage;
  addProjectPage: AddProjectPage;
  viewProjectPage: ViewProjectPage;
  addUsersToProjectPage: AddUsersToProjectPage;
  users: UserTestData;
  projects: ProjectTestData;
  config: typeof env;
}

export const test = base.extend<Fixtures>({
  usersListPage: async ({ page }, use) => {
    await use(new UsersListPage(page));
  },

  addUserPage: async ({ page }, use) => {
    await use(new AddUserPage(page));
  },

  viewUserPage: async ({ page }, use) => {
    await use(new ViewUserPage(page));
  },

  projectsListPage: async ({ page }, use) => {
    await use(new ProjectsListPage(page));
  },

  addProjectPage: async ({ page }, use) => {
    await use(new AddProjectPage(page));
  },

  viewProjectPage: async ({ page }, use) => {
    await use(new ViewProjectPage(page));
  },

  addUsersToProjectPage: async ({ page }, use) => {
    await use(new AddUsersToProjectPage(page));
  },

  users: async ({}, use) => {
    await use(loadTestData<UserTestData>('users.json'));
  },

  projects: async ({}, use) => {
    await use(loadTestData<ProjectTestData>('projects.json'));
  },

  config: async ({}, use) => {
    await use(env);
  },
});

export { expect } from '@playwright/test';
