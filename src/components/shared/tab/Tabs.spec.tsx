import { fireEvent, render, screen } from "@testing-library/react";
import Tabs from "./Tabs";

const mockTabs = [
  { label: 'People', value: 'people' },
  { label: 'Planets', value: 'planets' },
];

describe('Tabs component', () => {

  it('Should render tabs with correct labels', async () => {
    render(<Tabs tabs={mockTabs} activeTab="people" />);

    const tabsList = await screen.findAllByRole('button');
    const expectedLabels = mockTabs.map(tab => tab.label);

    const actualLabels = tabsList.map(tab => tab.textContent?.trim());

    expect(actualLabels).toEqual(expectedLabels);
  });

  it('should render nothing when tabs array is empty', () => {
    render(<Tabs tabs={[]} activeTab="" />);

    const buttons = screen.queryAllByRole('button');

    expect(buttons).toHaveLength(0);
  });

  it('should call onSelect with correct value when a tab is clicked', async () => {
    const mockCallback = jest.fn();
    render(<Tabs tabs={mockTabs} activeTab="people" onSelect={mockCallback} />);

    const planetsTab = screen.getByRole('button', { name: /planets/i });

    fireEvent.click(planetsTab);
    expect(mockCallback).toHaveBeenCalledWith('planets');
  });

  it('should have the active class for the current tab', () => {
    render(<Tabs tabs={mockTabs} activeTab="people" />);

    const activeTab = screen.getByRole('button', { name: /people/i });
    const inactiveTab = screen.getByRole('button', { name: /planets/i });
    expect(activeTab).toHaveClass('active');

    expect(inactiveTab).not.toHaveClass('active');
  });
})