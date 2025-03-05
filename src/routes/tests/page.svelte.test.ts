import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/svelte';
import Page from '../+page.svelte';
import userEvent from '@testing-library/user-event';

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
