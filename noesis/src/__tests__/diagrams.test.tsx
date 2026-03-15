import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { DataSourcesDiagram } from '@/components/diagrams/DataSourcesDiagram';
import { DataIntegrationDiagram } from '@/components/diagrams/DataIntegrationDiagram';
import { DataQualityDiagram } from '@/components/diagrams/DataQualityDiagram';
import { MDMDiagram } from '@/components/diagrams/MDMDiagram';
import { ReverseIntegrationDiagram } from '@/components/diagrams/ReverseIntegrationDiagram';
import { DataGovernanceDiagram } from '@/components/diagrams/DataGovernanceDiagram';
import { AIDataManagementDiagram } from '@/components/diagrams/AIDataManagementDiagram';

const diagrams = [
  { name: 'DataSourcesDiagram', Component: DataSourcesDiagram },
  { name: 'DataIntegrationDiagram', Component: DataIntegrationDiagram },
  { name: 'DataQualityDiagram', Component: DataQualityDiagram },
  { name: 'MDMDiagram', Component: MDMDiagram },
  { name: 'ReverseIntegrationDiagram', Component: ReverseIntegrationDiagram },
  { name: 'DataGovernanceDiagram', Component: DataGovernanceDiagram },
  { name: 'AIDataManagementDiagram', Component: AIDataManagementDiagram },
];

for (const { name, Component } of diagrams) {
  describe(name, () => {
    it('renders without throwing', () => {
      expect(() => render(<Component />)).not.toThrow();
    });

    it('renders an SVG element', () => {
      const { container } = render(<Component />);
      const svg = container.querySelector('svg');
      expect(svg).toBeTruthy();
    });

    it('SVG has aria-label', () => {
      const { container } = render(<Component />);
      const svg = container.querySelector('svg');
      expect(svg?.getAttribute('aria-label')).toBeTruthy();
    });
  });
}
