import { getQuarterWithPairedSquarePerMeterPrice } from '../getQuarterWithPairedSquarePerMeterPrice';

describe('The getQuarterWithPairedSquarePerMeterPrice function', () => {
	describe('when provided with empty inputs', () => {
		it('should return an empty array', () => {
			const squarePerMeterPrices = [];
			const quartersArray = [];
			expect(getQuarterWithPairedSquarePerMeterPrice(squarePerMeterPrices, quartersArray)).toEqual([])
		})
	})
	describe('when provided with correct arrays', () => {
		it('should return correct array of objects', () => {
			const squarePerMeterPrices = [1000, 2000, 3000];
			const quartersArray = ['2022K1', '2022K2', '2022K3'];
			const expected = [{name: '2022K1', price: 1000}, {name: '2022K2', price: 2000}, {name: '2022K3', price: 3000},];
			expect(getQuarterWithPairedSquarePerMeterPrice(squarePerMeterPrices, quartersArray)).toEqual(expected)
		})
	})
})
