/**
 * Table component with view toggle functionality
 */

import {
  type ReactNode,
  type HTMLAttributes,
  useState,
  useMemo,
  useEffect,
} from 'react';
import { Table, List } from 'lucide-react';
import { type TypographyTheme } from './typographyThemes';

type ReactElement = {
  props?: { children?: ReactNode; className?: string };
  key?: string;
};

const extractTextFromChildren = (children: ReactNode): string[] => {
  const texts: string[] = [];

  const processNode = (node: ReactNode): void => {
    if (typeof node === 'string') {
      const trimmed = node.trim();
      if (trimmed) texts.push(trimmed);
    } else if (typeof node === 'number') {
      texts.push(node.toString());
    } else if (Array.isArray(node)) {
      node.forEach(processNode);
    } else if (node && typeof node === 'object' && 'props' in node) {
      const nodeProps = node as ReactElement;
      if (nodeProps.props?.children) {
        processNode(nodeProps.props.children);
      }
    }
  };

  processNode(children);
  return texts;
};

const extractCellNodes = (rowChildren: ReactNode): ReactNode[] => {
  if (!Array.isArray(rowChildren)) return [];
  return rowChildren
    .filter(child => child && typeof child === 'object' && 'props' in child)
    .map(child => (child as ReactElement).props?.children ?? null);
};

const extractBodyRowNodes = (bodyChildren: ReactNode): ReactNode[][] => {
  const rows: ReactNode[][] = [];

  const processTr = (node: ReactNode): void => {
    if (Array.isArray(node)) {
      node.forEach(processTr);
    } else if (node && typeof node === 'object' && 'props' in node) {
      const el = node as ReactElement;
      if (el.key?.includes('tr') || el.props?.className?.includes('tr')) {
        const cells = extractCellNodes(el.props?.children);
        if (cells.length > 0) rows.push(cells);
      } else if (el.props?.children) {
        processTr(el.props.children);
      }
    }
  };

  processTr(bodyChildren);
  return rows;
};

// Custom Table Component with view toggle
export const TableWithToggle = ({
  children,
  theme,
  ...props
}: {
  children: ReactNode;
  theme: TypographyTheme;
} & HTMLAttributes<HTMLTableElement>) => {
  const [viewMode, setViewMode] = useState<'table' | 'list'>('table');
  const [isMobile, setIsMobile] = useState(false);

  // Set responsive default view
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint
    };

    // Check on mount
    checkScreenSize();

    // Listen for resize events
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Set default view based on screen size
  useEffect(() => {
    if (isMobile) {
      setViewMode('list');
    } else {
      setViewMode('table');
    }
  }, [isMobile]);

  // Extract table data for list view
  const tableData = useMemo(() => {
    if (viewMode === 'table') return null;

    const headers: string[] = [];
    const rows: ReactNode[][] = [];

    const processTableElement = (element: ReactNode): void => {
      if (
        typeof element === 'object' &&
        element !== null &&
        'props' in element
      ) {
        const el = element as ReactElement;

        if (
          el.key?.includes('thead') ||
          el.props?.className?.includes('thead')
        ) {
          headers.push(...extractTextFromChildren(el.props?.children));
        } else if (
          el.key?.includes('tbody') ||
          el.props?.className?.includes('tbody')
        ) {
          rows.push(...extractBodyRowNodes(el.props?.children));
        } else if (el.props?.children) {
          if (Array.isArray(el.props.children)) {
            el.props.children.forEach(processTableElement);
          } else {
            processTableElement(el.props.children);
          }
        }
      }
    };

    if (Array.isArray(children)) {
      children.forEach(processTableElement);
    } else {
      processTableElement(children);
    }

    return { headers, rows };
  }, [children, viewMode]);

  return (
    <div className="-mx-4 sm:mx-0 mb-6">
      {/* View Toggle Buttons */}
      <div className="flex justify-end mb-4 gap-2 px-4 sm:px-0">
        <button
          onClick={() => setViewMode('table')}
          className={`px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-2 ${
            viewMode === 'table'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Table size={16} />
          Table
        </button>
        <button
          onClick={() => setViewMode('list')}
          className={`px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-2 ${
            viewMode === 'list'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <List size={16} />
          List
        </button>
      </div>

      {viewMode === 'table' ? (
        <div className="overflow-x-auto">
          <table
            className={`${theme.components.table} sticky-table`}
            style={
              {
                '--first-col-width': '12rem',
              } as React.CSSProperties
            }
            {...props}
          >
            {children}
          </table>
        </div>
      ) : (
        <div className="space-y-4 px-4 sm:px-0">
          {tableData?.rows && tableData.rows.length > 0 ? (
            tableData.rows.map((row, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm mx-2 sm:mx-0"
              >
                <div className="grid gap-3">
                  {tableData.headers.map((header, headerIndex) => (
                    <div
                      key={headerIndex}
                      className="flex flex-col sm:flex-row sm:items-center"
                    >
                      <div className="font-semibold text-gray-800 text-sm mb-1 sm:mb-0 sm:w-1/3 sm:pr-4">
                        {header}:
                      </div>
                      <div className="text-gray-700 text-sm sm:w-2/3 [&_li]:!text-sm [&_p]:!text-sm">
                        {row[headerIndex] ?? ''}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mx-2 sm:mx-0">
              <div className="text-yellow-800 text-sm">
                <strong>Debug Info:</strong>
                <br />
                Headers: {JSON.stringify(tableData?.headers || [])}
                <br />
                Rows: {JSON.stringify(tableData?.rows || [])}
                <br />
                Children type: {typeof children}
                <br />
                Children is array: {Array.isArray(children) ? 'Yes' : 'No'}
                <br />
                Children length:{' '}
                {Array.isArray(children) ? children.length : 'N/A'}
                <br />
                <br />
                <strong>Check browser console for detailed parsing logs</strong>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
