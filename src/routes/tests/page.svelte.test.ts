import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/svelte';
import Page from '../+page.svelte';
import userEvent from '@testing-library/user-event';

describe('sum test', () => {
	test('immer-undo', async () => {
		render(Page, {
			props: {
				data: {
					nested: {
						one: ['thing'],
						two: ['things']
					}
				}
			}
		});
		await userEvent.click(screen.getByTestId('button-immer-undo'));
		expect(screen.getByText('immer-undo')).toBeInTheDocument()
	});
	test('immer', async () => {
		render(Page, {
			props: {
				data: {
					nested: {
						one: ['thing'],
						two: ['things']
					}
				}
			}
		});
		await userEvent.click(screen.getByTestId('button-immer'));
		expect(screen.getByText('immer')).toBeInTheDocument()
	});
	test('undo', async () => {
		render(Page, {
			props: {
				data: {
					nested: {
						one: ['thing'],
						two: ['things']
					}
				}
			}
		});
		await userEvent.click(screen.getByTestId('button-undo'));
		expect(screen.getByText('undo')).toBeInTheDocument()
	});
	test('writable', async () => {
		render(Page, {
			props: {
				data: {
					nested: {
						one: ['thing'],
						two: ['things']
					}
				}
			}
		});
		await userEvent.click(screen.getByTestId('button-writable'));
		expect(screen.getByText('writable')).toBeInTheDocument()
	});
});