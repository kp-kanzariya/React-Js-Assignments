import React, {useState, useEffect} from 'react';
import {DataTable, Checkbox} from 'react-native-paper';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';

type Header = {
  key: string;
  label: string;
  numeric: boolean;
  width: number;
};

type DataRow = {
  key: number | string;
  [key: string]: string | number;
};

interface DataTableComponentProps {
  headers: Header[];
  data: DataRow[];
  sortableColumns?: string[];
  buttonLabel?: string;
  onButtonPress?: (rowKey: string | number) => void;
  onRowSelect?: (selectedRows: DataRow[]) => void;
  width?: number | string;
  height?: number | string;
  showCheckbox?: boolean;
  showButton?: boolean;
}

const NewDataTableComponent: React.FC<DataTableComponentProps> = ({
  headers,
  data,
  sortableColumns = [],
  buttonLabel = 'Action',
  onButtonPress,
  onRowSelect,
  width = '100%',
  height = 'auto',
  showCheckbox = false,
  showButton = false,
}) => {
  const [page, setPage] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [sortedData, setSortedData] = useState<DataRow[]>(data);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<
    'ascending' | 'descending' | null
  >(null);
  const [selectedRows, setSelectedRows] = useState<DataRow[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, sortedData.length);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  useEffect(() => {
    setSortedData(data);
  }, [data]);

  const handleSort = (column: string) => {
    const newDirection =
      sortColumn === column && sortDirection === 'ascending'
        ? 'descending'
        : 'ascending';
    setSortColumn(column);
    setSortDirection(newDirection);

    const sorted = [...sortedData].sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];

      if (aValue === undefined) return 1;
      if (bValue === undefined) return -1;

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return newDirection === 'ascending'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        return newDirection === 'ascending' ? aValue - bValue : bValue - aValue;
      }
      return 0;
    });

    setSortedData(sorted);
  };

  const handleCheckboxToggle = (row: DataRow) => {
    const isAlreadySelected = selectedRows.some(
      selectedRow => selectedRow.key === row.key,
    );
    const updatedSelectedRows = isAlreadySelected
      ? selectedRows.filter(selectedRow => selectedRow.key !== row.key)
      : [...selectedRows, row];

    setSelectedRows(updatedSelectedRows);
    onRowSelect?.(updatedSelectedRows);
  };

  const filteredData = sortedData.filter(item => {
    return headers.some(header => {
      const value = item[header.key];
      if (typeof value === 'string') {
        return value.toLowerCase().includes(searchQuery.toLowerCase());
      } else if (typeof value === 'number') {
        return value.toString().includes(searchQuery);
      }
      return false;
    });
  });

  return (
    <View style={[styles.container, {width, height}]}>
      <View style={styles.tableContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <ScrollView horizontal style={{flex: 1}}>
          <DataTable style={{padding: 4}}>
            <DataTable.Header>
              {showCheckbox && (
                <DataTable.Title style={[styles.column, {width: 50}]}>
                  <Text style={styles.headerText}>Select</Text>
                </DataTable.Title>
              )}
              {headers.map(header =>
                header.key === 'button' && !showButton ? null : (
                  <DataTable.Title
                    key={header.key}
                    numeric={header.numeric}
                    style={[styles.column, {width: header.width}]}
                    onPress={() =>
                      sortableColumns.includes(header.key) &&
                      handleSort(header.key)
                    }>
                    <Text style={styles.headerText}>
                      {header.label}
                      {sortColumn === header.key &&
                        (sortDirection === 'ascending' ? ' ↑' : ' ↓')}
                    </Text>
                  </DataTable.Title>
                ),
              )}
            </DataTable.Header>
            {filteredData.slice(from, to).map(item => (
              <DataTable.Row
                key={item.key.toString()}
                style={[
                  styles.row,
                  selectedRows.some(selectedRow => selectedRow.key === item.key)
                    ? styles.selectedRow
                    : {},
                ]}
                onPress={() => showCheckbox && handleCheckboxToggle(item)}>
                {showCheckbox && (
                  <DataTable.Cell style={[styles.column, {width: 50}]}>
                    <Checkbox
                      status={
                        selectedRows.some(
                          selectedRow => selectedRow.key === item.key,
                        )
                          ? 'checked'
                          : 'unchecked'
                      }
                      onPress={() => handleCheckboxToggle(item)}
                    />
                  </DataTable.Cell>
                )}
                {headers.map(header => (
                  <DataTable.Cell
                    key={header.key}
                    numeric={header.numeric}
                    style={[styles.column, {width: header.width}]}>
                    {showButton && header.key === 'button' ? (
                      <TouchableOpacity
                        onPress={() => onButtonPress?.(item.key)}
                        style={styles.button}>
                        <Text style={styles.buttonText}>{buttonLabel}</Text>
                      </TouchableOpacity>
                    ) : (
                      <Text style={styles.rowText}>{item[header.key]}</Text>
                    )}
                  </DataTable.Cell>
                ))}
              </DataTable.Row>
            ))}
            <DataTable.Pagination
              page={page}
              numberOfPages={Math.ceil(filteredData.length / itemsPerPage)}
              onPageChange={page => setPage(page)}
              label={`${from + 1}-${to} of ${filteredData.length}`}
              numberOfItemsPerPage={itemsPerPage}
              onItemsPerPageChange={setItemsPerPage}
              showFastPaginationControls
              selectPageDropdownLabel={'Rows per page'}
            />
          </DataTable>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    padding: '5%',
  },
  tableContainer: {
    height: '100%',
    borderRadius: 12,
    shadowColor: '#f8f8f8',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.7,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: '#ffffff',
    // backgroundColor:'red'
  },
  column: {
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  headerText: {
    color: '#3d6aC9',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  rowText: {
    color: '#000',
  },
  row: {
    paddingVertical: 10,
  },
  selectedRow: {
    backgroundColor: '#e1f5fe',
  },
  searchBar: {
    alignSelf: 'flex-end',
    width: '30%',
    height: 40,
    borderColor: '#3d6aC9',
    borderWidth: 0.4,
    borderRadius: 20,
    paddingLeft: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#3d6aC9',
    borderRadius: 5,
    alignItems: 'center',
    padding: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default NewDataTableComponent;
