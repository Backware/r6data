import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { test } from 'node:test';

const require = createRequire(import.meta.url);

const loaders = {
  cjs: async () => require('../dist/index.js'),
  esm: async () => import('../dist/index.mjs')
};

for (const [format, load] of Object.entries(loaders)) {
  test(`${format} build exposes the data sets`, async () => {
    const r6 = await load();

    for (const key of [
      'OPERATORS',
      'WEAPONS',
      'GADGETS',
      'MAPS',
      'SEASONS',
      'RANKS_SEASONS',
      'SIDES',
      'ACTIONS'
    ]) {
      assert.ok(Array.isArray(r6[key]), `${key} is an array`);
      assert.ok(r6[key].length > 0, `${key} is not empty`);
    }
  });

  test(`${format} build resolves operator references`, async () => {
    const r6 = await load();
    for (const operator of r6.OPERATORS) {
      assert.ok(operator.season, `${operator.slug} has a season`);
      for (const weapon of [
        ...operator.weapons.primary,
        ...operator.weapons.secondary
      ]) {
        assert.ok(weapon.slug, `${operator.slug} weapon resolved`);
      }
    }
  });

  test(`${format} build helpers work`, async () => {
    const r6 = await load();
    assert.equal(r6.getSeasonShorthand(33), 'Y9S1');
    assert.equal(r6.getSeasonId('Y9S1'), 33);
    assert.equal(r6.isOperatorSlug('ash'), true);
    assert.equal(r6.isOperatorSlug('not_an_operator'), false);
    const svg = r6.parseSvgString('<svg viewBox="0 0 1 1"><g></g></svg>');
    assert.equal(svg.attributes.viewBox, '0 0 1 1');
    assert.equal(svg.contents, '<g></g>');
  });
}
