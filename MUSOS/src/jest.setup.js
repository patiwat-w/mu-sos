// This file ensures that Jest globals are properly set up
// No need to import @jest/globals in test files

import { jest, describe, it, expect, beforeEach, afterEach, beforeAll, afterAll, test } from '@jest/globals';

// Make all Jest globals available without imports
Object.assign(global, {
  jest,
  describe,
  it,
  test,
  expect,
  beforeEach,
  afterEach,
  beforeAll,
  afterAll
});

// Optional: Set default timeout for tests
// jest.setTimeout(10000);

// You can also add global mocks here if needed
// Example: global.fetch = jest.fn();
