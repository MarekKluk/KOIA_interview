import { getDesiredQuartersArray } from "../getDesiredQuartersArray";

describe('The getDesiredQuartersArray function', () => {
	describe('when startQuarter and endQuarter are the same ', () => {
		it('should return array with one quarter', () => {
			const startQuarter = '2022K1';
			const endQuarter = '2022K1';
			expect(getDesiredQuartersArray(startQuarter, endQuarter)).toEqual([startQuarter])
		})
	})
	describe('when provided with correct array', () => {
		it('should return correct array of quarters', () => {
			const startQuarter = '2021K1';
			const endQuarter = '2022K1';
			expect(getDesiredQuartersArray(startQuarter, endQuarter)).toEqual(['2021K1', '2021K2', '2021K3', '2021K4', '2022K1'])
		});
	})
})
