
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import { styled } from '@mui/material/styles';

import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableFooter from '@mui/material/TableFooter';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

export const TableLayout1 = ({ children, ...props }) => {

    const {
        tableHeadValues,
        tableFooter,
        filterFields,
        filterSort,
        handleSort,
        minWidth = 650,
        size = "small",
        errorPage,
        errorCondition,
        isPaper = false
    } = props

    return (
        <TableContainer component={isPaper ? Paper : null} >
            <Table sx={{ minWidth: minWidth }} size={size} aria-label="data table">
                <TableHead>
                    <TableRow>
                        {tableHeadValues.map(val => (
                            <TableCell
                                key={val.id}
                                className={val.wrapperClass}
                                align={val.align ? val.align : 'right'}>
                                {val.isSortable ?
                                    <TableSortLabel
                                        active={filterSort?.sort_by === val.sortId}
                                        direction={filterSort?.sort_type}
                                        onClick={() => handleSort(val.sortId, filterSort?.sort_type)}

                                    >
                                        <span dangerouslySetInnerHTML={{ __html: val.value }} ></span>
                                    </TableSortLabel>
                                    :
                                    <span dangerouslySetInnerHTML={{ __html: val.value }} ></span>
                                }
                            </TableCell>)
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* {filterFields} */}
                    {children}
                </TableBody>
            </Table>
            {errorCondition &&
                <div className="pt-32">
                    {errorPage}
                </div>
            }
            <Stack direction="row" justifyContent="flex-end" className="mx-16">
                {tableFooter}
            </Stack>
        </TableContainer>
    )
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    // '&:nth-of-type(odd)': {
    //   backgroundColor: theme.palette.action.hover,
    // },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


export const TableRowLayout1 = (props) => {

    const { tableRow, tableCellsKey, actions, actions2, actions3, clickEvent = () => { } } = props

    return (
        <StyledTableRow
            hover
        // sx={{ '&:last-child td, &:last-child th': { border: 0 } , '&:nth-of-type(odd)' : '' }}
        >
            {tableCellsKey.map(cell =>
                <TableCell
                    key={cell.value}
                    className={`cursor-pointer ${cell.wrapperClass}`}
                    onClick={() => clickEvent(tableRow.id)}
                    align={cell.align ? cell.align : 'right'}

                >   {cell.wrapperFunc ?
                        cell.wrapperFunc(tableRow[`${cell.value}`])
                        :
                        tableRow[`${cell.value}`]
                    }
                </TableCell>
            )}
            {actions3 &&
                <TableCell >
                    {actions3}
                </TableCell>
            }
            {actions2 &&
                <TableCell >
                    {actions2}
                </TableCell>
            }
            {actions &&
                <TableCell >
                    {actions}
                </TableCell>
            }

        </StyledTableRow>
    )
}