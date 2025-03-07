import { expect } from 'chai';
import { describe, beforeEach, it } from 'mocha';
import { getComponentOutput } from 'astro-component-tester';
import { cleanString } from './utils/index.js';

describe('RadioGroup.astro test', () => {
	let component;

	beforeEach(() => {
		component = undefined;
	});

	it('Should render all radio options', async () => {
		// arrange
		const expectedOptions = 3;
		const element = /radio-option/g;
		const props = {
			control: {
				label: 'FAKE LABEL',
				name: 'FAKE NAME',
				type: 'radio',
				options: ['one', 'two', 'three'],
			},
			showValidationHints: true,
		};

		// act
		component = await getComponentOutput('./components/controls/RadioGroup.astro', props);
		const actualResult = cleanString(component.html);
		const matches = actualResult.match(element) || [];

		// assert
		expect(matches.length).to.equal(expectedOptions);
	});

	it('Should render a checked radio option from string[] correctly', async () => {
		const expectedResult = '<inputtype="radio"name="FAKENAME"value="two"checked="true">';
		const props = {
			control: {
				label: 'FAKE LABEL',
				name: 'FAKE NAME',
				type: 'radio',
				value: 'two',
				options: ['one', 'two', 'three'],
			},
			showValidationHints: true,
		};

		// act
		component = await getComponentOutput('./components/controls/RadioGroup.astro', props);
		const actualResult = cleanString(component.html);

		// assert
		expect(actualResult).to.contain(expectedResult);
	});

	it('Should render a checked radio option from ControlOption[] correctly', async () => {
		const expectedResult = '<inputtype="radio"name="FAKENAME"value="three"checked="true">';
		const props = {
			control: {
				label: 'FAKE LABEL',
				name: 'FAKE NAME',
				type: 'radio',
				value: 'three',
				options: [
					{
						value: 'one',
						label: '1',
					},
					{
						value: 'two',
						label: '2',
					},
					{
						value: 'three',
						label: '3',
					},
				],
			},
			showValidationHints: true,
		};

		// act
		component = await getComponentOutput('./components/controls/RadioGroup.astro', props);
		const actualResult = cleanString(component.html);

		// assert
		expect(actualResult).to.contain(expectedResult);
	});
});
